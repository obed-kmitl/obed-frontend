import styles from '../ActivityOverview/ActivityOverview.module.scss'
import { ActivityTable, Header, Body, Select, Option } from '..'
import { Divider, Typography, Input } from 'antd'
import { useActivityOverview } from '../ActivityOverview/hooks/useActivityOverview'
import {
    EditOutlined, SaveOutlined,
} from '@ant-design/icons';
export const ActivityOverview = ({ activity, catagory }) => {
    const { activityData, isEditing, editOverview, saveOverview, handleEditDescription,changeCatagory,changeType } = useActivityOverview(activity)

    return (
        <>
            <div className={styles.overview}>
                <div className={styles.description}>
                    <Header level={2}>Description</Header>
                    <Divider style={{ border: "none", margin: "0.25rem", height: "0px" }} />
                    <div>
                        {isEditing ?
                            <Input.TextArea style={{ resize: "none" }} rows={4} onChange={({ target: { value } }) => handleEditDescription(value)} defaultValue={activityData?.description} />
                            :
                            <Body level={2}>{activityData?.description}</Body>
                        }

                    </div>
                </div>
                <Divider type="vertical" style={{ height: "100%" }} />
                <div className={styles.right}>
                    <div className={styles.catagory}>
                        <Header level={2}>Catagory</Header>
                        {isEditing ?
                            <Select
                                defaultValue={activityData?.catagory_id}
                                onChange={(value) => changeCatagory(value)}
                            >
                                {catagory.map((cat) =>
                                    <Option value={cat.id}>{cat.catagory}</Option>
                                )}
                            </Select>
                            :
                            <Body level={1}>{catagory.filter(e => e.id === activityData?.catagory_id)[0]?.catagory}</Body>
                        }

                    </div>
                    <Divider type="vertical" style={{ height: "100%" }} />
                    <div className={styles.type}>
                        <Header level={2}>Type</Header>
                        {isEditing ?
                            <Select
                                defaultValue={activityData?.type}
                                onChange={(value) => changeType(value)}
                            >
                                    <Option value="Individual">Individual</Option>
                                    <Option value="Group">Group</Option>
                            </Select>
                            :
                            <Body level={2}>{activityData?.type}</Body>
                        }
                       
                    </div>
                </div>
                {isEditing ?
                    <div className={styles.editicon}>
                        <Typography.Link
                            onClick={() => saveOverview()}
                        >
                            <SaveOutlined />
                        </Typography.Link>

                    </div>
                    :
                    <div className={styles.editicon}>
                        <Typography.Link
                            onClick={() => editOverview()}
                        >
                            <EditOutlined />
                        </Typography.Link>
                    </div>
                }
            </div >
            <div className={styles.objective}>
                <ActivityTable />
            </div>
        </>
    )
}
