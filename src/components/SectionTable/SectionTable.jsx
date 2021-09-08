import { useState } from "react";
import { Select, Option, Button } from "..";
import { Table, Input, Popconfirm, Form, Typography, Tag } from "antd";
import styles from './SectionTable.module.scss'
import { is } from "@babel/types";

export const SectionTable = ({ section = [], teacher }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(section);
    const [editingKey, setEditingKey] = useState("");
    const [isNewAdded, setIsNewAdded] = useState(false);

    const isEditing = (record) => record.section_id === editingKey;
    const teacherList = teacher
    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        let inputNode;
        switch (inputType) {
            case "teacher":
                inputNode = (
                    <Select
                        mode="multiple"
                        showSearch
                        placeholder="Select Teacher"
                    >
                        {teacherList.map((ele, i) => (
                            <Option key={ele.id} value={ele.id}>
                                {ele.firstname}{" "}{ele.lastname}
                            </Option>
                        ))}
                    </Select>
                );
                break;
            default:
                inputNode = <Input />;
                break;
        }
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        hasFeedback
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                            {
                                validator: (rule, value, callback) => {
                                    const alreadyExistSection = data.map((e) => e.section_id).filter((e)=>e!==record.section_id)
                                    // console.log(alreadyExistSection)
                                    // console.log(record.section_id)
                                    if (alreadyExistSection.includes(value)) {
                                        return Promise.reject("Already exist!")
                                    }
                                    return Promise.resolve()
                                }
                            }
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.section_id);
    };

    const cancel = () => {
        setEditingKey("");
        if(isNewAdded){
            setData(data.slice(0,data.length-1))
        }
    };

    const save = async (section_id) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => section_id === item.section_id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }

        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    }

    const handleAdd = () => {
        console.log(data)
        setIsNewAdded(true)
        const newData = {section_id: '', teacher: [] };
        setData([...data, newData]);
        form.setFieldsValue({
            section_id: "",
            teacher: []
        });
        setEditingKey(newData.section_id);


    };

    const columns = [
        {
            title: "Section",
            dataIndex: "section_id",
            key: "section_id",
            width: "15%",
            editable: true,
            //   sorter: (a, b) => a.course_id - b.course_id,
        },
        {
            title: "Teacher",
            dataIndex: "teacher",
            width: "75%",
            editable: true,
            render: (teacher) => (
                <>
                    {teacher?.map((ele) => {
                        const teacherData = teacherList.filter((teacher)=> teacher.id===ele);
                        const teacherFirstName =  teacherData[0].firstname
                        const teacherLastName =  teacherData[0].lastname
                        const teacherName =  `${teacherFirstName} ${teacherLastName}`
                        console.log(teacherData)
                        console.log(teacherName)
                        return <Tag style={{ height: '36px', lineHeight: '2.5', fontSize: '14px' }} key={ele}>{teacherName}</Tag>;
                    })}
                </>
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "10%",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Popconfirm title="Save Changes?" onConfirm={() => save(record.section_id)}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                                style={{
                                    marginRight: 8,
                                }}
                            >
                                Save
                            </a>
                        </Popconfirm>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            onClick={cancel}
                        >
                            Cancel
                        </a>

                    </span>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ""}
                        onClick={() => edit(record)}
                    >
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType:
                    col.dataIndex === "teacher"
                        ? "teacher"
                        : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <>
            <div style={{ width: "100%", padding: "10px 0", display: 'flex', justifyContent: "flex-end", gap: '1rem' }}>
                <Button type="secondary" disabled={editingKey !== ""||isNewAdded===true} onClick={() => handleAdd()}>Add Section</Button>
            </div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                    rowKey="section_id"
                    onRow={()=>({className:styles.editableCell})}
                />
            </Form>
        </>
    );
};