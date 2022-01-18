
import styles from "../Planning/Planning.module.scss"
import { Helmet } from "react-helmet";
import { Header, Button, Body, Input } from "../../components";
import { Divider, Empty, InputNumber, Form, Popconfirm, Typography, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import { useWeighting } from "./hooks/useWeighting";
import {
    DeleteOutlined,
    InfoCircleOutlined
} from "@ant-design/icons";

const WeightingCard = ({ data }) => {
    return (
        <div className={styles.card}>
            <>
                <Body level={1}>{data.catagory}</Body>
                <Body level={1}>{data.weight} %</Body>
            </>
        </div>
    )
}


export const Planning = () => {
    let { sectionId } = useParams();
    const [form, weightingList, isEditing, editingList, handleEditBtn, handleAddWeighting, removeWeighting, save ,cancel] = useWeighting()
    return (
        <div className={styles.planning}>
            <Helmet>
                <title>{sectionId} Planning - OBED</title>
            </Helmet>
            <div className={styles.head}>
                <Header level={1}>Planning</Header>
            </div>
            <Divider />
            <div className={styles.details}>
                <div className={styles.flexrowSpace}>
                    <div className={styles.flexrow}>
                    <Header level={2}>Score Weighting&nbsp;</Header>
                    <Tooltip title =" Total score must be 100%"> <InfoCircleOutlined/></Tooltip>
                    </div>
                    {isEditing ?
                        <Button onClick={() => handleAddWeighting()}>Add</Button>
                        :
                        <Button onClick={() => handleEditBtn()}>Edit</Button>
                    }
                </div>
                {weightingList.length === 0 && editingList === undefined ?
                    <div>
                        <Empty
                            style={{ margin: "100px", color: "#c3c3c4", fontSize: "20px", fontWeight: "500" }}
                            imageStyle={{ height: 100 }}
                            description="No Score Weighting data, Please click Edit button!"
                        />
                    </div>
                    :
                    <div className={styles.cardList}>
                        {isEditing ?
                            <Form
                                form={form}
                                name="score weighting"
                                layout="horizontal"
                                onFinish={save}
                                autoComplete="off"
                                requiredMark={false}
                                initialValue={[]}
                            >
                                {editingList.map((item, index) =>
                                    <div className={styles.card}>
                                        <Form.Item
                                            hidden={true}
                                            initialValue={item.id}
                                            name={[item.id, "id"]}
                                        >
                                        </Form.Item>
                                        <Form.Item
                                            style={{ marginBottom: "0", width: "100%" }}
                                            initialValue={item.catagory}
                                            name={[item.id, "catagory"]}
                                            rules={[{ required: true, message: "" }]}
                                        >
                                            <Input placeholder="Catagory Name" />
                                        </Form.Item>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                            <Form.Item
                                                style={{ marginBottom: "0" }}
                                                initialValue={item.weight}
                                                name={[item.id, "weight"]}
                                                rules={[{ required: true, message: "" }]}
                                            >
                                                <InputNumber style={{ width: "60px", height: "35px" }} placeholder="" />
                                            </Form.Item>
                                            %
                                            <Popconfirm
                                                title="Sure to delete?"
                                                onConfirm={
                                                    () => removeWeighting(item.id)
                                                }
                                            >
                                                <Typography.Link
                                                    style={{ color: "#C73535", fontSize: "18px" }}
                                                >
                                                    <DeleteOutlined />
                                                </Typography.Link>
                                            </Popconfirm>
                                        </div>

                                    </div>
                                )}
                                <Form.Item>
                                    <div className={styles.btnGroup}>
                                        <Button onClick={()=>cancel()}>Cancel</Button>
                                        <Button type="primary" htmlType="submit">Save</Button>
                                    </div>
                                </Form.Item>
                            </Form>
                            :
                            weightingList?.map((item) =>
                                <WeightingCard data={item} key={item.id} />
                            )
                        }
                    </div>
                }


            </div>
        </div>
    );
};
