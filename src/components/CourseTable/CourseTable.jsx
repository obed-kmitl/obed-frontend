//TODO : Reduce fetching?, Looped prerequisite?
import { useState, useEffect } from "react";
import { Option, Input } from "..";
import {
  Table,
  Popconfirm,
  Form,
  Typography,
  Tag,
  Tooltip,
  Space,
  Upload,
  Modal,
  Alert,
  notification,
  Select,
  message as AMessage,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import { Header, Body, Button } from "..";
import { useCourse } from "./hooks/useCourse";
import styles from "./CourseTable.module.scss";
import downloadAsExcel from "../../utils/jsonToExcel";
import excelReader from "../../utils/excelReader";
import { useImportCourse } from "./hooks/useImportCourse";

export const CourseTable = ({ selectedCur }) => {
  const {
    getCourseByCurriculum,
    createCourse,
    updateCourse,
    removeCourse,
    createAllCourse,
    getPlo,
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
  const [ploList, setPloList] = useState([]);
  const [courseValid, setCourseValid] = useState(true);
  const [courseList, setCourseList] = useState([]);
  const { getCourseListFromExcel } = useImportCourse(setCourseValid);

  function openNotificationWithIcon(type, message, desc) {
    notification[type]({
      message: message,
      description: desc,
      duration: type === "error" ? 15 : 5,
    });
  }

  function importCourseWarning(title, content) {
    Modal.error({
      title: title,
      content: content,
    });
  }

  function search(kw) {
    let keyword = kw.trim();
    if (keyword !== "") {
      setIsSearch(true);
      let results = fetchCourse.filter((course) => {
        return (
          course.course_number.toLowerCase().includes(keyword.toLowerCase()) ||
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
        newCourseForm.resetFields();
        openNotificationWithIcon(
          "success",
          values.course_number + " created",
          values.course_name_en
        );
        setNewCourseVisible(false);
      })
      .catch((message) => {
        openNotificationWithIcon("error", "Cannot create course", message);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  }

  function handleCancel() {
    setNewCourseVisible(false);
    setImportVisible(false);
    setMessage("");
    setCourseValid(true);
    setCourseList([]);
    newCourseForm.resetFields();
  }

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  function fetchPlo() {
    getPlo(selectedCur.curriculum_id)
      .then((data) => {
        setPloList(data);
      })
      .catch((message) => {
        openNotificationWithIcon("error", "Cannot fetch plo data", message);
      });
  }

  function getCourses() {
    getCourseByCurriculum(selectedCur.curriculum_id)
      .then((data) => {
        setFetchCourse(data);
      })
      .catch((message) => {
        openNotificationWithIcon("error", "Cannot fetch course data", message);
      });
    fetchPlo();
  }

  function submitCourseList() {
    setConfirmLoading(true);
    createAllCourse(selectedCur.curriculum_id, courseList)
      .then((data) => {
        if (data.duplicated_course_number.length !== 0) {
          importCourseWarning(
            "These course(s) cannot be create",
            <div>
              <p>
                Found {data.duplicated_course_number.length} duplicated
                course(s):
              </p>
              <div className={styles.previewWrap}>
                {data.duplicated_course_number.map((ele) => (
                  <p
                    className={styles.previewList}
                    style={{ paddingLeft: "1rem" }}
                    key={ele}
                  >
                    {ele}
                  </p>
                ))}
              </div>
            </div>
          );
        }
        if (data.created_courses.length > 0) {
          openNotificationWithIcon(
            "success",
            data.created_courses.length + " course(s) created"
          );
        }
        setCourseValid(true);
        setCourseList([]);
        setImportVisible(false);
        setFetchCourse([...fetchCourse, ...data.created_courses]);
      })
      .catch((message) => {
        openNotificationWithIcon("error", "Cannot import courses", message);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  }

  const uploadProps = {
    name: "file",
    beforeUpload: () => false,
    maxCount: 1,
    accept: ".xlsx, .xls",
    async onChange({ file }) {
      if (file.status !== "removed") {
        const datafromExcel = await excelReader(file);
        let list = getCourseListFromExcel(datafromExcel);
        setCourseList(list);
        if (list.length === 0) {
          setCourseValid(false);
        } else setCourseValid(true);
        AMessage.success(`${file.name} file uploaded successfully`);
      }
    },
  };

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line
  }, [selectedCur]);

  const isEditing = (record) => record.course_id === editingKey;
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
      case "plos":
        inputNode = (
          <Select
            mode="multiple"
            showSearch
            placeholder="Select PLO"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {ploList.map((ele) => (
              <Option key={ele.sub_std_id} value={ele.sub_std_id}>
                {ele.group_sub_order_number + "." + ele.sub_order_number}
              </Option>
            ))}
          </Select>
        );
        break;
      case "prereq":
        inputNode = (
          <Select
            showSearch
            placeholder="Select Prerequisite Course"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value={null}>None</Option>
            {fetchCourse.map((ele) => {
              if (ele.course_id !== editingKey)
                return (
                  <Option key={ele.course_id} value={ele.course_id}>
                    {ele.course_number + " " + ele.course_name_en}
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
    const mapEditCourseData = {
      ...record,
      relative_standards: record.relative_standards.map(
        (relative_standard) => relative_standard.sub_std_id
      ),
    };
    form.setFieldsValue({
      ...mapEditCourseData,
    });
    setEditingKey(record.course_id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async () => {
    try {
      const row = await form.validateFields();
      updateCourse(editingKey, row)
        .then((data) => {
          getCourses();
          openNotificationWithIcon(
            "success",
            "Changes to " + data.course_number + " was saved",
            data.course_name_en
          );
        })
        .catch(() => {
          openNotificationWithIcon("error", "Cannot edit course data", message);
        })
        .finally(() => {
          setFilteredCourse(null);
          setIsSearch(false);
          setEditingKey("");
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const remove = (record) => {
    removeCourse(record.course_id)
      .then(() => {
        getCourses();
        openNotificationWithIcon(
          "success",
          record.course_number + " was removed",
          record.course_name_en
        );
      })
      .catch(() => {
        openNotificationWithIcon("error", "Cannot remove course", message);
      })
      .finally(() => {
        setFilteredCourse(null);
        setIsSearch(false);
      });
  };

  const columns = [
    {
      title: "Course ID",
      dataIndex: "course_number",
      key: "course_number",
      width: "12%",
      editable: true,
      sorter: (a, b) => a.course_number - b.course_number,
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
      render: (text) => {
        const obj = fetchCourse.find((ele) => text === ele.course_id);
        return (
          <Tooltip
            placement="topLeft"
            className="prereq-data"
            title={obj && obj.course_number + " " + obj.course_name_en}
          >
            {obj ? obj.course_number + " " + obj.course_name_en : "-"}
          </Tooltip>
        );
      },
    },
    {
      title: "PLO",
      dataIndex: "relative_standards",
      width: "15%",
      editable: true,
      render: (plo) => (
        <>
          {plo?.map((ele) => {
            return (
              <Tooltip title={ele.sub_title} key={ele.sub_std_id}>
                <Tag key={ele.sub_std_id}>
                  {ele.group_sub_order_number + "." + ele.sub_order_number}
                </Tag>
              </Tooltip>
            );
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
              <Typography.Link href="#" onClick={() => save()}>
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
                onClick={() => {
                  edit(record);
                }}
                style={{ fontSize: "20px" }}
              >
                <EditOutlined />
              </Typography.Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => remove(record)}
              >
                <Typography.Link
                  disabled={editingKey !== ""}
                  style={{ fontSize: "20px" }}
                  type="danger"
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
          col.dataIndex === "relative_standards"
            ? "plos"
            : col.dataIndex === "pre_course_id"
            ? "prereq"
            : col.dataIndex === "course_number"
            ? "course_number"
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
          <Button
            onClick={() => setImportVisible(true)}
            disabled={editingKey !== ""}
          >
            Import
          </Button>
          <Button
            onClick={() => {
              setNewCourseVisible(true);
            }}
            disabled={editingKey !== ""}
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
          key={fetchCourse}
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
            name="course_number"
            rules={[
              { required: true, message: "Please input course id!" },
              {
                validator: (rule, value, callback) => {
                  const alreadyExistNo = fetchCourse.map(
                    (e) => e.course_number
                  );
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
              {
                max: 100,
                message: "Maximum name length is 100 characters",
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
              {
                max: 100,
                message: "Maximum name length is 100 characters",
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
                    value === undefined ||
                    value === null
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
            <Select
              showSearch
              placeholder="Prerequisite Course ID"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              defaultValue={null}
            >
              <Option value={null}>None</Option>
              {fetchCourse.map((e) => (
                <Option value={e.course_id} key={e.course_id}>
                  {e.course_number + " " + e.course_name_en}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="PLOs" name="relative_standards">
            <Select
              mode="multiple"
              placeholder="PLO"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {ploList.map((e) => (
                <Option value={e.sub_std_id} key={e.sub_std_id}>
                  {e.group_sub_order_number + "." + e.sub_order_number}
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
        onOk={() => {
          submitCourseList();
        }}
        onCancel={handleCancel}
        maskClosable={false}
        confirmLoading={confirmLoading}
        okButtonProps={{ disabled: courseList.length === 0 }}
      >
        <Header level={4}>Upload</Header>
        <p>Can only import course with course id and course name only.</p>
        <Typography.Link
          onClick={() => {
            downloadAsExcel(
              [
                {
                  course_number: null,
                  course_name_en: null,
                  course_name_th: null,
                },
              ],
              "Courses"
            );
          }}
          type="primary"
        >
          Download template
        </Typography.Link>
        <br />
        <br />
        <Upload
          {...uploadProps}
          onRemove={() => {
            setCourseList([]);
            setCourseValid(true);
          }}
        >
          <Button type="primary" icon={<UploadOutlined />}>
            Select a file
          </Button>
        </Upload>
        {courseList.length > 0 && (
          <div>
            <Header level={4}>
              Preview Course{" "}
              <small>{"(Found " + courseList.length + ")"}</small>
            </Header>
            <div className={styles.previewWrap}>
              {courseList.map((ele) => {
                const name =
                  ele.course_name_en + " (" + ele.course_name_th + ")";
                return (
                  <Tooltip title={name} key={ele.course_number}>
                    <p className={styles.previewList}>
                      {ele.course_number + " - " + name}
                    </p>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        )}
        <Body level={2} className={styles.uploadWarning}>
          {!courseValid && "Course list not valid or wrong template"}
        </Body>
      </Modal>
    </>
  );
};
