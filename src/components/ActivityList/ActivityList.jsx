import styles from './ActivityList.module.scss'
import { Collapse, Panel, Header, Select, Option, Body, Button } from '..'
import { ActivityCard } from '..'
import googleClassroomLogo from "../../assets/img/logo_google_classroom.svg"
import { useActivity } from './hooks/useActivity'



export const ActivityList = ({ archrive, google }) => {

    const {catagory,filteredActivity,filteredArchriveActivity,googleActivity,changeGroup,changeType,changeCatagory} = useActivity()

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
                    <Select width={150} defaultValue="All" onChange={(value)=>changeGroup(value,archrive)}>
                        <Option value="All">All</Option>
                        <Option value="Individual">Individual</Option>
                        <Option value="Group">Group</Option>
                    </Select>
                    <Body level={1}>Type:</Body>
                    <Select width={150} defaultValue="All" onChange={(value)=>changeType(value,archrive)}>
                        <Option value="All">All</Option>
                        <Option value="Single">Single</Option>
                        <Option value="Multiple">Multiple</Option>
                    </Select>
                    {archrive &&
                        <>
                            <Body level={1}>Catagory:</Body>
                            <Select width={150} defaultValue="All" onChange={(value)=>changeCatagory(value)}>
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
                        filteredArchriveActivity?.map((activity, index) =>
                            <ActivityCard activity={activity} key={activity.id} index={index + 1} />
                        )
                    }
                </div>
                : google ?
                    <div style={{ padding: "1rem 0 0" }}>
                        {
                            googleActivity.map((activity, index) =>
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
                                {filteredActivity?.filter((atv) => atv.catagory_id === cat.id).map((activity, index) =>
                                    <ActivityCard activity={activity} key={activity.id} index={index + 1} />
                                )}
                            </Panel>
                        )}
                    </Collapse>
            }
        </div>
    )
}
