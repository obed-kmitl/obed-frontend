import styles from './ActivityDetail.module.scss'
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {
    Header, TabPane, Tabs,
    ActivityOverview, ActivityGroup
} from "../../components";
import { useEffect } from 'react';
import { useActivityDetail } from './hooks/useActivityDetail';

export const ActivityDetail = () => {
    let { activityId } = useParams();
    const { activity, setActivity, catagory } = useActivityDetail()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.activity}>
            <Helmet>
                <title>Activity - OBED </title>
            </Helmet>
            <div className={styles.head}>
                <Header level={1}>{activity.title}</Header>
                <Header level={2} style={{ color: '#68A028' }}>{activity.total_score}pts</Header>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Overview" key="1">
                    <ActivityOverview activity={activity} catagory={catagory} setActivity={setActivity} />
                </TabPane>
                <TabPane tab="Group" key="2" disabled={activity.type === 'Individual'}>
                    <ActivityGroup activity={activity}/>
                </TabPane>
                <TabPane tab="Grading" key="3">

                </TabPane>
                <TabPane tab="Rubric" key="4">

                </TabPane>
            </Tabs>

        </div>
    )
}
