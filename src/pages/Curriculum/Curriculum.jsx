/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import {
  Alert,
  Divider,
  Modal,
  Form,
  Input,
  Select,
  Tooltip,
  notification,
} from "antd";
import { EditFilled } from "@ant-design/icons";
import {
  Header,
  Button,
  Tabs,
  TabPane,
  CourseTable,
  Option,
  Standard,
  MappingStandard,
} from "../../components";
import styles from "./Curriculum.module.scss";
import { Helmet } from "react-helmet";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useCurriculum } from "../../hooks/useCurriculum";

export function Curriculum() {
  const { create, getAll, update, remove, curriculum, message, setMessage } =
    useCurriculum();
  const [selected, setSelected] = useState(null);
  const [editCurVisible, setEditCurVisible] = useState(false);
  const [newCurVisible, setNewCurVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editForm] = Form.useForm();
  const [newForm] = Form.useForm();
  const { confirm } = Modal;

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

  function handleCancel() {
    setEditCurVisible(false);
    setNewCurVisible(false);
    editForm.resetFields();
    newForm.resetFields();
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
          <Form.Item
            label="University"
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
          <Form.Item
            label="Faculty"
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
          <Form.Item
            label="Department"
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
          <Tabs defaultActiveKey="1" destroyInactiveTabPane>
            <TabPane tab="Course" key="1">
              <CourseTable selectedCur={selected} />
            </TabPane>
            <TabPane tab="Standard" key="2">
              <Standard selectedCurriculum={selected.curriculum_id} />
            </TabPane>
            <TabPane tab="Mapping" key="3">
              <MappingStandard selectedCurriculum={selected.curriculum_id} />
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
              <Form.Item
                label="University"
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
              <Form.Item
                label="Faculty"
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
              <Form.Item
                label="Department"
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
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
}
