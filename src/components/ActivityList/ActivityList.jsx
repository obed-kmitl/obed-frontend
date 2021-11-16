import styles from './ActivityList.module.scss'
import { Collapse, Panel, Header, Select, Option, Body, Button } from '..'
import { ActivityCard } from '..'
import googleClassroomLogo from "../../assets/img/logo_google_classroom.svg"

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

const archrive_activities = [
    {
        id: 1,
        title: "Homework #4",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 1,
        type: "Individual",
        sub_activity: "Single",
        total_score: 10,
    },
    {
        id: 2,
        title: "Homework #5",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 1,
        type: "Individual",
        sub_activity: "Multiple",
        total_score: 10,
    },
    {
        id: 3,
        title: "Assignment #7",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 2,
        type: "Group",
        sub_activity: "Single",
        total_score: 20,
    },

]

const google_activities = [
    {
        id: 1,
        title: "Homework #10",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",

    },
    {
        id: 2,
        title: "Homework #11",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",

    },
    {
        id: 3,
        title: "Assignment #12",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
    },

]

export const ActivityList = ({ archrive, google }) => {
    return (
        <div className={styles.activityList}>
            {google ?
                <Button className={styles.googleClassroomBtn}>
                    <img
                        src={googleClassroomLogo}
                        alt="google classroom"
                        className={styles.logo}
                    />
                    Change Course from Google Classroom
                </Button>
                :
                <div className={styles.filter}>
                    <Body level={1}>Group:</Body>
                    <Select width={150} defaultValue="All">
                        <Option value="All">All</Option>
                        <Option value="Individual">Individual</Option>
                        <Option value="Group">Group</Option>
                    </Select>
                    <Body level={1}>Type:</Body>
                    <Select width={150} defaultValue="All">
                        <Option value="All">All</Option>
                        <Option value="Single">Single</Option>
                        <Option value="Multiple">Multiple</Option>
                    </Select>
                    {archrive &&
                        <>
                            <Body level={1}>Catagory:</Body>
                            <Select width={150} defaultValue="All">
                                <Option value="All">All</Option>
                                {catagory.map((cat) =>
                                    <Option value={cat.id}>{cat.catagory}</Option>
                                )}
                            </Select>
                        </>
                    }
                </div>
            }
            {archrive ?
                <div style={{ padding: "1rem 0 0" }}>
                    {
                        archrive_activities.map((activity, index) =>
                            <ActivityCard activity={activity} key={activity.id} index={index + 1} />
                        )
                    }
                </div>
                : google ?
                    <div style={{ padding: "1rem 0 0" }}>
                        {
                            google_activities.map((activity, index) =>
                                <ActivityCard activity={activity} key={activity.id} index={index + 1} google />
                            )
                        }
                    </div>
                    :
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
                                {activities.filter((atv) => atv.catagory_id === cat.id).map((activity, index) =>
                                    <ActivityCard activity={activity} key={activity.id} index={index + 1} />
                                )}
                            </Panel>
                        )}
                    </Collapse>
            }
        </div>
    )
}
