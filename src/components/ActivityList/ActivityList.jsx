import styles from './ActivityList.module.scss'
import { Collapse, Panel, Header, Select, Option, Body, Button, Input } from '..'
import { ActivityCard } from '..'
// import googleClassroomLogo from "../../assets/img/logo_google_classroom.svg"
import { useActivity } from './hooks/useActivity'
import { Link } from 'react-router-dom'
import { Modal, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea'


export const ActivityList = ({ google }) => {

    const {
        category, filteredActivity, changeGroup,
        handleAddActivity, addModalVisible, handleSubmit, form, handleCancel,deleteActivity
    } = useActivity()

    return (
        <div className={styles.activityList}>
            {
                // google ?
                //     <Button className={styles.googleClassroomBtn}>
                //         <img
                //             src={googleClassroomLogo}
                //             alt="google classroom"
                //             className={styles.logo}
                //         />
                //         Change Course from Google Classroom
                //     </Button>
                //     :
                <div className={styles.filter}>
                    <Body level={1}>Group:</Body>
                    <Select width={150} defaultValue="All" onChange={(value) => changeGroup(value)}>
                        <Option value="All">All</Option>
                        <Option value="Individual">Individual</Option>
                        <Option value="Group">Group</Option>
                    </Select>
               
                        
                            <Button onClick={() => handleAddActivity()} >New</Button>
                        
                   
                </div>
            }
            {category.length>0&&
                // google ?
                //     <div style={{ padding: "1rem 0 0" }}>
                //         {
                //             googleActivity.map((activity, index) =>
                //                 <ActivityCard activity={activity} key={activity.id} index={index + 1} google />
                //             )
                //         }
                //     </div>
                //     :
                <Collapse
                    ghost
                    defaultActiveKey={category.map((cat) => cat.category_id)}
                >
                    {category.map((cat) =>
                        <Panel
                            header={
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Header level={3}>{cat.title}</Header>
                                    {cat.title !== "Unassigned" &&<Header style={{ color: "#F7941D" }} level={4}>{cat.weight}%</Header>}
                                </div>
                            }
                            key={cat.category_id}
                            
                        >
                            {filteredActivity?.filter((atv) => atv.category_id === cat.category_id).map((activity, index) =>
                                <Link to={`${window.location.pathname.split("/")[3]}/${activity.activity_id}`} className={styles.link}>
                                    <ActivityCard activity={activity} key={activity.activity_id} index={index + 1} deleteActivity={deleteActivity} />
                                </Link>
                            )}
                        </Panel>
                    )}
                </Collapse>
            }
            <Modal
                title="New Activity"
                visible={addModalVisible}
                okText="Create"
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            handleSubmit(values);
                        })
                        .catch((info) => {
                            console.log("Validate Failed", info);
                        });
                }}
                onCancel={handleCancel}
                okButtonProps={{ htmlType: "submit" }}
                maskClosable={false}
                centered
            >
                <Form
                    form={form}
                    name="Activity"
                    layout="vertical"
                    autoComplete="off"
                    requiredMark={"required"}
                >
                    <Form.Item
                        label="New Activity Name"
                        name="title"
                        rules={[
                            { required: true, message: "Please input Activity Name!" },
                        ]}
                    >
                        <Input placeholder="Activity Name" maxLength={50} />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            { required: true, message: "Please input Description!" },
                        ]}
                    >
                        <TextArea placeholder="Description" autoSize={{ minRows: 3, maxRows: 3 }} showCount maxLength={400} />
                    </Form.Item>
                    <Form.Item
                        label="Group Type"
                        name="group"
                        extra="Once an activity has been created, Group type cannot be changed."

                        rules={[
                            { required: true, message: "Please Select Group Type" },
                        ]}
                    >
                        <Select defaultValue="None">
                            <Option value="Individual">Individual</Option>
                            <Option value="Group">Group</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="category"
                        name="category_id"
                        rules={[
                            { required: true, message: "Please Select category" },
                        ]}
                    >
                        <Select defaultValue="None">
                            {category.map((cat) =>
                                <Option value={cat.category_id || 0}>{cat.title}</Option> //Unassigned Activity => id 0
                            )}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
