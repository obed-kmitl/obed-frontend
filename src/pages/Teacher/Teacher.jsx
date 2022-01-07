/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./Teacher.module.scss";
import { Helmet } from "react-helmet";
import { Header, Button, Input, Option } from "../../components";
import {
  Alert,
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
import { useState, useEffect } from "react";
import { useTeacher } from "./hooks/useTeacher";

export const Teacher = () => {
  const { Column } = Table;
  const [form] = Form.useForm();
  const [
    teachers,
    fetchAllUsers,
    setTeachers,
    register,
    editTeacher,
    deleteTeacher,
    message,
    setMessage,
  ] = useTeacher();
  const [filterList, setFilterList] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [searching, setSearching] = useState(false);
  const [editingData, setEditingData] = useState();
  const [lastKeyword, setLastKeyword] = useState("");

  const getThPrefix = {
    PROF_DR: "ศ.ดร.",
    PROF: "ศ.",
    ASSOC_PROF_DR: "รศ.ดร.",
    ASSOC_PROF: "รศ.",
    ASST_PROF_DR: "ผศ.ดร.",
    ASST_PROF: "ผศ.",
    DR: "ดร.",
    INSTRUCTOR: "อ.",
  };

  const selectBefore = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[{ required: true, message: "Please input prefix!" }]}
    >
      <Select
        className="select-before"
        style={{ width: "100px" }}
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

  function showModal(record = {}) {
    setSelectedData(record);
    setVisible(true);
  }

  function search(keyword) {
    setLastKeyword(keyword);
    if (keyword !== "") {
      const results = teachers.filter((teacher) => {
        return (
          teacher.firstname.toLowerCase().includes(keyword.toLowerCase()) ||
          teacher.lastname.toLowerCase().includes(keyword.toLowerCase()) ||
          teacher.username.toLowerCase().includes(keyword.toLowerCase()) ||
          teacher.email.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setFilterList(results);
      setSearching(true);
    } else {
      setFilterList(teachers);
      setSearching(false);
    }
  }

  function handleSubmit(values) {
    console.log("Recieved values of form: ", values);
    register(values)
      .then((data) => {
        let newTeacher = {
          id: data.user_id,
          email: data.email,
          username: data.username,
          prefix: getThPrefix[data.prefix],
          firstname: data.firstname,
          lastname: data.lastname,
        };
        openNotificationWithIcon(
          "success",
          "Teacher added",
          "Please check user " + values.email + " inbox to change password."
        );
        setVisible(false);
        setTeachers([...teachers, newTeacher]);
        form.resetFields();
      })
      .catch(() => {
        setConfirmLoading(false);
        openNotificationWithIcon(
          "error",
          "Cannot register user",
          "Unexpected error occured, Please try again."
        );
      });
  }

  function handleEdit(values) {
    console.log("Recieved values of form: ", values);
    setConfirmLoading(true);
    editTeacher(values)
      .then(() => {
        openNotificationWithIcon(
          "success",
          "Teacher edited",
          "User " + values.username + " has been saved."
        );
        setVisible(false);
        setConfirmLoading(false);
        form.resetFields();
      })
      .catch(() => {
        setConfirmLoading(false);
        openNotificationWithIcon(
          "error",
          "Cannot edit user",
          "Unexpected error occured, Please try again."
        );
      });
  }

  useEffect(() => {
    search(lastKeyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teachers]);

  function handleCancel() {
    form.resetFields();
    setVisible(false);
    setSelectedData(null);
    setEdit(false);
    setMessage("");
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
      duration: type === "error" ? 15 : 5,
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
    deleteTeacher(record)
      .then(() => {
        let newList = teachers.filter((e) => e.id !== record.id);
        setTeachers(newList);
        openNotificationWithIcon(
          "success",
          "User deleted",
          "User " + record.username + " has been deleted."
        );
      })
      .catch(() => {
        openNotificationWithIcon(
          "error",
          "Cannot delete user",
          "Unexpected error occured, Please try again."
        );
      });
  }

  useEffect(() => {
    fetchAllUsers()
      .then((data) => {
        setFilterList(data);
      })
      .catch((message) => {
        openNotificationWithIcon("error", "Cannot fetch teacher data", message);
      });
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.teacher}>
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
        dataSource={searching ? filterList : teachers}
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
          render={(ele, record, index) => (
            <Space size="large">
              <Tooltip title="Edit">
                <a
                  href="#"
                  onClick={() => {
                    setEdit(true);
                    setEditingData(record);
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
              <Tooltip title="Request Password Change">
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
      </Table>
      <Modal
        title={edit ? "Edit Teacher" : "Add Teacher"}
        visible={visible}
        okText={edit ? "Save" : "Add"}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              edit ? handleEdit(values) : handleSubmit(values);
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
        {message !== "" && (
          <Alert
            style={{ marginBottom: "1rem" }}
            message={message}
            type="error"
            showIcon
          />
        )}
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
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
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
            rules={[
              { required: true, message: "Please input username!" },
              {
                validator: (rule, value, callback) => {
                  if (edit) {
                    const alreadyExistUsername = teachers
                      ?.map((e) => e.username)
                      .filter((e) => e !== editingData.username);
                    if (alreadyExistUsername?.includes(value)) {
                      return Promise.reject("Already exist!");
                    }
                    return Promise.resolve();
                  } else {
                    const alreadyExistUsername = teachers?.map(
                      (e) => e.username
                    );
                    if (alreadyExistUsername?.includes(value)) {
                      return Promise.reject("Already exist!");
                    }
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email" },
              {
                validator: (rule, value, callback) => {
                  if (edit) {
                    const alreadyExistEmail = teachers
                      ?.map((e) => e.email)
                      .filter((e) => e !== editingData.email);
                    if (alreadyExistEmail?.includes(value)) {
                      return Promise.reject("Already exist!");
                    }
                    return Promise.resolve();
                  } else {
                    const alreadyExistEmail = teachers?.map((e) => e.email);
                    if (alreadyExistEmail?.includes(value)) {
                      return Promise.reject("Already exist!");
                    }
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
