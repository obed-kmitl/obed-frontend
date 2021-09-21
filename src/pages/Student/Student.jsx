/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./Student.module.scss";
import { Helmet } from "react-helmet";
import { Header, Button, Input } from "../../components";
import {
  Divider,
  Table,
  Modal,
  Form,
  Tooltip,
  Popconfirm,
  notification,
  Space,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";

export const Student = () => {
  const { Column } = Table;
  const data = [
    {
      id: 61010001,
      firstname: "สมชาย",
      lastname: "ใจดี",
      email: "61010001@kmitl.ac.th",
    },
    {
      id: 61010002,
      firstname: "สมหญิง",
      lastname: "จริงใจ",
      email: "61010002@kmitl.ac.th",
    },
    {
      id: 61010003,
      firstname: "สมปอง",
      lastname: "สุขสบาย",
      email: "61010003@kmitl.ac.th",
    },
    {
      id: 61010004,
      firstname: "สมปราชญ์",
      lastname: "สดใส",
      email: "61010004@kmitl.ac.th",
    },
    {
      id: 61010005,
      firstname: "สมหมาย",
      lastname: "สายไทย",
      email: "61010005@kmitl.ac.th",
    },
    {
      id: 61010006,
      firstname: "สมหมาย",
      lastname: "รักไทย",
      email: "61010006@kmitl.ac.th",
    },
    {
      id: 61010007,
      firstname: "สมศักดิ์",
      lastname: "ใฝ่รู้",
      email: "61010007@kmitl.ac.th",
    },
    {
      id: 61010008,
      firstname: "กมลชนก",
      lastname: "ศรีไทย",
      email: "61010008@kmitl.ac.th",
    },
    {
      id: 61010009,
      firstname: "สมพงศ์",
      lastname: "ชัยชนะ",
      email: "61010009@kmitl.ac.th",
    },
    {
      id: 61010010,
      firstname: "สมสง่า",
      lastname: "ราศี",
      email: "61010010@kmitl.ac.th",
    },
    {
      id: 61010011,
      firstname: "ธนวัฒน์",
      lastname: "สมมุติ",
      email: "61010011@kmitl.ac.th",
    },
  ];
  const [retrived, setRetrived] = useState(data);
  const [filterList, setFilterList] = useState(retrived);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedData, setSelectedData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [searching, setSearching] = useState(false);

  function showModal(record = {}) {
    setSelectedData(record);
    setVisible(true);
  }

  function search(keyword) {
    if (keyword !== "") {
      const results = retrived.filter((student) => {
        return (
          student.firstname.toLowerCase().includes(keyword.toLowerCase()) ||
          student.lastname.toLowerCase().includes(keyword.toLowerCase()) ||
          student.id.toLowerCase().includes(keyword.toLowerCase()) ||
          student.email.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setFilterList(results);
      setSearching(true);
    } else {
      setFilterList(retrived);
      setSearching(false);
    }
  }

  function handleSubmit(values) {
    console.log("Recieved values of form: ", values);
    setConfirmLoading(true);
    openNotificationWithIcon("success", "Student added");
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      setRetrived([...retrived, values]);
    }, 2000);
  }

  function handleCancel() {
    setVisible(false);
    form.resetFields();
    setSelectedData(null);
    setEdit(false);
  }

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  function openNotificationWithIcon(type, message, desc) {
    notification[type]({
      message: message,
      description: desc,
      duration: 5,
    });
  }

  function deleteStudent(record) {
    let temp = filterList.filter((e) => e.id !== record.id);
    setFilterList(temp);
    console.log(temp);
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Student - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Student</Header>
        <div>
          <Input search placeholder="Search" onSearch={search} allowClear />
          <Button onClick={showModal}>Import</Button>
          <Button onClick={showModal}>Add</Button>
        </div>
      </div>
      <Divider />
      <Table
        dataSource={searching ? filterList : retrived}
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
          title="ID"
          dataIndex="id"
          key="id"
          sorter={(a, b) => a.id - b.id}
          defaultSortOrder="ascend"
          sortDirections={["ascend", "descend", "ascend"]}
        />
        <Column
          title="Name"
          dataIndex="firstname"
          key="firstname"
          sorter={(a, b) => a.firstname.localeCompare(b.firstname)}
          render={(text, record) => text + " " + record.lastname}
        />
        <Column title="Email" dataIndex="email" key="email" />
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
                    setEdit(true);
                    form.setFieldsValue(record);
                    showModal();
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
                  title="Sure to delete this student?"
                  onConfirm={() => deleteStudent(record)}
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
        title={edit ? "Edit Student" : "Add Student"}
        visible={visible}
        okText={edit ? "Save" : "Add"}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
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
      >
        <Form
          form={form}
          name="teacher"
          layout="vertical"
          initialValues={selectedData}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={"required"}
        >
          <Form.Item
            label="Firstname"
            name="firstname"
            rules={[{ required: true, message: "Please input firstname!" }]}
          >
            <Input placeholder="Firstname" />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[{ required: true, message: "Please input lastname!" }]}
          >
            <Input placeholder="Lastname" />
          </Form.Item>
          <Form.Item
            label="Google Account Email"
            name="email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Form>
      </Modal>
      
    </div>
  );
};
