/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./Teacher.module.scss";
import { Helmet } from "react-helmet";
import { Header, Button, Input, Option } from "../../components";
import {
  Divider,
  Table,
  Modal,
  Form,
  Select,
  Tooltip,
  Popconfirm,
  notification,
  Space,
} from "antd";
import { DeleteOutlined, MailOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";

export const Teacher = () => {
  const { Column } = Table;
  const data = [
    {
      id: 1,
      prefix: "ผศ.ดร.",
      firstname: "สมชาย",
      lastname: "ใจดี",
      username: "somchai1234",
      email: "somchai.ja@kmitl.ac.th",
      status: 1,
    },
    {
      id: 2,
      prefix: "รศ.ดร.",
      firstname: "สมหญิง",
      lastname: "จริงใจ",
      username: "somying1",
      email: "somying.ji@kmitl.ac.th",
      status: 1,
    },
    {
      id: 3,
      prefix: "อ.",
      firstname: "สมปอง",
      lastname: "สุขสบาย",
      username: "sompong1988",
      email: "sompong.su@kmitl.ac.th",
      status: 0,
    },
    {
      id: 4,
      prefix: "ดร.",
      firstname: "สมปราชญ์",
      lastname: "สดใส",
      username: "somprach38",
      email: "somprach.so@kmitl.ac.th",
      status: 1,
    },
    {
      id: 5,
      prefix: "ผศ.",
      firstname: "สมหมาย",
      lastname: "สายไทย",
      username: "sommai55",
      email: "sommai.sa@kmitl.ac.th",
      status: 0,
    },
    {
      id: 6,
      prefix: "ผศ.ดร.",
      firstname: "สมหมาย",
      lastname: "รักไทย",
      username: "sommai1999",
      email: "sommai.ra@kmitl.ac.th",
      status: 1,
    },
    {
      id: 7,
      prefix: "รศ.",
      firstname: "สมศักดิ์",
      lastname: "ใฝ่รู้",
      username: "somsak74",
      email: "somsak.fh@kmitl.ac.th",
      status: 1,
    },
    {
      id: 8,
      prefix: "อ.",
      firstname: "กมลชนก",
      lastname: "ศรีไทย",
      username: "kamol123",
      email: "kamolchanok.sr@kmitl.ac.th",
      status: 1,
    },
    {
      id: 9,
      prefix: "ดร.",
      firstname: "สมพงศ์",
      lastname: "ชัยชนะ",
      username: "somphong",
      email: "somphong.ch@kmitl.ac.th",
      status: 1,
    },
    {
      id: 10,
      prefix: "รศ.",
      firstname: "สมสง่า",
      lastname: "ราศี",
      username: "somsanga34",
      email: "somsanga.ra@kmitl.ac.th",
      status: 0,
    },
    {
      id: 11,
      prefix: "อ.",
      firstname: "ธนวัฒน์",
      lastname: "สมมุติ",
      username: "thanawat88",
      email: "thanawat.so@kmitl.ac.th",
      status: 1,
    },
  ];
  const [filterList, setFilterList] = useState(data);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedData, setSelectedData] = useState(null);
  const [edit, setEdit] = useState(false);
  const selectBefore = (
    <Form.Item name="prefix" noStyle>
      <Select
        className="select-before"
        style={{ width: "85px" }}
        placeholder="Prefix"
      >
        <Option value="ศ.ดร.">ศ.ดร.</Option>
        <Option value="ศ.">ศ.</Option>
        <Option value="รศ.ดร.">รศ.ดร.</Option>
        <Option value="รศ.">รศ.</Option>
        <Option value="ผศ.ดร.">ผศ.ดร.</Option>
        <Option value="ผศ.">ผศ.</Option>
        <Option value="ดร.">ดร.</Option>
        <Option value="อ.">อ.</Option>
      </Select>
    </Form.Item>
  );

  const showModal = (record = {}) => {
    setSelectedData(record);
    setVisible(true);
  };

  function search(keyword) {
    if (keyword !== "") {
      const results = data.filter((teacher) => {
        return (
          teacher.firstname.toLowerCase().includes(keyword.toLowerCase()) ||
          teacher.lastname.toLowerCase().includes(keyword.toLowerCase()) ||
          teacher.username.toLowerCase().includes(keyword.toLowerCase()) ||
          teacher.email.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setFilterList(results);
    } else {
      setFilterList(data);
    }
  }

  function handleSubmit(values) {
    console.log("Recieved values of form: ", values);
    setConfirmLoading(true);
    openNotificationWithIcon(
      "success",
      "Teacher added",
      "Please check user " + values.email + " inbox to change password."
    );
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      setFilterList([...data, values]);
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

  function resendPassword(record) {
    let success = true;
    if (success)
      openNotificationWithIcon(
        "success",
        "Request sent to " + record.email,
        "Please check user email inbox to change password."
      );
    else
      openNotificationWithIcon(
        "error",
        "Request Error",
        "There's error sending request, Please try again."
      );
  }

  function deleteAccount(record) {
    let temp = filterList.filter((e) => e.id !== record.id);
    setFilterList(temp);
    console.log(temp);
  }

  // const menu = (record) => (
  //   <Menu>
  //     <Menu.Item icon={<MailOutlined />} key="2">
  //       <a href="#" onClick={() => resendPassword()}>
  //         Change Password
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item danger icon={<DeleteOutlined />} key="3">
  //       <Popconfirm
  //         title="Sure to delete this account?"
  //         onConfirm={() => deleteAccount(record)}
  //       >
  //         <a href="#">Delete Account</a>
  //       </Popconfirm>
  //     </Menu.Item>
  //   </Menu>
  // );
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Teacher - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Teacher</Header>
        <div>
          <Input search placeholder="Search" onSearch={search} allowClear />
          <Button onClick={showModal}>Add</Button>
        </div>
      </div>
      <Divider />
      <Table
        dataSource={filterList}
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
          title="Prefix"
          dataIndex="prefix"
          key="prefix"
          width="100px"
          filters={[
            {
              text: "อ.",
              value: "อ.",
            },
            {
              text: "ศ.ดร.",
              value: "ศ.ดร.",
            },
            {
              text: "ศ.",
              value: "ศ.",
            },
            {
              text: "รศ.ดร.",
              value: "รศ.ดร.",
            },
            {
              text: "รศ.",
              value: "รศ.",
            },
            {
              text: "ผศ.ดร.",
              value: "ผศ.ดร.",
            },
            {
              text: "ผศ.",
              value: "ผศ.",
            },
            {
              text: "ดร.",
              value: "ดร.",
            },
          ]}
          onFilter={(value, record) => record.prefix.indexOf(value) === 0}
        />
        <Column
          title="Name"
          dataIndex="firstname"
          key="firstname"
          sorter={(a, b) => a.firstname.localeCompare(b.firstname)}
          render={(text, record) => text + " " + record.lastname}
          defaultSortOrder="ascend"
          sortDirections={["ascend", "descend", "ascend"]}
        />
        <Column title="Username" dataIndex="username" key="username" />
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
              <Tooltip title="Change Password">
                <a
                  href="#"
                  style={{
                    fontSize: "20px",
                    color: "#009FC7",
                  }}
                  onClick={() => resendPassword(record)}
                >
                  <MailOutlined />
                </a>
              </Tooltip>
              <Tooltip title="Delete">
                <Popconfirm
                  title="Sure to delete this account?"
                  onConfirm={() => deleteAccount(record)}
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
        {/* <Column
          key="action"
          width="30px"
          render={(ele, record) => (
            <Dropdown overlay={() => menu(record)}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ fontSize: "20px", color: "#009FC7" }}
              >
                <MoreOutlined />
              </a>
            </Dropdown>
          )}
        /> */}
      </Table>
      <Modal
        title={edit ? "Edit Teacher" : "Add Teacher"}
        visible={visible}
        okText="Add"
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
        width="700px"
        // footer={
        //   [
        //     <Body level={3} style={{ color: "#8B8B8B", width: "fit-content" }}>
        //       Teacher can change password by link in email
        //     </Body>,
        //     <Button type="secondary" onClick={handleCancel}>
        //       Cancel
        //     </Button>,
        //     <Button
        //       htmlType="submit"
        //       type="primary"
        //       loading={confirmLoading}
        //       onClick={handleSubmit}
        //     >
        //       Add
        //     </Button>,
        //   ]
        // }
      >
        <Form
          form={form}
          name="teacher"
          layout="vertical"
          initialValues={selectedData}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark="optional"
        >
          <Form.Item
            label="Firstname"
            name="firstname"
            rules={[{ required: true, message: "Please input firstname!" }]}
          >
            <Input placeholder="Firstname" addonBefore={selectBefore} />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[{ required: true, message: "Please input lastname!" }]}
          >
            <Input placeholder="Lastname" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Email"
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
