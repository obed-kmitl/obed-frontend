/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import {
  Alert,
  Divider,
  Modal,
  Form,
  Select,
  Upload,
  Tooltip,
  notification,
} from "antd";
import { EditFilled } from "@ant-design/icons";
import {
  Header,
  Body,
  Button,
  Tabs,
  TabPane,
  CourseTable,
  Option,
  Input,
  Standard,
  MappingStandard,
} from "../../components";
import styles from "./Curriculum.module.scss";
import { Helmet } from "react-helmet";
import { ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useCurriculum } from "../../hooks/useCurriculum";
import { useCourse } from "../../hooks/useCourse";

export function Curriculum() {
  const { create, getAll, update, remove, curriculum, message, setMessage } =
    useCurriculum();
  const { createCourse, getCourseByCurriculum, courses } = useCourse();
  const [selected, setSelected] = useState(null);
  const [editDetail, setEditDetail] = useState(false);
  const [editCurVisible, setEditCurVisible] = useState(false);
  const [newCurVisible, setNewCurVisible] = useState(false);
  const [newCourseVisible, setNewCourseVisible] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editForm] = Form.useForm();
  const [newForm] = Form.useForm();
  const [newCourseForm] = Form.useForm();
  const { confirm } = Modal;

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
  const [filteredCourse, setFilteredCourse] = useState([]);

  function showRemoveConfirm() {
    confirm({
      title: "Remove " + selected.title + " ?",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to remove this curriculum?",
      okText: "Remove",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        remove(selected.curriculum_id)
          .then(() => {
            openNotificationWithIcon(
              "success",
              "Curriculum removed",
              selected.title + " have been removed."
            );
            setSelected(null);
          })
          .catch((message) => {
            openNotificationWithIcon(
              "error",
              "Cannot remove curriculum",
              message
            );
          });
      },
    });
  }

  function search(keyword) {
    if (keyword !== "") {
      const results = courses.filter((course) => {
        return (
          course.course_id.toLowerCase().includes(keyword.toLowerCase()) ||
          course.course_name_en.toLowerCase().includes(keyword.toLowerCase()) ||
          course.course_name_th.includes(keyword)
        );
      });
      setFilteredCourse(results);
    } else {
      setFilteredCourse(courses);
    }
  }

  function handleCreateSubmit(values) {
    setConfirmLoading(true);
    create(values)
      .then((data) => {
        setSelected(data);
        setConfirmLoading(false);
        setNewCurVisible(false);
        newForm.resetFields();
        openNotificationWithIcon(
          "success",
          "Curriculum created",
          data.title + " have been created."
        );
      })
      .catch((message) => {
        setConfirmLoading(false);
        openNotificationWithIcon("error", "Cannot create curriculum", message);
      });
  }

  function handleEditSubmit(values) {
    setConfirmLoading(true);
    update(selected.curriculum_id, values)
      .then((data) => {
        setSelected(data);
        setConfirmLoading(false);
        setEditCurVisible(false);
        editForm.resetFields();
        openNotificationWithIcon(
          "success",
          "Curriculum edited",
          "Changes have been saved."
        );
      })
      .catch((message) => {
        setConfirmLoading(false);
        openNotificationWithIcon("error", "Cannot edit curriculum", message);
      });
  }

  function handleCourseSubmit(values) {
    setConfirmLoading(true);
    createCourse(selected.curriculum_id, values)
      .then((data) => {
        setFilteredCourse([...courses, data]);
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
    setEditCurVisible(false);
    setNewCurVisible(false);
    setNewCourseVisible(false);
    setImportVisible(false);
    editForm.resetFields();
    newForm.resetFields();
    newCourseForm.resetFields();
    setMessage("");
  }

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  function onFinishDetail(values) {
    console.log("Success:", values);
    setEditDetail(false);
  }

  function onFinishDetailFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  function openNotificationWithIcon(type, message, desc) {
    notification[type]({
      message: message,
      description: desc,
      duration: type === "error" ? 0 : 5,
    });
  }

  useEffect(() => {
    getAll().catch((message) => {
      openNotificationWithIcon(
        "error",
        "Cannot fetch curriculum data",
        message
      );
    });
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.curriculum}>
      <Helmet>
        <title>Curriculum - OBED</title>
      </Helmet>
      <Header level={1}>Curriculum</Header>
      <div className={styles.selectCurriculum}>
        <Header level={2}>Select Curriculum</Header>
        <Select
          placeholder="Curriculum"
          onChange={(value) => {
            setSelected(curriculum.find((ele) => ele.curriculum_id === value));
            getCourseByCurriculum(value).then((data) => {
              setFilteredCourse(data);
            });
          }}
          style={{ width: "320px" }}
          defaultValue={null}
          value={selected?.curriculum_id}
        >
          <Option value={null} disabled>
            None
          </Option>
          {curriculum.map((e) => (
            <Option value={e.curriculum_id} key={e.curriculum_id}>
              {e.title}
            </Option>
          ))}
        </Select>
        <Header level={2}>or</Header>
        <Button onClick={() => setNewCurVisible(true)}>
          Create Curriculum
        </Button>
      </div>
      <Modal
        title="Create Curriculum"
        visible={newCurVisible}
        okText="Create"
        onOk={() => {
          newForm
            .validateFields()
            .then((values) => {
              handleCreateSubmit(values);
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
          form={newForm}
          name="curriculum_name"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={"required"}
        >
          <Form.Item
            label="Name"
            name="title"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input placeholder="Curriculum Name" />
          </Form.Item>
          <Divider />
          <Form.Item
            label="Clone Curriculum"
            name="clone"
            rules={[{ required: false, message: "Please input year!" }]}
          >
            <Select defaultValue="0">
              <Option value="0">None</Option>
              {curriculum.map((e) => (
                <Option value={e.curriculum_id} key={e.curriculum_id}>
                  {e.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Divider />
      {selected && (
        <>
          <div className={styles.curriculumMenu}>
            <Header level={2}>
              {selected.title}&nbsp;
              <Tooltip title="Edit Curriculum Info">
                <EditFilled
                  className={styles.editBtn}
                  onClick={() => setEditCurVisible(true)}
                />
              </Tooltip>
            </Header>
            <Button danger onClick={() => showRemoveConfirm()}>
              Remove Curriculum
            </Button>
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Course" key="1">
              <div className={styles.tabHead}>
                <Header level={2}>Course</Header>
                <div>
                  <Input
                    search
                    placeholder="Search"
                    onSearch={search}
                    allowClear
                  />
                  <Button onClick={() => setImportVisible(true)}>Import</Button>
                  <Button
                    onClick={() => {
                      setNewCourseVisible(true);
                      getCourseByCurriculum(selected.curriculum_id);
                    }}
                  >
                    New
                  </Button>
                </div>
              </div>
              <CourseTable
                course={filteredCourse}
                key={filteredCourse}
                setFilteredCourse={setFilteredCourse}
              />
              <Modal
                title="New Course"
                visible={newCourseVisible}
                okText="Create"
                onOk={() => {
                  newCourseForm
                    .validateFields()
                    .then((values) => {
                      newCourseForm.resetFields();
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
                          const alreadyExistNo = courses.map(
                            (e) => e.course_id
                          );
                          if (alreadyExistNo.includes(value)) {
                            return Promise.reject("Already exist!");
                          } else if (value.length !== 8) {
                            return Promise.reject(
                              "Course id must have 8 digits."
                            );
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
                          const alreadyExistNo = courses.map(
                            (e) => e.course_id
                          );
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
            </TabPane>
            <TabPane tab="Standard" key="2">
              <Standard />
            </TabPane>
            <TabPane tab="Mapping" key="3">
              <MappingStandard />
            </TabPane>
            <TabPane tab="Details" key="4">
              <Form
                name="detail"
                initialValues={selected}
                onFinish={onFinishDetail}
                onFinishFailed={onFinishDetailFailed}
              >
                <div className={styles.tabHead}>
                  <Header level={2}>Detail</Header>
                  <div>
                    {editDetail ? (
                      <div className={styles.btn}>
                        <Button type="primary" htmlType="submit" key="save">
                          Save
                        </Button>
                        <Button onClick={() => setEditDetail(false)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className={styles.btn}>
                        <Button
                          htmlType="button"
                          onClick={() => setEditDetail(true)}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.detailTab}>
                  <Header level={4}>
                    University:{" "}
                    {editDetail ? (
                      <Form.Item
                        name="university"
                        rules={[
                          {
                            required: true,
                            message: "Please input university!",
                          },
                        ]}
                      >
                        <Input placeholder="University or Institue Name" />
                      </Form.Item>
                    ) : (
                      <Body level={1}>
                        {selected.university || "No data, Please input."}
                      </Body>
                    )}
                  </Header>
                  <Header level={4}>
                    Faculty:{" "}
                    {editDetail ? (
                      <Form.Item
                        name="faculty"
                        rules={[
                          {
                            required: true,
                            message: "Please input faculty!",
                          },
                        ]}
                      >
                        <Input placeholder="Faculty" />
                      </Form.Item>
                    ) : (
                      <Body level={1}>
                        {selected.faculty || "No data, Please input."}
                      </Body>
                    )}
                  </Header>
                  <Header level={4}>
                    Department:{" "}
                    {editDetail ? (
                      <Form.Item
                        name="department"
                        rules={[
                          {
                            required: true,
                            message: "Please input department!",
                          },
                        ]}
                      >
                        <Input placeholder="Department" />
                      </Form.Item>
                    ) : (
                      <Body level={1}>
                        {selected.department || "No data, Please input."}
                      </Body>
                    )}
                  </Header>
                </div>
              </Form>
            </TabPane>
          </Tabs>
          <Modal
            title="Edit Curriculum"
            visible={editCurVisible}
            okText="Save"
            onOk={() => {
              editForm
                .validateFields()
                .then((values) => {
                  handleEditSubmit(values);
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
          >
            <Form
              form={editForm}
              name="curriculum_name"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              requiredMark="optional"
              initialValues={selected}
            >
              <Form.Item
                label="Name"
                name="title"
                rules={[{ required: true, message: "Please input name!" }]}
              >
                <Input placeholder="Curriculum Name" />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
}
