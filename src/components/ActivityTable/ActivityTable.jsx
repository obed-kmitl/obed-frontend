
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Tag, Tooltip } from 'antd';
import {
    EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleTwoTone
} from '@ant-design/icons';
import { Header, Button, Select, Option } from '..'
import styles from '../ActivityTable/ActivityTable.module.scss'
import { useActivityTable } from './hooks/useActivityTable';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect } from 'react';

export const ActivityTable = ({ subActivity, setTotalScore}) => {
    const { data, form, editingKey, cloList, edit, cancel, save, deleteSubActivity, isNewAdded, add } = useActivityTable(subActivity)
    const isEditing = (record) => record.sub_activity_id === editingKey;

    useEffect(() => {
        let total = 0;
        data?.forEach(element => {
            total += element.max_score
        });
        setTotalScore(total)
       // eslint-disable-next-line
    }, [data])

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
            case "clos":
                inputNode = (
                    <Select
                        mode="multiple"
                        showSearch
                        placeholder="Select CLOs"
                        style={{ width: "350px" }}
                    >
                        {cloList.map((ele) => (
                            <Option key={ele.clo_id} value={ele.clo_id}>
                                {ele.order_number + " " + ele.detail}
                            </Option>
                        ))}
                    </Select>
                );
                break;
            case "max_score":
                inputNode = <InputNumber style={{ width: 50 }} min={0} />;
                break;
            case "detail":
                inputNode =
                    <TextArea
                        autoSize={{ minRows: 3, maxRows: 3 }}
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
        // {
        //     title: 'Title',
        //     dataIndex: 'title',
        //     width: '100px',
        //     editable: true,
        // },
        {
            title: 'Detail',
            dataIndex: 'detail',
            //width: '50%',
            editable: true,
            render: (detail) => (
                <>
                    <div className={styles.overflowBox}>{detail}</div>
                </>
            ),
        },
        {
            title: 'Course Learning Outcome',
            dataIndex: 'clos',
            width: '400px',
            editable: true,
            render: (clos) => (
                <div className={styles.overflowBox}>
                    {clos?.map((clo) => {
                        const cloData = cloList.filter((e) => e.clo_id === clo)[0]
                        //console.log(cloData)
                        return (
                            <Tooltip title={clo.detail} >
                                <Tag className={styles.tag} key={cloData?.clo_id}>
                                    {/* {cloData.number + " " + cloData.title} */}
                                    {cloData?.order_number + " " + cloData?.detail}
                                </Tag>
                            </Tooltip>
                        );
                    })}
                </div>
            ),
        },
        {
            title: 'Point',
            dataIndex: 'max_score',
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
                            onClick={() => save(record.sub_activity_id)}
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
                        <Popconfirm title="Delete this section?" onConfirm={() => deleteSubActivity(record.sub_activity_id)}>
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
                <Table id="activitytable"
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
                    rowKey="sub_activity_id"
                    scroll={{ y: "550px" }}
                // footer={() =>
                //     <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                //         <Button onClick={() => add()} disabled={editingKey !== "" || isNewAdded === true}>Add</Button>
                //     </div>
                // }
                />
            </Form>
        </div>
    );
};