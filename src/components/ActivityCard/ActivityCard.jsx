import styles from "./ActivityCard.module.scss"
import { Body, Header ,Button} from ".."
import { Tag, Typography, Dropdown, Menu } from "antd"
import {
    MoreOutlined
} from "@ant-design/icons";
import googleClassroomLogo from "../../assets/img/logo_google_classroom.svg"

const menu = (
    <Menu>
        <Menu.Item onClick={() => console.log("edit")}>
            Edit
        </Menu.Item>
        <Menu.Item danger onClick={() => console.log("archrive")}>
            Archrive
        </Menu.Item>
    </Menu>
);



export const ActivityCard = ({ google, activity, index }) => {

    return (
        <div className={styles.card}>
            {!google ?
                <div className={styles.number}>
                    <Body level={1}>{index}</Body>
                </div>
                :
                <img
                    src={googleClassroomLogo}
                    alt="google classroom"
                    className={styles.logo}
                />
            }
            <div className={styles.detail}>
                <div className={styles.content}>
                    <div className={styles.titleBox}>
                        <Header level={3} className={styles.title}>{activity.title}</Header>
                        {!google &&
                            <>
                                <Tag className={styles.tag} color="orange">{activity.type}</Tag>
                            </>
                        }
                    </div>
                    <Body level={2} className={styles.description}>{activity.detail}</Body>
                </div>
                <div className={styles.score}>
                    {google ?
                        <Button>Add to Activity</Button>
                        :
                        <Body level={1}>{activity.total_score}pts</Body>
                    }
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <Typography
                            style={{
                                marginLeft: 12,
                                fontSize: "20px",
                                color: "#1d1d1d"
                            }}
                        >
                            <MoreOutlined style={{ margin: "1rem 0" }} />
                        </Typography>
                    </Dropdown>

                </div>

            </div>
        </div >
    )
}
