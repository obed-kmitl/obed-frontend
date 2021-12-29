import styles from '../ActivityOverview/ActivityOverview.module.scss'
import { ActivityTable, Header, Body, Button } from '..'
import { Divider } from 'antd'

export const ActivityOverview = ({ activity, catagory }) => {

    return (
        <>
            <div className={styles.overview}>
                <div className={styles.description}>
                    <Header level={2}>Description</Header>
                    <Divider style={{ border: "none", margin: "0.25rem", height: "0px" }} />
                    <div>
                        <Body level={2}>{activity.description}</Body>
                    </div>
                </div>
                <Divider type="vertical" style={{ height: "100%" }} />
                <div className={styles.right}>
                    <div className={styles.catagory}>
                        <Header level={2}>Catagory</Header>
                        <Body level={1}>{catagory.filter(e => e.id === activity.catagory_id)[0].catagory}</Body>
                    </div>
                    <Divider type="vertical" style={{ height: "100%" }} />
                    <div className={styles.type}>
                        <Header level={2}>Type</Header>
                        <Body level={2}>{activity.type}</Body>
                    </div>
                </div>
            </div >
            <div className={styles.objective}>
                <ActivityTable />
            </div>
        </>
    )
}
