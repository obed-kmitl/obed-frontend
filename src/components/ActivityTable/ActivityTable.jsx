import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Tag, Tooltip } from 'antd';
import {
    EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleTwoTone
} from '@ant-design/icons';
import { Header, Button } from '..'
import styles from '../ActivityTable/ActivityTable.module.scss'
import { useActivityTable } from './hooks/useActivityTable';

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
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
                            required: true,
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

export const ActivityTable = () => {
    const { subActivity } = useActivityTable()

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [data, setData] = useState(subActivity);
    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        console.log(record)
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (id) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'No.',
            width: '5%',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: '10%',
            editable: true,
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            width: '35%',
            editable: true,
        },
        {
            title: 'Course Learning Outcome',
            dataIndex: 'clo',
            width: '35%',
            editable: true,
            render: (clo) => (
                <>
                    {clo?.map((ele) => {
                        return (
                            <Tooltip title={ele.title} >
                                <Tag className={styles.tag} key={ele.id}>
                                    {ele.title}
                                </Tag>
                            </Tooltip>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Point',
            dataIndex: 'point',
            width: '5%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            width: '10%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            onClick={() => save(record.id)}
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
                            //disabled={editingKey !== "" || isNewAdded === true}
                            onClick={() => edit(record)}
                            style={{
                                marginRight: 12,

                            }}
                        >
                            <EditOutlined />
                        </Typography.Link>
                        <Popconfirm title="Delete this section?" onConfirm={() => {}}>
                            <Typography.Link
                                //disabled={editingKey !== "" || isNewAdded === true}
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
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <>
            <div className={styles.header}>
                <Header level={2}>Objective</Header>
                <Button>Add</Button>
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
                    pagination={{
                        onChange: cancel,
                    }}
                    rowKey="id"
                />
            </Form>
        </>
    );
};