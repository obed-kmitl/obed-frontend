import styles from './ActivityList.module.scss'
import { Collapse, Panel, Header, Select, Option } from '..'

const catagory = [
    {
        id: 1,
        catagory: "Homework",
        weight: 20
    },
    {
        id: 2,
        catagory: "Assignment",
        weight: 20
    },
    {
        id: 3,
        catagory: "Examination",
        weight: 50
    },
    {
        id: 4,
        catagory: "Attendance",
        weight: 5
    },
    {
        id: 5,
        catagory: "Quiz",
        weight: 5
    },
]


export const ActivityList = () => {
    return (
        <div className={styles.activityList}>
            <div className={styles.filter}>
                Group:
                <Select width={150} defaultValue="ALL">
                    <Option value="ALL">All</Option>
                    <Option value="INDIVIDUAL">Individual</Option>
                    <Option value="GROUP">Group</Option>
                </Select>
                Type:
                <Select width={150} defaultValue="ALL">
                    <Option value="ALL">All</Option>
                    <Option value="SINGLE">Single</Option>
                    <Option value="MULTIPLE">Multiple</Option>
                </Select>
            </div>
            <Collapse
                ghost
                defaultActiveKey={catagory.map((cat) => cat.id)}
            >
                {catagory.map((cat) =>
                    <Panel
                        header={
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Header level={3}>{cat.catagory}</Header>
                                <Header style={{ color: "#F7941D" }} level={4}>{cat.weight}%</Header>
                            </div>
                        }
                        key={cat.id}
                    >
                        <p>test</p>
                    </Panel>
                )}
            </Collapse>
        </div>
    )
}
