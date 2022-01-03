import styles from '../ActivityGroup/ActivityGroup.module.scss'
import { Button, Collapse, Panel, Header } from '..'
import {
    CloseOutlined
} from '@ant-design/icons';
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
export const ActivityGroup = () => {
    return (
        <div className={styles.group}>
            <div className={styles.header}>
                <Header level={2}>All Groups </Header>
                <div style={{gap:"0.5rem" ,display:"flex"}}>
                    <Button>Import</Button>
                    <Button>Add</Button>
                </div>

            </div>
            <Collapse >
                {groups.map((g, index) =>
                    <Panel header={<Header level={3}>{g.group_name}</Header>} key={index}>
                        <div className={styles.container}>
                            {g.member.map((student) =>
                                <div className={styles.student}>
                                    {student}
                                    <div><CloseOutlined /></div>
                                </div>
                            )}
                            <div className={styles.addbtn}>
                                Add Student
                            </div>
                        </div>
                    </Panel>)
                }
            </Collapse>

        </div>
    )
}
