import styles from "./Teacher.module.scss";
import { Helmet } from "react-helmet";
import { Header, Button, Input, Body } from "../../components";
import { Divider, Table, Tag, Menu, Dropdown, Modal, Form, Space } from "antd";
import {
  MoreOutlined,
  DeleteOutlined,
  MailOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useState } from "react";

export const Teacher = () => {
  const { Column } = Table;
  const data = [
    {
      id: 1,
      firstname: "สมชาย",
      lastname: "ใจดี",
      username: "somchai1234",
      email: "somchai.ja@kmitl.ac.th",
      status: 1,
    },
    {
      id: 2,
      firstname: "สมหญิง",
      lastname: "จริงใจ",
      username: "somying1",
      email: "somying.ji@kmitl.ac.th",
      status: 1,
    },
    {
      id: 3,
      firstname: "สมปอง",
      lastname: "สุขสบาย",
      username: "sompong1988",
      email: "sompong.su@kmitl.ac.th",
      status: 0,
    },
    {
      id: 4,
      firstname: "สมปราชญ์",
      lastname: "สดใส",
      username: "somprach38",
      email: "somprach.so@kmitl.ac.th",
      status: 1,
    },
    {
      id: 5,
      firstname: "สมหมาย",
      lastname: "สายไทย",
      username: "sommai55",
      email: "sommai.sa@kmitl.ac.th",
      status: 0,
    },
    {
      id: 6,
      firstname: "สมหมาย",
      lastname: "รักไทย",
      username: "sommai1999",
      email: "sommai.ra@kmitl.ac.th",
      status: 1,
    },
    {
      id: 7,
      firstname: "สมศักดิ์",
      lastname: "ใฝ่รู้",
      username: "somsak74",
      email: "somsak.fh@kmitl.ac.th",
      status: 1,
    },
    {
      id: 8,
      firstname: "สมศรี",
      lastname: "ศรีไทย",
      username: "somsri6854",
      email: "somsri.sr@kmitl.ac.th",
      status: 1,
    },
    {
      id: 9,
      firstname: "สมพงศ์",
      lastname: "ชัยชนะ",
      username: "somphong",
      email: "somphong.ch@kmitl.ac.th",
      status: 1,
    },
    {
      id: 10,
      firstname: "สมสง่า",
      lastname: "ราศี",
      username: "somsanga34",
      email: "somsanga.ra@kmitl.ac.th",
      status: 0,
    },
    {
      id: 11,
      firstname: "สมเกิน",
      lastname: "อีกหน้า",
      username: "somkoen96",
      email: "somkoen.ei@kmitl.ac.th",
      status: 1,
    },
  ];
  const [filterList, setFilterList] = useState(data);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const titleSelector = [
    "ศ.ดร.",
    "ศ.",
    "รศ.ดร.",
    "รศ.",
    "ผศ.ดร.",
    "ผศ.",
    "ดร.",
  ];

  const showModal = () => {
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
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  }

  function handleCancel() {
    setVisible(false);
    form.resetFields();
  }

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  const menu = (
    <Menu>
      <Menu.Item icon={<EditOutlined />} key="1">
        <a href="#">Edit</a>
      </Menu.Item>
      <Menu.Item icon={<MailOutlined />} key="2">
        <a href="#">Resend Password</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item danger icon={<DeleteOutlined />} key="3">
        Disable Account
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Teacher - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Teacher</Header>
        <div>
          <Input search placeholder="Search" onSearch={search} />
          <Button onClick={showModal}>Add</Button>
        </div>
      </div>
      <Divider />
      <Table dataSource={filterList} rowKey="id">
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="First Name" dataIndex="firstname" key="firstname" />
        <Column title="Last Name" dataIndex="lastname" key="lastname" />
        <Column title="Username" dataIndex="username" key="username" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(tag) => (
            <>
              <Tag
                color={tag === 1 ? "green" : tag === 0 ? "gold" : "red"}
                key={tag}
              >
                {tag === 1
                  ? "Verified"
                  : tag === 0
                  ? "Not Verified"
                  : "Disabled"}
              </Tag>
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          width="15px"
          render={(ele) => (
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ fontSize: "20px", color: "#009FC7" }}
              >
                <MoreOutlined />
              </a>
            </Dropdown>
          )}
        />
      </Table>
      <Modal
        title="Add Teacher"
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
        // okButtonProps={{ htmlType: "submit" }}
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
          initialValues={{ remember: false }}
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
            <Input placeholder="Firstname" addonBefore={titleSelector} />
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
