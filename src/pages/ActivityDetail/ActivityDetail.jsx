import styles from './ActivityDetail.module.scss'
import { useParams, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {
    Header, TabPane, Tabs,
    ActivityOverview, ActivityGroup, ActivityGrading, ActivityRubric, ActivityGradingGroup
} from "../../components";
import { useEffect } from 'react';
import { useActivityDetail } from './hooks/useActivityDetail';
import { LeftOutlined } from "@ant-design/icons";

export const ActivityDetail = () => {
    let { activityId, sectionId } = useParams();
    const { activity, setActivity, category } = useActivityDetail(activityId, sectionId)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.activity}>
            <Helmet>
                <title>Activity - OBED </title>
            </Helmet>
            {activity && category &&
                <>
                    <Link to={`/${sectionId}/activity`} className={styles.backBtn} title="Back" style={{ color: "#f7941d" }} >
                        <LeftOutlined /> Back
                    </Link>
                    <div className={styles.head}>
                        <Header level={1}>
                            {activity.title}
                        </Header>
                        <Header level={2} style={{ color: '#68A028' }}>{activity.total_score}pts</Header>
                    </div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Overview" key="1">
                            <ActivityOverview activity={activity} category={category} setActivity={setActivity} />
                        </TabPane>
                        <TabPane tab="Group" key="2" disabled={activity.type === 'INDIVIDUAL'}>
                            <ActivityGroup activity={activity} />
                        </TabPane>
                        <TabPane tab="Grading" key="3">
                            {activity.type === "INDIVIDUAL" && <ActivityGrading activity={activity} />}
                            {activity.type === "GROUP" && <ActivityGradingGroup activity={activity} />}
                        </TabPane>
                        <TabPane tab="Rubric" key="4">
                            <ActivityRubric />
                        </TabPane>
                    </Tabs>
                </>
            }
        </div>
    )
}
