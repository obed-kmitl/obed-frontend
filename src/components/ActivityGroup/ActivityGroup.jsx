import styles from '../ActivityGroup/ActivityGroup.module.scss'
import { useState, useEffect } from 'react';
import { Button, Collapse, Panel, Header, Select, Option } from '..'
import {
    CloseOutlined, DeleteOutlined, EditOutlined
} from '@ant-design/icons';
import { Input, Popover, Modal, Form, Popconfirm } from 'antd';

const groups = [
    {
        id: 1,
        group_name: 'Group 1',
        member: [61010001, 61010002, 61010003, 61010004]
    },
    {
        id: 2,
        group_name: 'Group 2',
        member: [61010005, 61010006, 61010007,]
    },
    {
        id: 3,
        group_name: 'Group 3',
        member: [61010008, 61010009, 61010010]
    },
    {
        id: 4,
        group_name: 'Group 4',
        member: [61010011, 61019999, 61019998]
    }
]

const students = [
    {
        id: 61010001,
        prefix: "นางสาว",
        firstname: "กมลชนก",
        lastname: "ศรีไทย",
        email: "61010001@kmitl.ac.th",
    },
    {
        id: 61010002,
        prefix: "นาย",
        firstname: "ธนวัฒน์",
        lastname: "สมมุติ",
        email: "61010002@kmitl.ac.th",
    },
    {
        id: 61010003,
        prefix: "นาย",
        firstname: "สมปอง",
        lastname: "สุขสบาย",
        email: "61010003@kmitl.ac.th",
    },
    {
        id: 61010004,
        prefix: "นาย",
        firstname: "สมปราชญ์",
        lastname: "สดใส",
        email: "61010004@kmitl.ac.th",
    },
    {
        id: 61010005,
        prefix: "นาย",
        firstname: "สมหมาย",
        lastname: "สายไทย",
        email: "61010005@kmitl.ac.th",
    },
    {
        id: 61010006,
        prefix: "นาย",
        firstname: "สมหมาย",
        lastname: "รักไทย",
        email: "61010006@kmitl.ac.th",
    },
    {
        id: 61010007,
        prefix: "นาย",
        firstname: "สมศักดิ์",
        lastname: "ใฝ่รู้",
        email: "61010007@kmitl.ac.th",
    },
    {
        id: 61010008,
        prefix: "นาย",
        firstname: "สมชาย",
        lastname: "ใจดี",
        email: "61010008@kmitl.ac.th",
    },
    {
        id: 61010009,
        prefix: "นาย",
        firstname: "สมพงศ์",
        lastname: "ชัยชนะ",
        email: "61010009@kmitl.ac.th",
    },
    {
        id: 61010010,
        prefix: "นางสาว",
        firstname: "สมสง่า",
        lastname: "ราศี",
        email: "61010010@kmitl.ac.th",
    },
    {
        id: 61010011,
        prefix: "นางสาว",
        firstname: "สมหญิง",
        lastname: "จริงใจ",
        email: "61010011@kmitl.ac.th",
    },
];

export const ActivityGroup = () => {
    const [group, setGroup] = useState(groups)
    const [addingGroup, setAddingGroup] = useState(null)
    const [addGroupModal, setAddGroupModal] = useState(false)
    const [editingGroup, setEditingGroup] = useState(null)
    const [form] = Form.useForm()

    function handleAddStudent(value) {
        let added = [...group]
        added.filter((e) => e.id === addingGroup)[0].member.push(value)
        setGroup(added)
        setAddingGroup(null)
    }

    function handleRemoveStudent(student, g_id) {
        let removed = [...group]
        removed.filter((e) => e.id === g_id)[0].member = removed.filter((e) => e.id === g_id)[0].member.filter((e) => e !== student);
        setGroup(removed)
    }

    function handleAddGroup(value) {
        setGroup([...group, {
            id: Date.now(),//mock wait id from backend
            group_name: value.group_name,
            member: []
        }])
        form.resetFields()
        setAddGroupModal(false)
    }

    function handleDeleteGroup(id) {
        setGroup(group.filter((g) => g.id !== id))
    }

    function handleEditGroup(value) {
        console.log(value)
        let edited = [...group]
        edited.filter((g) => g.id === editingGroup)[0].group_name = value.group_name
        setGroup(edited)
        setEditingGroup(null)
        form.resetFields()
    }
    useEffect(() => {
        form.setFieldsValue({ group_name: group.filter((g) => g.id === editingGroup)[0]?.group_name })
        // eslint-disable-next-line
    }, [editingGroup])

    return (
        <div className={styles.group}>
            <div className={styles.header}>
                <Header level={2}>All Groups </Header>
                <div style={{ gap: "0.5rem", display: "flex" }}>
                    <Button>Import</Button>
                    <Button onClick={() => setAddGroupModal(true)}>Add</Button>
                </div>

            </div>
            <Collapse >
                {group.map((g, index) =>
                    <Panel
                        header={
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Header level={3}>{g.group_name}</Header>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <EditOutlined style={{ color: "#009fc7" }} onClick={(e) => { e.stopPropagation(); setEditingGroup(g.id) }} />
                                    <Popconfirm title="Delete this group?" onConfirm={() => handleDeleteGroup(g.id)}>
                                        <DeleteOutlined style={{ color: "#C73535" }} onClick={(e) => { e.stopPropagation(); }} />
                                    </Popconfirm>
                                </div>
                            </div>
                        }
                        key={index}>
                        <div className={styles.container}>
                            {g.member.map((student) =>
                                <Popover
                                    content={
                                        students.filter((e) => e.id === student)[0]?.prefix + " " +
                                        students.filter((e) => e.id === student)[0]?.firstname + " " +
                                        students.filter((e) => e.id === student)[0]?.lastname
                                    }
                                    title={student}
                                >
                                    <div className={styles.student}>
                                        {student}
                                        <div onClick={() => handleRemoveStudent(student, g.id)}><CloseOutlined /></div>
                                    </div>
                                </Popover>
                            )}
                            {addingGroup === g.id ?
                                <div className={styles.select}>
                                    <Select
                                        width={120}
                                        onChange={(value) => handleAddStudent(value)}
                                        showSearch={true}
                                    >
                                        {students.map((std) =>
                                            <Option value={std.id} disabled={g.member.includes(std.id)}>{std.id}</Option>
                                        )}
                                    </Select>
                                    <CloseOutlined style={{ color: "#C73535" }} onClick={() => setAddingGroup(null)} />
                                </div>
                                :
                                <div className={styles.addbtn} onClick={() => setAddingGroup(g.id)}>
                                    Add Student
                                </div>
                            }
                        </div>
                    </Panel>)
                }
            </Collapse>
            <Modal
                title={"Add Group"}
                visible={addGroupModal}
                okText="Add"
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            handleAddGroup(values);
                        })
                        .catch((info) => {
                            console.log("Validate Failed", info);
                        });
                }}
                onCancel={() => { setAddGroupModal(false); form.resetFields() }}
                okButtonProps={{ htmlType: "submit" }}
                maskClosable={false}
                centered
            >
                <Form
                    form={form}
                    name="group"
                    autoComplete="off"
                    requiredMark={"required"}
                >
                    <Form.Item
                        label="Group Name"
                        name="group_name"
                        rules={[
                            { required: true, message: "Please input Name" },
                        ]}
                    >
                        <Input placeholder="Group Name" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title={"Edit Group"}
                visible={editingGroup !== null}
                okText="Save"
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            handleEditGroup(values);
                        })
                        .catch((info) => {
                            console.log("Validate Failed", info);
                        });
                }}
                onCancel={() => { setEditingGroup(null); form.resetFields() }}
                okButtonProps={{ htmlType: "submit" }}
                maskClosable={false}
                centered
            >
                <Form
                    form={form}
                    name="group"
                    autoComplete="off"
                    requiredMark={"required"}
                >
                    <Form.Item
                        label="Group Name"
                        name="group_name"
                        rules={[
                            { required: true, message: "Please input Name" },
                        ]}
                    >
                        <Input name='group_name' placeholder="Group Name" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
