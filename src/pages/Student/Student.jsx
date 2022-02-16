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
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
  RightOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import { useStudent } from "./hooks/useStudent";
import { useImportStudent } from "./hooks/useImportStudent";
import excelReader from "../../utils/excelReader";
import SectionContext from "../../contexts/SectionContext";

export const Student = () => {
  const { Column } = Table;
  const { section } = useContext(SectionContext);
  const {
    students,
    fetchStudents,
    createStudents,
    updateStudent,
    removeStudent,
  } = useStudent();
  const [retrived, setRetrieve] = useState(students);
  const [filterList, setFilterList] = useState(retrived);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [selectedData, setSelectedData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [isEditList, setIsEditList] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [addList, setAddList] = useState([]);
  const [uploadList, setUploadList] = useState([]);
  const [studentListValid, setStudentListValid] = useState(true);
  const { getStudentListFromExcel } = useImportStudent(
    section,
    setStudentListValid
  );
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

  function search(kw) {
    let keyword = kw.trim();
    if (keyword !== "") {
      const results = retrived.filter((student) => {
        return (
          student.firstname.toLowerCase().includes(keyword.toLowerCase()) ||
          student.lastname.toLowerCase().includes(keyword.toLowerCase()) ||
          student.student_number.toLowerCase().includes(keyword.toLowerCase())
          // || student.email.toLowerCase().includes(keyword.toLowerCase())
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
    createStudents(values)
      .then(() => {
        openNotificationWithIcon(
          "success",
          values.length + " Student(s) added"
        );
        setVisible(false);
        setAddList([]);
      })
      .catch((message) => {
        openNotificationWithIcon("error", "Cannot add student", message);
      })
      .finally(() => {
        setConfirmLoading(false);
        _fetchStudent();
      });
  }

  function handleEdit(values, id) {
    console.log("Recieved values of form[EDIT]: ", values);
    setConfirmLoading(true);
    updateStudent({ ...values, section_id: section }, id)
      .then(() => {
        openNotificationWithIcon(
          "success",
          "Student " + values.student_number + " saved"
        );
        setEditVisible(false);
        editForm.resetFields();
      })
      .catch((message) => {
        openNotificationWithIcon("error", "Cannot edit student", message);
      })
      .finally(() => {
        setConfirmLoading(false);
        _fetchStudent();
      });
  }

  function handleCancel() {
    setVisible(false);
    setEditVisible(false);
    setImportVisible(false);
    form.resetFields();
    editForm.resetFields();
    setSelectedData(null);
    setAddList([]);
    setUploadList([]);
  }

  function onFinish(values) {
    setAddList([...addList, { ...values, section_id: section }]);
    form.resetFields();
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
    removeStudent(record.student_id)
      .then(() => {
        openNotificationWithIcon("success", record.student_number + " deleted");
      })
      .catch((message) => {
        openNotificationWithIcon(
          "error",
          "Cannot delete " + record.student_number,
          message
        );
      })
      .finally(() => {
        _fetchStudent();
      });
  }

  function removeFromList(student_number) {
    let result = addList.filter(
      (item) => item.student_number !== student_number
    );
    setAddList(result);
  }

  async function editFromList(student_number) {
    let edit = addList.find((item) => item.student_number === student_number);
    form.setFieldsValue(edit);
    removeFromList(student_number);
  }

  function _fetchStudent() {
    if (section) {
      fetchStudents(section).then((data) => {
        setRetrieve(data);
        setFilterList(data);
      });
    }
  }

  function submitUploadList(list) {
    if (list.length > 0) {
      setConfirmLoading(true);
      createStudents(list)
        .then(() => {
          openNotificationWithIcon(
            "success",
            list.length + " Student(s) added"
          );
          setUploadList([]);
          setImportVisible(false);
        })
        .catch((message) => {
          openNotificationWithIcon("error", "Cannot add student", message);
        })
        .finally(() => {
          _fetchStudent();
          setConfirmLoading(false);
        });
    } else {
      setImportVisible(false);
    }
  }

  const uploadProps = {
    name: "file",
    action: window.location.origin,
    headers: {
      authorization: "authorization-text",
    },
    maxCount: 1,
    accept: ".xlsx, .xls",
    async onChange(info) {
      setStudentListValid(true);
      if (info.file.status === "done") {
        const datafromExcel = await excelReader(info.file.originFileObj);
        let list = getStudentListFromExcel(datafromExcel);
        setUploadList(list);
        if (list.length === 0) setStudentListValid(false);
        else setStudentListValid(true);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    _fetchStudent();
    // eslint-disable-next-line
  }, [section]);

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
        rowKey="student_number"
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
          dataIndex="student_number"
          key="student_number"
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
        {/* <Column
          title="Google Classroom Account"
          dataIndex="email"
          key="email"
        /> */}
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
              name="student_number"
              rules={[
                { required: true, message: "Please input student id!" },
                {
                  validator: (rule, value, callback) => {
                    let alreadyExistId = retrived.map((e) =>
                      e.student_number.toString()
                    );
                    if (
                      alreadyExistId.includes(value) ||
                      addList.find((item) => item.student_number === value)
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
            {/* <Form.Item
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
            </Form.Item> */}
            <Button
              htmlType="submit"
              style={{ width: "100%" }}
              onClick={() => {
                setIsEditList(false);
              }}
            >
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
                    {ele.student_number} - {ele.firstname} {ele.lastname}
                    <Space className={styles.btn}>
                      <Tooltip title="Edit">
                        <EditOutlined
                          style={{
                            color: "#009FC7",
                            display: isEditList ? "none" : "block",
                          }}
                          onClick={() => {
                            setIsEditList(true);
                            editFromList(ele.student_number);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Remove">
                        <MinusCircleOutlined
                          style={{ color: "#C73535" }}
                          onClick={() => removeFromList(ele.student_number)}
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
              handleEdit(editForm.getFieldsValue(), selectedData.student_id);
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
              name="student_number"
              rules={[
                { required: true, message: "Please input student id!" },
                {
                  validator: (rule, value, callback) => {
                    let alreadyExistId = retrived
                      .map((e) => e.student_number.toString())
                      .filter(
                        (e) => e !== selectedData.student_number.toString()
                      );
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
            {/* <Form.Item
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
            </Form.Item> */}
          </Form>
        </div>
      </Modal>
      <Modal
        title="Import Student"
        visible={importVisible}
        okText="OK"
        onOk={() => {
          submitUploadList(uploadList);
        }}
        onCancel={handleCancel}
        okButtonProps={{ disabled: uploadList.length === 0 }}
        maskClosable={false}
        confirmLoading={confirmLoading}
      >
        <Header level={4}>Upload (Use KMITL REG Excel template only)</Header>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
          <Body level={2} className={styles.uploadWarning}>
            {!studentListValid && "Student list not found"}
          </Body>
        </Upload>
      </Modal>
    </div>
  );
};
