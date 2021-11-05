import styles from "./LearningOutcome.module.scss";
import { Helmet } from "react-helmet";
import { Header, Button, Input, TextArea } from "../../components";
import {
  Divider,
  Table,
  Modal,
  Form,
  Select,
  Tooltip,
  Popconfirm,
  notification,
  Tag,
  Space,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const mock = [
  {
    id: 1,
    title: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 10 ทั้งคิดและไม่คิดเครื่องหมาย",
    activity: ["Homework 1 ข้อ 1", "Homework 1 ข้อ 2"],
    plo: [1.1, 1.2],
    tqf: [1.1, 1.2, 1.3, 2.1, 6.1],
  },
  {
    id: 2,
    title: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 16 ทั้งคิดและไม่คิดเครื่องหมาย",
    activity: ["Homework 1 ข้อ 3", "Homework 1 ข้อ 4"],
    plo: [1.1, 1.2, 1.5],
    tqf: [1.1, 1.2, 1.3, 2.1, 6.1],
  },
];

const mockPLO = [
  {
    id: 1.1,
    desc: "1.1",
  },
  {
    id: 1.2,
    desc: "1.2",
  },
  {
    id: 1.3,
    desc: "1.3",
  },
  {
    id: 1.4,
    desc: "2.1",
  },
  {
    id: 1.5,
    desc: "2.2",
  },
  {
    id: 1.6,
    desc: "2.3",
  },
  {
    id: 1.7,
    desc: "2.4",
  },
];

export const LearningOutcome = () => {
  const { Option } = Select;
  const { Column } = Table;
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editVisible, setEditVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  function openNotificationWithIcon(type, message, desc) {
    notification[type]({
      message: message,
      description: desc,
      duration: type === "error" ? 15 : 5,
    });
  }

  function handleEdit(values) {
    console.log("Recieved values of form: ", values);
    setConfirmLoading(true);
    // editTeacher(values)
    //   .then(() => {
    //     openNotificationWithIcon(
    //       "success",
    //       "Teacher edited",
    //       "User " + values.username + " has been saved."
    //     );
    //     setVisible(false);
    //     setConfirmLoading(false);
    //     form.resetFields();
    //   })
    //   .catch(() => {
    //     setConfirmLoading(false);
    //     openNotificationWithIcon(
    //       "error",
    //       "Cannot edit user",
    //       "Unexpected error occured, Please try again."
    //     );
    //   });
  }

  function handleCancel() {
    editForm.resetFields();
    setSelectedData(null);
    setEditVisible(false);
    // setMessage("");
  }

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  function deleteLO(values) {
    alert(JSON.stringify(values));
  }

  return (
    <div>
      <Helmet>
        <title>Learning Outcome - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Course Learning Outcome</Header>
        <div>
          <Button>Add</Button>
        </div>
      </div>
      <Divider />
      <Table
        dataSource={mock}
        rowKey="id"
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
        bordered
      >
        <Column
          title="No."
          dataIndex="index"
          key="index"
          width="60px"
          render={(value, item, index) => (page - 1) * 10 + index + 1}
        />
        <Column
          title="Learning Outcomes"
          dataIndex="title"
          key="lo"
          width="400px"
        />
        <Column
          title="Activity"
          dataIndex="activity"
          key="activity"
          width="300px"
          render={(activity) =>
            activity.map((ele) => (
              <Tooltip title={ele} placement="topLeft">
                <p>{ele}</p>
              </Tooltip>
            ))
          }
        />
        <Column
          title="PLO"
          dataIndex="plo"
          key="plo"
          width="100px"
          render={(plo) => {
            const moreList = plo.map((ele, i) => {
              if (i >= 3) return <Tag>{ele}</Tag>;
            });
            return (
              <>
                {plo.map((ele, i) => {
                  if (i < 3) return <Tag key={ele}>{ele}</Tag>;
                  return null;
                })}
                {plo.length > 3 && (
                  <Tooltip title={moreList} placement="right">
                    <Tag>+{plo.length - 3} more</Tag>
                  </Tooltip>
                )}
              </>
            );
          }}
        />
        <Column
          title="มคอ.2"
          dataIndex="tqf"
          key="tqf"
          width="100px"
          render={(tqf) => {
            const moreList = tqf.map((ele, i) => {
              if (i >= 3) return <Tag>{ele}</Tag>;
            });
            return (
              <>
                {tqf.map((ele, i) => {
                  if (i < 3) return <Tag key={ele}>{ele}</Tag>;
                  return null;
                })}
                {tqf.length > 3 && (
                  <Tooltip title={moreList} placement="right">
                    <Tag>+{tqf.length - 3} more</Tag>
                  </Tooltip>
                )}
              </>
            );
          }}
        />
        <Column
          title="Action"
          key="action"
          width="30px"
          render={(ele, record) => (
            <Space size="large">
              <Tooltip title="Edit">
                <a
                  href="#"
                  onClick={() => {
                    editForm.setFieldsValue(record);
                    setSelectedData(record);
                    setEditVisible(true);
                  }}
                  style={{
                    fontSize: "20px",
                    color: "#009FC7",
                  }}
                >
                  <EditOutlined />
                </a>
              </Tooltip>
              <Tooltip title="Delete">
                <Popconfirm
                  title="Sure to delete this learning outcome?"
                  onConfirm={() => deleteLO(record)}
                >
                  <a
                    href="#"
                    style={{
                      fontSize: "20px",
                      color: "#C73535",
                    }}
                  >
                    <DeleteOutlined />
                  </a>
                </Popconfirm>
              </Tooltip>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Edit Learning Outcome"
        visible={editVisible}
        okText="Save"
        onOk={() => {
          form
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
        {/* {message !== "" && (
          <Alert
            style={{ marginBottom: "1rem" }}
            message={message}
            type="error"
            showIcon
          />
        )} */}
        <Form
          form={editForm}
          name="lo"
          layout="vertical"
          initialValues={selectedData}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={"required"}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Learning Outcome"
            name="title"
            rules={[
              { required: true, message: "Please input learning outcome!" },
            ]}
          >
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>
          {/* #TODO : Add required to Select PLOs */}
          <Form.Item label="PLOs" name="plo">
            <Select mode="multiple" placeholder="PLO">
              {mockPLO.map((e) => (
                <Option value={e.desc} key={e.id}>
                  {e.desc}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
