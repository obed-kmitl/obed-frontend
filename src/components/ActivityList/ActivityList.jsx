import styles from './ActivityList.module.scss'
import { Collapse, Panel, Header, Select, Option } from '..'
import { ActivityCard } from '..'

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

const activities = [
    {
        id: 1,
        title: "Homework #1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 1,
        type: "Individual",
        sub_activity: "Single",
        total_score: 10,
    },
    {
        id: 2,
        title: "Homework #2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 1,
        type: "Individual",
        sub_activity: "Multiple",
        total_score: 10,
    },
    {
        id: 3,
        title: "Assignment #1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 2,
        type: "Group",
        sub_activity: "Single",
        total_score: 20,
    },
    {
        id: 4,
        title: "Quiz #1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 5,
        type: "Individual",
        sub_activity: "Multiple",
        total_score: 10,
    },
    {
        id: 5,
        title: "Final Exam",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 3,
        type: "Individual",
        sub_activity: "Multiple",
        total_score: 40,
    },
    {
        id: 6,
        title: "Adttendance",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 4,
        type: "Individual",
        sub_activity: "Single",
        total_score: 100,
    }
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
                        {activities.filter((atv)=>atv.catagory_id===cat.id).map((activity,index) =>
                            <ActivityCard activity={activity} key={activity.id} index={index+1} />
                        )}
                    </Panel>
                )}
            </Collapse>
        </div>
    )
}
