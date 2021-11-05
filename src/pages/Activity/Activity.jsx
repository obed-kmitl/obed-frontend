import styles from './Activity.module.scss'
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { 
    Header, Button, TabPane, Tabs, 
    ActivityList
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
                    <ActivityList/>
                </TabPane>
                <TabPane tab="Archived" key="2">
                    <div>archived</div>
                </TabPane>
                <TabPane tab="Google Classsroom" key="3">
                    <div>Google Classroom</div>
                </TabPane>
            </Tabs>

        </div>
    )
}
