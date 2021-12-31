
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Tag, Tooltip } from 'antd';
import {
    EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleTwoTone
} from '@ant-design/icons';
import { Header, Button, Select, Option } from '..'
import styles from '../ActivityTable/ActivityTable.module.scss'
import { useActivityTable } from './hooks/useActivityTable';
import TextArea from 'antd/lib/input/TextArea';



export const ActivityTable = () => {
    const { data, form, editingKey, cloList, edit, cancel, save, deleteSubActivity, isNewAdded, add } = useActivityTable()

    const isEditing = (record) => record.id === editingKey;

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
            case "clo":
                inputNode = (

                    <Select
                        mode="multiple"
                        showSearch
                        placeholder="Select CLOs"
                        style={{ width: "350px" }}
                    >
                        {cloList.map((ele) => (
                            <Option key={ele.id} value={ele.id}>
                                {ele.number + " " + ele.title}
                            </Option>
                        ))}
                    </Select>
                );
                break;
            case "point":
                inputNode = <InputNumber style={{ width: 50 }} min={0} />;
                break;
            case "detail":
                inputNode =
                    <TextArea
                        autoSize={{ minRows: 4, maxRows: 4 }}
                    />;
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

    const columns = [
        {
            title: 'No.',
            width: '80px',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: '100px',
            editable: true,
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            width: '50%',
            editable: true,
            render: (detail) => (
                <>
                    <div className={styles.detail}>{detail}</div>
                </>
            ),
        },
        {
            title: 'Course Learning Outcome',
            dataIndex: 'clo',
            width: '50%',
            editable: true,
            render: (clo) => (
                <>
                    {clo?.map((ele) => {
                        const cloData = cloList.filter((e) => e.id === ele)[0]
                        return (
                            <Tooltip title={cloData.title} >
                                <Tag className={styles.tag} key={cloData.id}>
                                    {cloData.number + " " + cloData.title}
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
            width: '80px',
            editable: true,
        },
        {
            title: 'Action',
            width: '90px',
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
                            disabled={editingKey !== "" || isNewAdded === true}
                            onClick={() => edit(record)}
                            style={{
                                marginRight: 12,

                            }}
                        >
                            <EditOutlined />
                        </Typography.Link>
                        <Popconfirm title="Delete this section?" onConfirm={() => deleteSubActivity(record)}>
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
                inputType: col.dataIndex,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <div className={styles.activityTable}>
            <div className={styles.header}>
                <Header level={2}>Objective</Header>
                <Button onClick={() => add()} disabled={editingKey !== "" || isNewAdded === true}>Add</Button>
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
                    rowKey="id"
                    scroll={{ y: "70vh" }}
                />
            </Form>
        </div>
    );
};