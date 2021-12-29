import styles from './Activity.module.scss'
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {
    Header, Button, TabPane, Tabs,
    ActivityList, ClassroomTab
} from "../../components";

export const Activity = () => {
    let { sectionId } = useParams();
    return (
        <div className={styles.activity}>
            <Helmet>
                <title>{sectionId} Activity - OBED</title>
            </Helmet>
            <div className={styles.head}>
                <Header level={1}>Activity</Header>
                <div>
                    <Button>New</Button>
                </div>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Active" key="1">
                    <ActivityList />
                </TabPane>
                <TabPane tab="Archived" key="2">
                    <ActivityList archrive />
                </TabPane>
                <TabPane tab="Google Classsroom" key="3">
                    <ClassroomTab />
                </TabPane>
            </Tabs>

        </div>
    )
}
