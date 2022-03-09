import { Table, InputNumber, Popconfirm, Form, Typography, Tooltip } from 'antd';
import { useParams } from "react-router-dom";
import { useCategory } from './hooks/useCategory';
import styles from './CategoryTable.module.scss'
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
    const inputNode = inputType === 'number' ? <InputNumber min={0} /> : <Input />;
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

export const CategoryTable = () => {
    let { sectionId } = useParams();
    const {
        form,
        weightingList,
        handleAddWeighting,
        removeWeighting,
        edit,
        cancel,
        save,
        isEditing,
        editingKey,
    } = useCategory(sectionId)

    const columns = [
        {
            title: 'Category',
            dataIndex: 'title',
            width: '80%',
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
                        <Typography.Link
                            onClick={() => edit(record)}
                            disabled={editingKey !== ''}>
                            <EditOutlined />
                        </Typography.Link>
                        <Popconfirm
                            title="Delete this Category?"
                            onConfirm={() => removeWeighting(record)}
                        >
                            <Typography.Link type="danger"  disabled={editingKey !== ''} >
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
                    <Header level={4}>Category</Header>
                </div>
                <Button onClick={() => handleAddWeighting()} disabled={editingKey !== ''}>Add</Button>
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
        </Form>
    );
};