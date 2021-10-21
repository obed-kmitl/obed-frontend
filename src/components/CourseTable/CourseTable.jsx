import { useState } from "react";
import { Option, Input } from "..";
import {
  Table,
  Popconfirm,
  Form,
  Typography,
  Tag,
  Tooltip,
  Space,
  Divider,
  Upload,
  Modal,
  Alert,
  notification,
  Select,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import { Header, Body, Button } from "..";
import { useCourse } from "../../hooks/useCourse";
import styles from "./CourseTable.module.scss";
import { useEffect } from "react/cjs/react.development";

export const CourseTable = ({ selectedCur }) => {
  const {
    getCourseByCurriculum,
    createCourse,
    updateCourse,
    removeCourse,
    setMessage,
    message,
  } = useCourse();
  const [form] = Form.useForm();
  const [newCourseForm] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [newCourseVisible, setNewCourseVisible] = useState(false);
  const [fetchCourse, setFetchCourse] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  function openNotificationWithIcon(type, message, desc) {
    notification[type]({
      message: message,
      description: desc,
      duration: type === "error" ? 15 : 5,
    });
  }

  function search(keyword) {
    if (keyword !== "") {
      setIsSearch(true);
      let results = fetchCourse.filter((course) => {
        return (
          course.course_id.toLowerCase().includes(keyword.toLowerCase()) ||
          course.course_name_en.toLowerCase().includes(keyword.toLowerCase()) ||
          course.course_name_th.includes(keyword)
        );
      });
      setFilteredCourse(results);
    } else {
      setFilteredCourse(null);
      setIsSearch(false);
    }
  }

  function handleCourseSubmit(values) {
    setConfirmLoading(true);
    createCourse(selectedCur.curriculum_id, values)
      .then((data) => {
        setFetchCourse([...fetchCourse, data]);
        setConfirmLoading(false);
        setNewCourseVisible(false);
        newCourseForm.resetFields();
      })
      .catch((message) => {
        setConfirmLoading(false);
        openNotificationWithIcon("error", "Cannot create course", message);
      });
  }

  function handleCancel() {
    setNewCourseVisible(false);
    setImportVisible(false);
    setMessage("");
    newCourseForm.resetFields();
  }

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  useEffect(() => {
    getCourseByCurriculum(selectedCur.curriculum_id)
      .then((data) => {
        setFetchCourse(data);
      })
      .catch((message) => {
        openNotificationWithIcon("error", "Cannot fetch course data", message);
      });
    // eslint-disable-next-line
  }, [selectedCur]);

  const isEditing = (record) => record.course_id === editingKey;
  const mockPLO = [
    {
      id: 1.1,
      desc: "PLO 1.1",
    },
    {
      id: 1.2,
      desc: "PLO 1.2",
    },
    {
      id: 1.3,
      desc: "PLO 1.3",
    },
    {
      id: 2.1,
      desc: "PLO 2.1",
    },
    {
      id: 2.2,
      desc: "PLO 2.1",
    },
    {
      id: 2.3,
      desc: "PLO 2.1",
    },
    {
      id: 2.4,
      desc: "PLO 2.1",
    },
  ];
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let inputNode;
    switch (inputType) {
      case "plo":
        inputNode = (
          <Select mode="multiple" showSearch placeholder="Select PLO">
            {mockPLO.map((ele, i) => (
              <Option key={i} value={ele.id}>
                {ele.id}
              </Option>
            ))}
          </Select>
        );
        break;
      case "prereq":
        inputNode = (
          <Select showSearch placeholder="Select Prerequisite Course">
            <Option value={null}>None</Option>
            {fetchCourse.map((ele) => {
              if (ele.course_id !== editingKey)
                return (
                  <Option key={ele.course_id} value={ele.course_id}>
                    {ele.course_id}&nbsp;{ele.course_name_en}
                  </Option>
                );
              return null;
            })}
          </Select>
        );
        break;
      default:
        inputNode = <Input />;
        break;
    }
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: false,
                message: `Please Input ${title}!`,
              },
              {
                validator: (rule, value, callback) => {
                  const alreadyExistNo = fetchCourse
                    .map((e) => e.course_id)
                    .filter((e) => e !== record.course_id);
                  if (inputType === "course_id") {
                    if (alreadyExistNo.includes(value)) {
                      return Promise.reject("Already exist!");
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.course_id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...fetchCourse];
      const index = newData.findIndex((item) => key === item.course_id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setFetchCourse(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setFetchCourse(newData);
        setEditingKey("");
      }
      updateCourse(editingKey, row).then(() => {
        setFetchCourse(newData);
        setFilteredCourse(null);
        setIsSearch(false);
      });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const remove = (record) => {
    let newData = [...fetchCourse];
    newData = newData
      .filter((ele) => ele.course_id !== record.course_id)
      .filter((ele) => ele.pre_course_id !== record.course_id);
    removeCourse(record.course_id).then(() => {
      setFetchCourse(newData);
      setFilteredCourse(null);
      setIsSearch(false);
    });
  };

  const columns = [
    {
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
      width: "12%",
      editable: true,
      sorter: (a, b) => a.course_id - b.course_id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Course Name (EN)",
      dataIndex: "course_name_en",
      width: "20%",
      ellipsis: {
        showTitle: false,
      },
      editable: true,
      render: (text) => (
        <Tooltip className="prereq-data" title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "Course Name (TH)",
      dataIndex: "course_name_th",
      width: "20%",
      ellipsis: {
        showTitle: false,
      },
      editable: true,
      render: (text) => (
        <Tooltip className="prereq-data" title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "Prerequisite",
      dataIndex: "pre_course_id",
      width: "20%",
      ellipsis: {
        showTitle: false,
      },
      editable: true,
      render: (text) => (
        <Tooltip
          placement="topLeft"
          className="prereq-data"
          title={
            text &&
            text +
              " " +
              fetchCourse.find((ele) => text === ele.course_id)?.course_name_en
          }
        >
          {text
            ? text +
              " " +
              fetchCourse.find((ele) => text === ele.course_id)?.course_name_en
            : "-"}
        </Tooltip>
      ),
    },
    {
      title: "PLO",
      dataIndex: "plo",
      width: "15%",
      editable: true,
      render: (plo) => (
        <>
          {plo?.map((ele) => {
            return <Tag key={ele}>{ele}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Tooltip title="Save">
              <Typography.Link href="#" onClick={() => save(record.course_id)}>
                <SaveOutlined style={{ fontSize: "20px" }} />
              </Typography.Link>
            </Tooltip>
            <Popconfirm title="Discard changes?" onConfirm={cancel}>
              <Tooltip title="Cancel">
                <Typography.Link>
                  <CloseCircleTwoTone
                    twoToneColor="#C73535"
                    style={{ fontSize: "20px" }}
                  />
                </Typography.Link>
              </Tooltip>
            </Popconfirm>
          </Space>
        ) : (
          <Space size="middle">
            <Tooltip title="Edit">
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
                style={{ color: "#009FC7", fontSize: "20px" }}
              >
                <EditOutlined />
              </Typography.Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Sure to delete? This may also delete course that prerequire this course."
                onConfirm={() => remove(record)}
              >
                <Typography.Link
                  disabled={editingKey !== ""}
                  style={{ color: "#C73535", fontSize: "20px" }}
                >
                  <DeleteOutlined />
                </Typography.Link>
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "plo"
            ? "plo"
            : col.dataIndex === "pre_course_id"
            ? "prereq"
            : col.dataIndex === "course_id"
            ? "course_id"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <div className={styles.tabHead}>
        <Header level={2}>Course</Header>
        <div>
          <Input search placeholder="Search" onSearch={search} allowClear />
          <Button onClick={() => setImportVisible(true)}>Import</Button>
          <Button
            onClick={() => {
              setNewCourseVisible(true);
            }}
          >
            New
          </Button>
        </div>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={isSearch ? filteredCourse : fetchCourse}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          rowKey="course_id"
        />
      </Form>
      <Modal
        title="New Course"
        visible={newCourseVisible}
        okText="Create"
        onOk={() => {
          newCourseForm
            .validateFields()
            .then((values) => {
              handleCourseSubmit(values);
            })
            .catch((info) => {
              console.log("Validate Failed", info);
            });
        }}
        onCancel={handleCancel}
        okButtonProps={{ htmlType: "submit" }}
        maskClosable={false}
        confirmLoading={confirmLoading}
        width="700px"
        centered
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
          form={newCourseForm}
          name="course"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={"required"}
        >
          <Form.Item
            label="Course ID"
            name="course_id"
            rules={[
              { required: true, message: "Please input course id!" },
              {
                validator: (rule, value, callback) => {
                  const alreadyExistNo = fetchCourse.map((e) => e.course_id);
                  if (alreadyExistNo.includes(value)) {
                    return Promise.reject("Already exist!");
                  } else if (value.length !== 8) {
                    return Promise.reject("Course id must have 8 digits.");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="Course ID" />
          </Form.Item>
          <Form.Item
            label="Course Name (EN)"
            name="course_name_en"
            rules={[
              {
                required: true,
                message: "Please input course name (en)!",
              },
            ]}
          >
            <Input placeholder="Course Name in English" />
          </Form.Item>
          <Form.Item
            label="Course Name (TH)"
            name="course_name_th"
            rules={[
              {
                required: true,
                message: "Please input course name (th)!",
              },
            ]}
          >
            <Input placeholder="Course Name in Thai" />
          </Form.Item>
          <Form.Item
            label="Prerequisite"
            name="pre_course_id"
            rules={[
              {
                validator: (rule, value, callback) => {
                  const alreadyExistNo = fetchCourse.map((e) => e.course_id);
                  if (
                    alreadyExistNo.includes(value) ||
                    value === "" ||
                    value === undefined
                  ) {
                    return Promise.resolve();
                  } else
                    return Promise.reject(
                      "Not exist! Please create prerequisite course before."
                    );
                },
              },
            ]}
          >
            <Input placeholder="Prerequisite Course ID" />
          </Form.Item>
          <Form.Item label="PLOs" name="plo">
            <Select mode="multiple" placeholder="PLO">
              {mockPLO.map((e) => (
                <Option value={e.id} key={e.id}>
                  {e.id}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Import Course"
        visible={importVisible}
        okText="OK"
        onOk={() => {}}
        onCancel={handleCancel}
        maskClosable={false}
        confirmLoading={confirmLoading}
      >
        <Header level={4}>Download Excel Template</Header>
        <Button>Download</Button>
        <Divider />
        <Upload accept=".xlsx, .xls, .csv">
          <Header level={4}>Upload</Header>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Body level={2} className={styles.uploadWarning}>
          Warning Message
        </Body>
      </Modal>
    </>
  );
};
