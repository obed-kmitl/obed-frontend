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

export function Curriculum() {
  const { create, getAll, update, remove, curriculum, message, setMessage } =
    useCurriculum();
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

  const courses = [
    {
      key: "1",
      course_id: "01076001",
      curriculum_id: "01072560",
      precourse_id: null,
      course_name_th: "วิศวกรรมคอมพิวเตอร์เบื้องต้น",
      course_name_en: "Introduction to Computer Engineering",
      plo: [1.2, 1.3],
    },
    {
      key: "2",
      course_id: "01076002",
      curriculum_id: "01072560",
      precourse_id: null,
      course_name_th: "พื้นฐานการเขียนโปรแกรมคอมพิวเตอร์",
      course_name_en: "Programming Fundamental",
      plo: [1.1, 1.2],
    },
    {
      key: "3",
      course_id: "01076003",
      curriculum_id: "01072560",
      precourse_id: null,
      course_name_th: "วงจรไฟฟ้าและอิเล็กทรอนิกส์",
      course_name_en: "Circuits and Electronics",
      plo: [2.1, 2.2, 2.4],
    },
    {
      key: "4",
      course_id: "01076004",
      curriculum_id: "01072560",
      precourse_id: null,
      course_name_th: "การเขียนโปรแกรมเชิงวัตถุ",
      course_name_en: "Object Oriented Programming",
      plo: [1.1, 1.3],
    },
    {
      key: "5",
      course_id: "01076005",
      curriculum_id: "01072560",
      precourse_id: "01076004",
      course_name_th: "โครงสร้างข้อมูลและอัลกอริทึม",
      course_name_en: "Data Structures and Algorithm",
      plo: [2.1, 2.2],
    },
  ];

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
  const [filteredCourse, setFilteredCourse] = useState(courses);

  function showArchiveConfirm() {
    confirm({
      title: "Archive " + selected.title + " ?",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to remove this curriculum?",
      okText: "Remove",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        remove(selected.curriculum_id);
        setSelected(null);
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
      console.log(results);
    } else {
      setFilteredCourse(courses);
    }
  }

  function handleCreateSubmit(values) {
    console.log("Recieved values of form: ", values);
    setConfirmLoading(true);
    create(values)
      .then((data) => {
        setSelected(data);
        setConfirmLoading(false);
        setNewCurVisible(false);
        newForm.resetFields();
      })
      .catch(() => {
        console.log(message);
      });
  }

  function handleEditSubmit(values) {
    console.log("Recieved values of form: ", values);
    setConfirmLoading(true);
    update(selected.curriculum_id, values)
      .then((data) => {
        setSelected(data);
        setConfirmLoading(false);
        setEditCurVisible(false);
        editForm.resetFields();
      })
      .catch(() => {
        console.log(message);
      });
  }

  function handleCourseSubmit(values) {
    console.log("Recieved values of form: ", values);
    setConfirmLoading(true);
    // TODO
    setTimeout(() => {
      setConfirmLoading(false);
      setNewCourseVisible(false);
      setImportVisible(false);
    }, 2000);
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
      duration: 5,
    });
  }

  useEffect(() => {
    getAll();
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
          onChange={(value) =>
            setSelected(curriculum.find((ele) => ele.curriculum_id === value))
          }
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
            <Button danger onClick={() => showArchiveConfirm()}>
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
                  <Button onClick={() => setNewCourseVisible(true)}>New</Button>
                </div>
              </div>
              <CourseTable course={filteredCourse} key={filteredCourse} />
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
                  <Form.Item label="Prerequisite" name="precourse_id">
                    <Input placeholder="Prerequisite Course ID" />
                  </Form.Item>
                  <Form.Item
                    label="PLOs"
                    name="plo"
                    rules={[{ required: true, message: "Please input plo!" }]}
                  >
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
              <Standard selectedCurriculum={selected.curriculum_id}/>
            </TabPane>
            <TabPane tab="Mapping" key="3">
              <MappingStandard selectedCurriculum={selected.curriculum_id}/>
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
