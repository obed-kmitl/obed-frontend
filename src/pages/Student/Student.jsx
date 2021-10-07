/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./Student.module.scss";
import { Helmet } from "react-helmet";
import { Header, Button, Input, Option, Body } from "../../components";
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
  Upload,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
  RightOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";

export const Student = () => {
  const { Column } = Table;
  const data = [
    {
      id: 61010001,
      prefix: "นางสาว",
      firstname: "กมลชนก",
      lastname: "ศรีไทย",
      email: "61010001@kmitl.ac.th",
    },
    {
      id: 61010002,
      prefix: "นาย",
      firstname: "ธนวัฒน์",
      lastname: "สมมุติ",
      email: "61010002@kmitl.ac.th",
    },
    {
      id: 61010003,
      prefix: "นาย",
      firstname: "สมปอง",
      lastname: "สุขสบาย",
      email: "61010003@kmitl.ac.th",
    },
    {
      id: 61010004,
      prefix: "นาย",
      firstname: "สมปราชญ์",
      lastname: "สดใส",
      email: "61010004@kmitl.ac.th",
    },
    {
      id: 61010005,
      prefix: "นาย",
      firstname: "สมหมาย",
      lastname: "สายไทย",
      email: "61010005@kmitl.ac.th",
    },
    {
      id: 61010006,
      prefix: "นาย",
      firstname: "สมหมาย",
      lastname: "รักไทย",
      email: "61010006@kmitl.ac.th",
    },
    {
      id: 61010007,
      prefix: "นาย",
      firstname: "สมศักดิ์",
      lastname: "ใฝ่รู้",
      email: "61010007@kmitl.ac.th",
    },
    {
      id: 61010008,
      prefix: "นาย",
      firstname: "สมชาย",
      lastname: "ใจดี",
      email: "61010008@kmitl.ac.th",
    },
    {
      id: 61010009,
      prefix: "นาย",
      firstname: "สมพงศ์",
      lastname: "ชัยชนะ",
      email: "61010009@kmitl.ac.th",
    },
    {
      id: 61010010,
      prefix: "นางสาว",
      firstname: "สมสง่า",
      lastname: "ราศี",
      email: "61010010@kmitl.ac.th",
    },
    {
      id: 61010011,
      prefix: "นางสาว",
      firstname: "สมหญิง",
      lastname: "จริงใจ",
      email: "61010011@kmitl.ac.th",
    },
  ];
  const [retrived] = useState(data);
  const [filterList, setFilterList] = useState(retrived);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [selectedData, setSelectedData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [addList, setAddList] = useState([]);
  const selectBefore = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[{ required: true, message: "Please select prefix!" }]}
    >
      <Select
        className="select-before"
        style={{ width: "90px" }}
        placeholder="Prefix"
      >
        <Option value="นาย">นาย</Option>
        <Option value="นางสาว">นางสาว</Option>
        <Option value="Mr">Mr.</Option>
        <Option value="Ms">Ms.</Option>
      </Select>
    </Form.Item>
  );

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
    console.log("Recieved values of form[ADD]: ", values);
    setConfirmLoading(true);
    openNotificationWithIcon("success", values.length + " Student added");
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      // setRetrived([...retrived, values.map((item) => item)]);
      setAddList([]);
    }, 2000);
  }

  function handleEdit(values) {
    console.log("Recieved values of form[EDIT]: ", values);
    setConfirmLoading(true);
    openNotificationWithIcon("success", "Student " + values.id + " saved");
    setTimeout(() => {
      setEditVisible(false);
      setConfirmLoading(false);
      setAddList([]);
    }, 2000);
  }

  function handleCancel() {
    setVisible(false);
    setEditVisible(false);
    setImportVisible(false);
    form.resetFields();
    editForm.resetFields();
    setSelectedData(null);
    setAddList([]);
  }

  function onFinish(values) {
    setAddList([...addList, values]);
    form.resetFields();
    editForm.resetFields();
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

  function removeFromList(id) {
    let result = addList.filter((item) => item.id !== id);
    setAddList(result);
  }

  function editFromList(id) {
    let edit = addList.find((item) => item.id === id);
    form.setFieldsValue(edit);
    removeFromList(id);
  }

  return (
    <div className={styles.student}>
      <Helmet>
        <title>Student - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Student</Header>
        <div>
          <Input search placeholder="Search" onSearch={search} allowClear />
          <Button onClick={() => setImportVisible(true)}>Import</Button>
          <Button onClick={() => setVisible(true)}>Add</Button>
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
          render={(text, record) =>
            record.prefix + " " + text + " " + record.lastname
          }
        />
        <Column title="Google Classroom Acount" dataIndex="email" key="email" />
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
        title={"Add Student"}
        visible={visible}
        okText={"Add"}
        onOk={() => {
          handleSubmit(addList);
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ disabled: addList.length === 0 }}
        maskClosable={false}
        width={700}
      >
        <div className={styles.modalWrap}>
          <Form
            form={form}
            name="student"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={"required"}
          >
            <Form.Item
              label="Student ID"
              name="id"
              rules={[
                { required: true, message: "Please input student id!" },
                {
                  validator: (rule, value, callback) => {
                    let alreadyExistId = retrived.map((e) => e.id.toString());
                    // console.log(selectedData.id);
                    // console.log(alreadyExistId);
                    if (
                      alreadyExistId.includes(value) ||
                      addList.find((item) => item.id === value)
                    ) {
                      return Promise.reject("Already exist!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Student ID" />
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
              label="Google Account Email"
              name="email"
              rules={[
                { required: true, message: "Please input email!" },
                { type: "email" },
                {
                  validator: (rule, value, callback) => {
                    const alreadyExistEmail = data.find(
                      (e) => e.email === value
                    );
                    if (
                      alreadyExistEmail ||
                      addList.find((item) => item.email === value)
                    ) {
                      return Promise.reject("Already exist!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Button htmlType="submit" style={{ width: "100%" }}>
              Add to List <RightOutlined />
            </Button>
          </Form>
          <div className={styles.divider} />
          <div className={styles.listWrap}>
            <div className={styles.head}>
              <Header level={4}>Added List ({addList.length})</Header>
              <Popconfirm
                title="Sure to clear list?"
                onConfirm={() => setAddList([])}
                disabled={addList.length === 0 ? true : false}
              >
                <a href="#">Clear All</a>
              </Popconfirm>
            </div>
            <div className={styles.addList}>
              <ul>
                {addList.map((ele) => (
                  <li key={ele.id}>
                    {ele.id} - {ele.firstname} {ele.lastname}
                    <Space className={styles.btn}>
                      <Tooltip title="Edit">
                        <EditOutlined
                          style={{ color: "#009FC7" }}
                          onClick={() => editFromList(ele.id)}
                        />
                      </Tooltip>
                      <Tooltip title="Remove">
                        <MinusCircleOutlined
                          style={{ color: "#C73535" }}
                          onClick={() => removeFromList(ele.id)}
                        />
                      </Tooltip>
                    </Space>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title={"Edit Student"}
        visible={editVisible}
        okText={"Save"}
        onOk={() => {
          editForm
            .validateFields()
            .then((values) => {
              handleEdit(editForm.getFieldsValue());
              editForm.resetFields();
            })
            .catch((info) => {
              console.log("Validate Failed", info);
            });
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <div className={styles.modalWrap}>
          <Form
            form={editForm}
            name="student"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={"required"}
          >
            <Form.Item
              label="Student ID"
              name="id"
              rules={[
                { required: true, message: "Please input student id!" },
                {
                  validator: (rule, value, callback) => {
                    let alreadyExistId = retrived
                      .map((e) => e.id.toString())
                      .filter((e) => e !== selectedData.id.toString());
                    if (alreadyExistId.includes(value)) {
                      return Promise.reject("Already exist!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Student ID" />
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
              label="Google Account Email"
              name="email"
              rules={[
                { required: true, message: "Please input email!" },
                { type: "email" },
                {
                  validator: (rule, value, callback) => {
                    const alreadyExistEmail = retrived
                      .map((e) => e.email)
                      .filter((e) => e !== selectedData.email);
                    if (alreadyExistEmail.includes(value)) {
                      return Promise.reject("Already exist!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title="Import Student"
        visible={importVisible}
        okText="OK"
        onOk={() => {}}
        onCancel={handleCancel}
        maskClosable={false}
        confirmLoading={confirmLoading}
      >
        <Upload accept=".xlsx, .xls, .csv">
          <Header level={4}>Upload (ใช้ Template ของสำนักทะเบียน)</Header>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Body level={2} className={styles.uploadWarning}>
          {"ERR_MSG"}
        </Body>
      </Modal>
    </div>
  );
};
