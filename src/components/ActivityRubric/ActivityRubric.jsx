import styles from "./ActivityRubric.module.scss";
import { useState, useEffect } from "react";
import { Header, Body, TextArea } from "..";
import { Modal, Form, InputNumber, Popconfirm, Collapse } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

const rubrics = [
  {
    point: 0,
    desc: "ไม่ส่งงานในเวลาที่กำหนด",
  },
  {
    point: 20,
    desc: "ไม่ผ่านตามมาตรฐาน",
  },
  {
    point: 50,
    desc: "ผ่านตามมาตรฐานที่กำหนด",
  },
  {
    point: 80,
    desc: "ผ่านตามมาตรฐานที่กำหนดและถูกต้องสมบูรณ์",
  },
];

const activityRubric = [
  {
    id: 1,
    title: "ข้อ 1",
    desc: "จงแปลงเลขฐาน 2 จาก 1010 1111 0010 เป็นเลขฐาน 10 และเลขฐาน 16",
    rubrics: [
      {
        point: 0,
        desc: "ไม่ส่งงานในเวลาที่กำหนด",
      },
      {
        point: 1,
        desc: "ผ่านตามมาตรฐานที่กำหนด",
      },
    ],
  },
  {
    id: 2,
    title: "ข้อ 2",
    desc: "จงแปลงเลขฐาน 2 จาก 1000 1101 0110 เป็นเลขฐาน 10 และเลขฐาน 16",
    rubrics: [
      {
        point: 0,
        desc: "ไม่ส่งงานในเวลาที่กำหนด",
      },
      {
        point: 1,
        desc: "ผ่านตามมาตรฐานที่กำหนด",
      },
      {
        point: 2,
        desc: "ผ่านตามมาตรฐานที่กำหนดและถูกต้องสมบูรณ์",
      },
    ],
  },
  {
    id: 3,
    title: "ข้อ 3",
    desc: "จงแปลงเลขฐาน 10 จาก 178 เป็นเลขฐาน 2 และเลขฐาน 16",
    rubrics: [
      {
        point: 0,
        desc: "ไม่ส่งงานในเวลาที่กำหนด",
      },
      {
        point: 1.5,
        desc: "ผ่านตามมาตรฐานที่กำหนด",
      },
      {
        point: 3,
        desc: "ผ่านตามมาตรฐานที่กำหนดและถูกต้องสมบูรณ์",
      },
    ],
  },
  {
    id: 4,
    title: "ข้อ 4",
    desc: "จงแปลงเลขฐาน 16 จาก 57FA เป็นเลขฐาน 10 และเลขฐาน 2",
    rubrics: [
      {
        point: 0,
        desc: "ไม่ส่งงานในเวลาที่กำหนด",
      },
      {
        point: 1,
        desc: "ไม่ผ่านตามมาตรฐาน",
      },
      {
        point: 2,
        desc: "ผ่านตามมาตรฐานที่กำหนด",
      },
      ,
      {
        point: 3,
        desc: "ผ่านตามมาตรฐานที่กำหนดและถูกต้องสมบูรณ์",
      },
      {
        point: 4,
        desc: "ผ่านตามมาตรฐานที่กำหนด,ถูกต้องสมบูรณ์ และสร้างสรรค์",
      },
    ],
  },
];

export const ActivityRubric = ({}) => {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [defRubric, setDefRubric] = useState();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  function handleSubmit(values) {
    // setConfirmLoading(true);
    console.log("Recieved values of form: ", values);
    // addSuggest(values)
    //   .then(() => {
    //     openNotificationWithIcon(
    //       "success",
    //       "Teacher edited",
    //       "User " + values.username + " has been saved."
    //     );
    setAddVisible(false);
    //     setConfirmLoading(false);
    form.resetFields();
    //   })
    //   .catch(() => {
    //     setConfirmLoading(false);
    //     openNotificationWithIcon(
    //       "error",
    //       "Cannot edit user",
    //       "Unexpected error occured, Please try again."
    //     );
    //   });
    setDefRubric([...defRubric, values]);
  }

  function handleEdit(values) {
    console.log("Recieved values of form: ", values);
    setEditVisible(false);
    setSelectedData(null);
    editForm.resetFields();
    // setConfirmLoading(true);
  }

  function handleCancel() {
    form.resetFields();
    editForm.resetFields();
    setSelectedData(null);
    setEditVisible(false);
    setAddVisible(false);
    setSelectedData(null);
  }

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  function popIndex(arr, index) {
    let newArr = [...arr.slice(0, index), ...arr.slice(index + 1)];
    return newArr;
  }

  function onDeleteRubric(id) {
    setDefRubric(popIndex(defRubric, id));
  }

  useEffect(() => {
    let arr = rubrics.sort((a, b) => a.point - b.point);
    setDefRubric(arr);
  }, []);

  return (
    <div className={styles.ActivityRubric}>
      <Header level={2}>
        Default Rubric{" "}
        <small style={{ fontSize: "14px" }}>(Maximum 5 levels)</small>
      </Header>
      <div className={styles.rubricWrap}>
        {defRubric?.map((ele, i) => (
          <div className={styles.rubric} key={"def" + i}>
            <Header level={4} className={styles.level}>
              Level {i + 1}
            </Header>
            <Body level={3} className={styles.desc}>
              {ele.desc}
            </Body>
            <div className={styles.btn}>
              <EditOutlined
                style={{ marginRight: "0.5rem", color: "#009FC7" }}
                onClick={() => {
                  editForm.setFieldsValue(ele);
                  setSelectedData(ele);
                  setEditVisible(true);
                }}
              />
              <Popconfirm
                title="Are you sure to delete this?"
                onConfirm={() => onDeleteRubric(i)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined style={{ color: "#C73535" }} />
              </Popconfirm>
            </div>
            <strong className={styles.point}>{ele.point} Points</strong>
          </div>
        ))}
        {defRubric?.length <= 4 && (
          <div className={styles.addRubric} onClick={() => setAddVisible(true)}>
            <PlusCircleOutlined
              style={{ fontSize: "48px", color: "#009FC7" }}
            />
            <br />
            <Header level={4}>Add Rubric</Header>
          </div>
        )}
      </div>
      <Header level={2} style={{ marginTop: "1rem" }}>
        Custom Rubric{" "}
        <small style={{ fontSize: "14px" }}>
          (Will use default if not created)
        </small>
      </Header>
      <Collapse defaultActiveKey={["1"]} expandIconPosition="right" accordion>
        {activityRubric?.map((ele, i) => (
          <Panel header={ele.title + " " + ele.desc} key={i}>
            <div
              className={styles.rubricWrap}
              style={{ border: "none", padding: "0.5rem" }}
            >
              {ele.rubrics?.map((ele, i) => (
                <CustomRubric
                  data={ele}
                  i={i}
                  editForm={editForm}
                  onDeleteRubric={onDeleteRubric}
                  setEditVisible={setEditVisible}
                  setSelectedData={setSelectedData}
                />
              ))}
              {ele.rubrics?.length <= 4 && (
                <div
                  className={styles.addRubric}
                  onClick={() => setAddVisible(true)}
                >
                  <PlusCircleOutlined
                    style={{ fontSize: "48px", color: "#009FC7" }}
                  />
                  <br />
                  <Header level={4}>Add Rubric</Header>
                </div>
              )}
            </div>
          </Panel>
        ))}
      </Collapse>
      <Modal
        title="Add Rubric"
        visible={addVisible}
        okText="Add"
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
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ htmlType: "submit" }}
        maskClosable={false}
        centered
      >
        <Form
          form={form}
          name="add-rubric"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={"required"}
        >
          <Form.Item
            label="Point"
            name="point"
            rules={[{ required: true, message: "Please input point!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="desc"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Rubric"
        visible={editVisible}
        okText="Save"
        onOk={() => {
          editForm
            .validateFields()
            .then((values) => {
              handleEdit(values);
            })
            .catch((info) => {
              console.log("Validate Failed", info);
            });
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ htmlType: "submit" }}
        maskClosable={false}
        centered
      >
        <Form
          form={editForm}
          name="edit-rubric"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={"required"}
          initialValues={selectedData}
        >
          <Form.Item
            label="Point"
            name="point"
            rules={[{ required: true, message: "Please input point!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="desc"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const CustomRubric = ({
  data,
  i,
  editForm,
  setSelectedData,
  setEditVisible,
  onDeleteRubric,
}) => {
  return (
    <div className={styles.rubric} key={"custom" + i}>
      <Header level={4} className={styles.level}>
        Level {i + 1}
      </Header>
      <Body level={3} className={styles.desc}>
        {data.desc}
      </Body>
      <div className={styles.btn}>
        <EditOutlined
          style={{ marginRight: "0.5rem", color: "#009FC7" }}
          onClick={() => {
            editForm.setFieldsValue(data);
            setSelectedData(data);
            setEditVisible(true);
          }}
        />
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={() => onDeleteRubric(i)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: "#C73535" }} />
        </Popconfirm>
      </div>
      <strong className={styles.point}>{data.point} Points</strong>
    </div>
  );
};
