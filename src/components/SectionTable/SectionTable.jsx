import { useState } from "react";
import { Select, Option ,Button} from "..";
import { Table, Input, Popconfirm, Form, Typography, Tag} from "antd";


export const SectionTable = ({ section=[] }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(section);
    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record) => record.key === editingKey;
    const mockTeacher = [
        {
            id: 1,
            name: "Teacher John",
        },
        {
            id: 2,
            name: "Teacher Jack",
        },
        {
            id: 3,
            name: "Teacher Bob",
        },
        {
            id: 4,
            name: "Teacher Alice",
        },
        {
            id: 5,
            name: "Teacher Amy",
        },
        {
            id: 44,
            name: "Teacher Tu",
        },
    ];
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
                        {mockTeacher.map((ele, i) => (
                            <Option key={i} value={ele.name}>
                                {ele.name}
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
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: false,
                                message: `Please Input ${title}!`,
                            },
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
            name: "",
            age: "",
            address: "",
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

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
            console.log(data)
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    }

    const handleAdd = () => {
        const count = data.length + 1 ;
        const newData = {key:count.toString(),section_id:'',teacher:[null]};
        setData([...data,newData ]);
        form.setFieldsValue({
            section_id:"",
            teacher:[]
        });
        setEditingKey(newData.key);
       
      };

    const columns = [
        {
            title: "Section",
            dataIndex: "section_id",
            key: "section_id",
            width: "10%",
            editable: true,
            //   sorter: (a, b) => a.course_id - b.course_id,
        },
        {
            title: "Teacher",
            dataIndex: "teacher",
            width: "80%",
            editable: true,
            render: (teacher) => (
                <>
                    {teacher?.map((ele) => {
                        return <Tag style={{ height: '36px', lineHeight: '2.5', fontSize: '14px' }} key={ele}>{ele}</Tag>;
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
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            href="#"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>Cancel</a>
                        </Popconfirm>
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
                <Button type="secondary"  disabled={editingKey !== ""} onClick={() => handleAdd()}>Add Section</Button>
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
                    rowKey="key"
                />
            </Form>
        </>
    );
};