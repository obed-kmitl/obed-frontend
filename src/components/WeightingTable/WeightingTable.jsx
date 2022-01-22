import React, { useState } from 'react';
import { Table, InputNumber, Popconfirm, Form, Typography, Tooltip } from 'antd';
import { useParams } from "react-router-dom";
import { useWeighting } from './hooks/useWeighting';
import styles from './WeightingTable.module.scss'
import { Header, Button, Input } from "../../components";
import {
    DeleteOutlined,
    InfoCircleOutlined,
    EditOutlined,
    SaveOutlined,
    CloseCircleTwoTone,
} from "@ant-design/icons";

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
    const inputNode = inputType === 'number' ? <InputNumber min={0}/> : <Input />;
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

export const WeightingTable = () => {
    let { sectionId } = useParams();
    const {
        form,
        weightingList,
        isAllEditing,
        handleEditBtn,
        handleAddWeighting,
        removeWeighting,
        cancelAll,
        saveAll,
        edit,
        cancel,
        save,
        isEditing,
        editingKey,
    } = useWeighting(sectionId)

    const columns = [
        {
            title: 'Category',
            dataIndex: 'title',
            width: '80%',
            editable: true,
        },
        {
            title: 'Weight(%)',
            dataIndex: 'weight',
            width: '10%',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: "5%",
            render: (_, record, index) => {
                const editable = isEditing(record);
                return editable ? (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Typography.Link
                            onClick={() => save(record.category_id)}
                        >
                            <SaveOutlined />
                        </Typography.Link>
                        <Typography.Link
                            onClick={() => cancel()}
                        >
                            <CloseCircleTwoTone twoToneColor="#C73535" />
                        </Typography.Link>
                    </div>
                ) : (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Typography.Link disabled={editingKey !== '' || !isAllEditing} onClick={() => edit(record)}>
                            <EditOutlined />
                        </Typography.Link>
                        <Popconfirm title="Delete this Category?" onClick={() => removeWeighting(record)}>
                            <Typography.Link type="danger" disabled={editingKey !== '' || !isAllEditing} >
                                <DeleteOutlined />
                            </Typography.Link>
                        </Popconfirm>
                    </div>
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
                inputType: col.dataIndex === 'weight' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <div className={styles.flexrowSpace}>
                <div className={styles.flexrow}>
                    <Header level={2}>Score Weighting&nbsp;</Header>
                    <Tooltip title=" Total score must be 100%"> <InfoCircleOutlined /></Tooltip>
                </div>
                {isAllEditing ?
                    <Button onClick={() => handleAddWeighting()} disabled={editingKey !== ''}>Add</Button>
                    :
                    <Button onClick={() => handleEditBtn()}>Edit</Button>
                }
            </div>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={weightingList}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
                rowKey="category_id"
            />
            {(isAllEditing) &&
                <div className={styles.btnGroup}>
                    <Button disabled={editingKey !== ''} onClick={() => cancelAll()}>Cancel</Button>
                    <Button disabled={editingKey !== ''} type="primary" onClick={() => saveAll()}>Save</Button>
                </div>
            }
        </Form>
    );
};