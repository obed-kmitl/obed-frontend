import styles from "./ActivityCard.module.scss"
import { Body, Header, Button } from ".."
import { Tag, Popconfirm } from "antd"
import {
    DeleteOutlined
} from "@ant-design/icons";
import googleClassroomLogo from "../../assets/img/logo_google_classroom.svg"
import { useState, useEffect } from "react";
import httpClient from '../../utils/httpClient';

function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const ActivityCard = ({ google, activity, index, deleteActivity }) => {
    const [score, setScore] = useState(0)

    useEffect(async () => {
        return await httpClient
            .get(`/activity/get/${activity.activity_id}`)
            .then((response) => {
                let total = 0;
                response.data.data.subActivities?.forEach(element => {
                    total += element.max_score
                });
                setScore(total)
                return Promise.resolve(response.data.data);
            })
            .catch((error) => {
                console.log(error)
            });

    }, [])


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
                                <Tag className={styles.tag} color="orange">{Capitalize(activity?.type)}</Tag>

                            </>
                        }
                    </div>
                    <Body level={2} className={styles.description}>{activity.detail}</Body>
                </div>
                <div className={styles.score}>
                    {google ?
                        <Button>Add to Activity</Button>
                        :
                        <Body level={1}>{score}pts</Body>
                    }
                </div>
                <Popconfirm title="Delete this Activity?" onConfirm={(e) => { deleteActivity(activity.activity_id); e.stopPropagation(); }} >
                    <DeleteOutlined style={{ color: "#C73535", fontSize: "18px" }} onClick={(e) => { e.stopPropagation(); }} />
                </Popconfirm>
            </div>
        </div >
    )
}
