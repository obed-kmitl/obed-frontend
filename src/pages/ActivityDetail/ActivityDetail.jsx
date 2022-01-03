import styles from './ActivityDetail.module.scss'
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {
    Header, TabPane, Tabs, ActivityOverview
} from "../../components";
import { useEffect } from 'react';
import { useActivityDetail } from './hooks/useActivityDetail';
import { useActivityOverview } from '../../components/ActivityOverview/hooks/useActivityOverview';

export const ActivityDetail = () => {
    let { activityId } = useParams();
    const { activity, catagory } = useActivityDetail()
    const { isEditing, editOverview ,saveOverview } = useActivityOverview()

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <div className={styles.activity}>
            <Helmet>
                <title>Activity-{activityId} {activity.title} </title>
            </Helmet>
            <div className={styles.head}>
                <Header level={1}>Activity #{activityId}</Header>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Overview" key="1">
                    <ActivityOverview activity={activity} catagory={catagory} />
                </TabPane>
                <TabPane tab="Group" key="2" disabled>

                </TabPane>
                <TabPane tab="Grading" key="3">

                </TabPane>
                <TabPane tab="Rubric" key="4">

                </TabPane>
            </Tabs>

        </div>
    )
}
