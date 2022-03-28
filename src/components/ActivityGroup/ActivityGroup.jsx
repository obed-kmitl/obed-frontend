import styles from '../ActivityGroup/ActivityGroup.module.scss'
import { useState, useEffect } from 'react';
import { Button, Collapse, Panel, Header, Select, Option } from '..'
import {
    CloseOutlined, DeleteOutlined, EditOutlined
} from '@ant-design/icons';
import { Input, Popover, Modal, Form, Popconfirm } from 'antd';
import httpClient from '../../utils/httpClient';
import { useSectionContext } from "../../contexts/SectionContext";
import { useActivityContext } from '../../contexts/ActivityContext';

export const ActivityGroup = () => {
    const [group, setGroup] = useState()
    const [students, setStudents] = useState()
    const [addingGroup, setAddingGroup] = useState(null)
    const [addGroupModal, setAddGroupModal] = useState(false)
    const [editingGroup, setEditingGroup] = useState(null)
    const [form] = Form.useForm()
    const {section} = useSectionContext()
    const { activityId } = useActivityContext();

    async function handleAddStudent(group_id, value) {
        return await httpClient
            .post(`/assessment/assignGroup/${group_id}`, {
                student_id: value
            })
            .then(() => {
                let added = [...group]
                const student = students.filter((std) => std.student_id === value)[0]
                added.filter((e) => e.group_id === addingGroup)[0].students.push(student)
                setGroup(added)
                setAddingGroup(null)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function handleRemoveStudent(s_id, g_id) {
        return await httpClient
            .post(`/assessment/unassignGroup/${g_id}`, {
                student_id: s_id
            })
            .then(() => {
                let removed = [...group]
                removed.filter((e) => e.group_id === g_id)[0].students = removed.filter((e) => e.group_id === g_id)[0].students.filter((e) => e.student_id !== s_id);
                setGroup(removed)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function handleAddGroup(value) {
        return await httpClient
            .post(`/assessment/createGroup/${activityId}`, {
                title: value.title
            })
            .then((response) => {
                setGroup([...group, {
                    group_id: response.data.data.group_id,
                    title: response.data.data.title,
                    students: []
                }])
                form.resetFields()
                setAddGroupModal(false)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function handleDeleteGroup(id) {
        return await httpClient
            .delete(`/assessment/removeGroup/${id}`)
            .then(() => {
                setGroup(group.filter((g) => g.group_id !== id))
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function handleEditGroup(value) {
        return await httpClient
            .put(`/assessment/updateGroup/${editingGroup}`, {
                title: value.title
            })
            .then(() => {
                let edited = [...group]
                edited.filter((g) => g.group_id === editingGroup)[0].title = value.title
                setGroup(edited)
                setEditingGroup(null)
                form.resetFields()
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function fetchGroup() {
        return await httpClient
            .get(`/assessment/getAllGroupByActivity/${activityId}`)
            .then((response) => {
                setGroup(response.data.data.sort((a, b) => a.group_id - b.group_id))
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function fetchStudent() {
        return await httpClient
            .get(`/student/getAllBySection/${section}`)
            .then((response) => {
                setStudents(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        form.setFieldsValue({ title: group?.filter((g) => g.group_id === editingGroup)[0]?.title })
    }, [editingGroup])

    useEffect(() => {
        if(section)
        fetchStudent()
    }, [section])
    useEffect(() => {
        if(activityId)
        fetchGroup()
    }, [activityId])

    useEffect(() => {
        console.log(group);

        const allStudent = group?.map((g) => {
            const student = g.students.map(s => {
                return s.student_number
            })
            return student
        });
        if (allStudent) {
            console.log([].concat(...allStudent))
        }
    }, [group])

    return (
        <div className={styles.group}>
            <div className={styles.header}>
                <Header level={2}>All Groups </Header>
                <div style={{ gap: "0.5rem", display: "flex" }}>
                    <Button onClick={() => setAddGroupModal(true)}>Add</Button>
                </div>
            </div>
            <Collapse >
                {group?.map((g, index) =>
                    <Panel
                        header={
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Header level={4}>{g.title}</Header>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <EditOutlined style={{ color: "#009fc7" }} onClick={(e) => { e.stopPropagation(); setEditingGroup(g.group_id) }} />
                                    <Popconfirm title="Delete this group?" onConfirm={() => handleDeleteGroup(g.group_id)}>
                                        <DeleteOutlined style={{ color: "#C73535" }} onClick={(e) => { e.stopPropagation(); }} />
                                    </Popconfirm>
                                </div>
                            </div>
                        }
                        key={index}>
                        <div className={styles.container}>
                            {g.students.map((student) =>
                                <Popover
                                    content={
                                        student.prefix + student.firstname + " " + student.lastname
                                    }
                                    title={student.student_number}
                                >
                                    <div className={styles.student}>
                                        {student.student_number}
                                        <div onClick={() => handleRemoveStudent(student.student_id, g.group_id)}><CloseOutlined /></div>
                                    </div>
                                </Popover>
                            )}
                            {addingGroup === g.group_id ?
                                <div className={styles.select}>
                                    <Select
                                        width={120}
                                        onChange={(value) => handleAddStudent(g.group_id, value)}
                                        showSearch={true}
                                    >
                                        {students.map((std) =>
                                            <Option value={std.student_id} disabled={[].concat(...group?.map((g) => {
                                                const student = g.students.map(s => {
                                                    return s.student_id
                                                })
                                                return student
                                            })).includes(std.student_id)}>{std.student_number}</Option>
                                        )}
                                    </Select>
                                    <CloseOutlined style={{ color: "#C73535" }} onClick={() => setAddingGroup(null)} />
                                </div>
                                :
                                <div className={styles.addbtn} onClick={() => setAddingGroup(g.group_id)}>
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
                        name="title"
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
                        name="title"
                        rules={[
                            { required: true, message: "Please input Name" },
                        ]}
                    >
                        <Input name='title' placeholder="Group Name" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
