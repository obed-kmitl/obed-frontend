import styles from './Activity.module.scss'
import { Helmet } from "react-helmet";
import {
    Header, TabPane, Tabs,
    ActivityList, ClassroomTab
} from "../../components";

export const Activity = () => {

    return (
        <div className={styles.activity}>
            <Helmet>
                <title>Activity - OBED</title>
            </Helmet>
            <div className={styles.head}>
                <Header level={1}>Activity</Header>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Active" key="1">
                    <ActivityList />
                </TabPane>
                <TabPane tab="Google Classsroom" key="2">
                    <ClassroomTab />
                </TabPane>
            </Tabs>
        </div>
    )
}
