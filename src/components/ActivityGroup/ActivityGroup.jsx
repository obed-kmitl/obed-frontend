import styles from '../ActivityGroup/ActivityGroup.module.scss'
import { useState } from 'react';
import { Button, Collapse, Panel, Header, Select, Option } from '..'
import {
    CloseOutlined, DeleteOutlined
} from '@ant-design/icons';
import { Popover } from 'antd';

const groups = [
    {
        id: 1,
        group_name: 'Group 1',
        member: [61010352, 61010541, 61011387, 61019999]
    },
    {
        id: 2,
        group_name: 'Group 2',
        member: [61010001, 61010002, 61010003, 61010004]
    },
    {
        id: 3,
        group_name: 'Group 3',
        member: [61010005, 61010006, 61010007, 61010008, 61010352, 61010541, 61011387, 61019999, 61010352, 61010541, 61011387, 61019999]
    },
    {
        id: 4,
        group_name: 'Group 4',
        member: [61010010, 61010011, 61019995, 61019996]
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

    function handleAddStudent(value) {
        let added = [...group]
        added.filter((e) => e.id === addingGroup)[0].member.push(value)
        setGroup(added)
        setAddingGroup(null)
    }

    function handleRemoveStudent() {
        console.log("remove")
    }

    function handleAddGroup() {
        console.log("addG")
    }

    function handleDeleteGroup() {
        console.log("delete")
    }

    return (
        <div className={styles.group}>
            <div className={styles.header}>
                <Header level={2}>All Groups </Header>
                <div style={{ gap: "0.5rem", display: "flex" }}>
                    <Button>Import</Button>
                    <Button onClick={() => handleAddGroup()}>Add</Button>
                </div>

            </div>
            <Collapse >
                {group.map((g, index) =>
                    <Panel
                        header={
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Header level={3}>{g.group_name}</Header>
                                <DeleteOutlined style={{ color: "#C73535" }} onClick={(e) => { e.stopPropagation(); handleDeleteGroup() }} />
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
                                        <div onClick={() => handleRemoveStudent()}><CloseOutlined /></div>
                                    </div>
                                </Popover>
                            )}
                            {addingGroup === g.id ?
                                <Select
                                    width={120}
                                    onChange={(value) => handleAddStudent(value)}
                                    showSearch={true}
                                >
                                    {students.map((std) =>
                                        <Option value={std.id} disabled={g.member.includes(std.id)}>{std.id}</Option>
                                    )}
                                </Select>
                                :

                                <div className={styles.addbtn} onClick={() => setAddingGroup(g.id)}>
                                    Add Student
                                </div>
                            }
                        </div>
                    </Panel>)
                }
            </Collapse>

        </div>
    )
}
