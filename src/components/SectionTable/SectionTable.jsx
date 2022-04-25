import { useState, useEffect } from "react";
import { Select, Option, Button } from "..";
import { Table, Input, Popconfirm, Form, Typography, Tag } from "antd";
import styles from './SectionTable.module.scss'
import {
    EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleTwoTone
} from '@ant-design/icons';
import httpClient from "../../utils/httpClient";

export const SectionTable = ({ section, teacher, groupSectionId }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState("");
    const [isNewAdded, setIsNewAdded] = useState(false);

    const getThPrefix = {
        PROF_DR: "ศ.ดร.",
        PROF: "ศ.",
        ASSOC_PROF_DR: "รศ.ดร.",
        ASSOC_PROF: "รศ.",
        ASST_PROF_DR: "ผศ.ดร.",
        ASST_PROF: "ผศ.",
        DR: "ดร.",
        INSTRUCTOR: "อ.",
    };

    const isEditing = (record) => record.section_number === editingKey;
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
                        showSearch={false}
                        placeholder="Select Teacher"
                    >
                        {teacher.map((ele) => (
                            <Option key={ele.user_id} value={ele.user_id}>
                                {getThPrefix[ele.prefix]}{" "}{ele.firstname}{" "}{ele.lastname}
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

                                    const alreadyExistSection = data.map((e) => e.section_number.toString()).filter((e) => e !== record.section_number.toString())
                                    if (alreadyExistSection.includes(value.toString())&& inputType !== "teacher") {
                                        return Promise.reject("Already exist!")
                                    }
                                    if ((isNaN(value.toString()) || value.toString().includes(".")) && inputType !== "teacher") {
                                        return Promise.reject("Enter number!")
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
        setEditingKey(record.section_number);
    };

    const cancel = () => {
        setEditingKey("");
        if (isNewAdded) {
            setData(data.slice(0, data.length - 1))
            setIsNewAdded(false)
        }
    };

    const save = async (section_number) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => section_number === item.section_number);
            if (isNewAdded) {
                return await httpClient.post(`/semester/createSection/${groupSectionId}`, {
                    section_number: parseInt(row.section_number),
                    user_id_list: row.teacher_list
                }).then((res) => {
                    newData.splice(index, 1, {
                        section_id: res.data.data[0].section_id,
                        section_number: res.data.data[0].section_number,
                        teacher_list: res.data.data[0].teacher_list?.map((e) => e.user_id)
                    });
                    setData(newData);
                    setEditingKey("");
                    setIsNewAdded(false);
                }).catch((err) => console.log(err))
            } else {
                const item = newData[index];
                return await httpClient.put(`/semester/updateSection/${item.section_id}`, {
                    section_number: parseInt(row.section_number),
                    user_id_list: row.teacher_list
                }).then(() => {
                    newData.splice(index, 1, { ...item, ...row });
                    setData(newData);
                    setEditingKey("");
                })
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    }

    const handleAdd = () => {
        setIsNewAdded(true)
        const newData = {
            section_id: null,
            section_number: '',
            teacher_list: []
        };
        setData([...data, newData]);
        form.setFieldsValue({
            section_number: "",
            teacher_list: []
        });
        setEditingKey(newData.section_number);
    };

    async function deleteSection(record) {
        return await httpClient
            .delete(`/semester/removeSection/${record.section_id}`)
            .then(() => {
                setData(data.filter((section) => section.section_number !== record.section_number));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {
        // let newData = [...section]
        // newData.forEach((section) => {
        //    section.teacher_list = section.teacher_list.map(e => e.user_id)
        // })
        //console.log(section)
        setData(section.sort(({section_number: first }, {section_number: second }) => first - second))
    }, [section])

    const columns = [
        {
            title: "Section",
            dataIndex: "section_number",
            key: "section_number",
            width: 120,
            editable: true,
        },
        {
            title: "Teacher",
            dataIndex: "teacher_list",
            editable: true,
            render: (selectedteacher) => (
                <>
                    {selectedteacher?.map((ele) => {
                        const teacherData = teacher.filter((teacher) => teacher.user_id === ele)[0];
                        const teacherPrefix = getThPrefix[teacherData?.prefix]
                        const teacherFirstName = teacherData?.firstname
                        const teacherLastName = teacherData?.lastname
                        const teacherName = `${teacherPrefix} ${teacherFirstName} ${teacherLastName}`
                        return <Tag style={{ height: '36px', lineHeight: '2.5', fontSize: '14px' }} key={ele}>{teacherName}</Tag>;
                    })}
                </>
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            width: 80,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            onClick={() => save(record.section_number)}
                            style={{
                                marginRight: 14,
                            }}
                        >
                            <SaveOutlined />
                        </a>


                        <Popconfirm title="Discard Changes?" onConfirm={() => cancel()}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a >
                                <CloseCircleTwoTone twoToneColor="#C73535" />
                            </a>
                        </Popconfirm>

                    </span>
                ) : (
                    <>
                        <Typography.Link
                            disabled={editingKey !== "" || isNewAdded === true}
                            onClick={() => edit(record)}
                            style={{
                                marginRight: 12,

                            }}
                        >
                            <EditOutlined />
                        </Typography.Link>
                        <Popconfirm title="Delete this section?" onConfirm={() => deleteSection(record)}>
                            <Typography.Link
                                disabled={editingKey !== "" || isNewAdded === true}
                                type="danger"
                            >
                                <DeleteOutlined />
                            </Typography.Link>
                        </Popconfirm>
                    </>

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
                    col.dataIndex === "teacher_list"
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
                <Button type="secondary" disabled={editingKey !== "" || isNewAdded === true} onClick={() => handleAdd()}>Add Section</Button>
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
                    rowKey="section_number"
                    onRow={() => ({ className: styles.editableCell })}
                />
            </Form>
        </>
    );
};