import styles from "./ActivityCard.module.scss"
import { Body, Header } from ".."
import { Tag } from "antd"

export const ActivityCard = ({ activity, index }) => {
    console.log(activity)
    return (
        <div className={styles.card}>
            <div className={styles.number}>
                <Body level={1}>{index}</Body>
            </div>
            <div className={styles.detail}>
                <div className={styles.content}>
                    <div className={styles.titleBox}>
                        <Header level={3} className={styles.title}>{activity.title}</Header>
                        <Tag className={styles.tag} color="orange">{activity.type}</Tag>
                        <Tag className={styles.tag} color="green" >{activity.sub_activity}</Tag>
                        
                    </div>
                    <Body level={2} className={styles.description}>{activity.description}pts</Body>
                </div>
                <div className={styles.score}>
                    <Body level={1}>{activity.total_score}pts</Body>
                </div>
            </div>
        </div>
    )
}
