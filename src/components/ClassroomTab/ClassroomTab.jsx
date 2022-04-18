import styles from "./ClassroomTab.module.scss";
import { GoogleLogin } from "react-google-login";
import config from "../../config";
import { Header, Body, Button, Select, Option } from "..";
import { useGoogleClassroom } from "./hooks/useGoogleClassroom";
import { Radio, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import googleClassroomLogo from "../../assets/img/logo_google_classroom.svg";
import { Spin, Modal, Checkbox, Form } from "antd";

const ClassroomTab = () => {
  const {
    authorized,
    allGClass,
    selectedCourse,
    setSelectedCourse,
    onCourseChange,
    googleActivity,
    onGoogleSuccess,
    loading,
    onAddToActivity,
    visibleModal,
    onCancelAddToActivity,
    addToActivity,
    cloList,
    addToActivityForm,
    toAddActivityIndex,
  } = useGoogleClassroom();

  return (
    <div>
      {loading ? (
        <div className={styles.spinContainer}>
          <Spin />
        </div>
      ) : (
        <div className={styles.classroomTab}>
          {authorized ? (
            selectedCourse ? (
              <div className={styles.flexcol}>
                <div
                  className={styles.backBtn}
                  onClick={() => setSelectedCourse(undefined)}
                  title="Back"
                  style={{ color: "#f7941d" }}
                >
                  <LeftOutlined /> Back
                </div>
                <Header level={2}>{selectedCourse.name}'s Activity</Header>
                {googleActivity?.map((activity, i) => (
                  <div key={activity.id} className={styles.card}>
                    <img src={googleClassroomLogo} alt="google classroom" className={styles.logo} />
                    <div className={styles.detail}>
                      <div className={styles.content}>
                        <div className={styles.titleBox}>
                          <a
                            rel="noreferrer"
                            href={activity.alternateLink}
                            target="_blank"
                            title={activity.title}
                          >
                            <Header level={3} className={styles.title}>
                              {activity.title}
                            </Header>
                          </a>
                        </div>
                        <Body level={2} className={styles.description}>
                          {activity.description}
                        </Body>
                      </div>
                      <Button disabled={activity.disabled} onClick={() => onAddToActivity(i)}>
                        Add to Activity
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className={styles.flexrow}>
                  <Header level={2}>Google Classroom</Header>
                </div>
                <br />
                <div className={styles.flexcol}>
                  <Header level={4}>Select Course</Header>
                  <br />
                  <Radio.Group onChange={onCourseChange} value={selectedCourse} buttonStyle="solid">
                    <Space wrap>
                      {allGClass.length === 0
                        ? "No courses"
                        : allGClass.map((course) => (
                            <Radio.Button
                              key={course.id}
                              value={course}
                              className={styles.courseselect}
                            >
                              <div className={styles.course}>
                                <Body level={4}>{course.enrollmentCode || ""}</Body>
                                <Body level={1}>{course.name}</Body>
                              </div>
                            </Radio.Button>
                          ))}
                    </Space>
                  </Radio.Group>
                </div>
              </>
            )
          ) : (
            <>
              <Header level={4}>Google classroom</Header>
              <br />
              To Add Course from Google Classroom, Please Login with your google classroom account.
              <br />
              <br />
              <GoogleLogin
                clientId={config.googleClientId}
                buttonText="Link with Google"
                accessType="offline"
                responseType="code"
                onSuccess={onGoogleSuccess}
                onFailure={(res) => {console.log(res)}}
                className="google-login-button"
                scope={config.scope}
                cookiePolicy={"single_host_origin"}
              />
            </>
          )}
        </div>
      )}
      <Modal
        title={
          <Header level={3} className={styles.modal}>
            {`Add `}
            {toAddActivityIndex !== -1 ? (
              <a
                href={googleActivity[toAddActivityIndex]?.alternateLink}
                target="_blank"
                rel="noreferrer"
                title={googleActivity[toAddActivityIndex]?.title}
              >
                <Header level={3} className={styles.highlight}>
                  {googleActivity[toAddActivityIndex]?.title}
                </Header>
              </a>
            ) : (
              ""
            )}
            {` to activity`}
          </Header>
        }
        visible={visibleModal}
        okText="Confirm"
        onOk={() => {
          addToActivityForm
            .validateFields()
            .then((value) => {
              addToActivityForm.resetFields();
              addToActivity(value);
            })
            .catch((info) => {
              console.log("Validate Failed", info);
            });
        }}
        okButtonProps={{ htmlType: "submit" }}
        onCancel={() => {
          addToActivityForm.resetFields();
          onCancelAddToActivity();
        }}
        width="400px"
      >
        <Form
          form={addToActivityForm}
          name="AddToActivityForm"
          layout="vertical"
          autoComplete="off"
          requiredMark={"required"}
        >
          <Form.Item name="clos" label="Description">
            <Body level={4} className={styles.modalDescription}>
              {(toAddActivityIndex !== -1 && googleActivity[toAddActivityIndex]?.description) ||
                "-"}
            </Body>
          </Form.Item>
          <Form.Item name="clos" label="Max Score">
            <Body level={4}>
              {(toAddActivityIndex !== -1 && googleActivity[toAddActivityIndex]?.maxPoints) || "-"}
            </Body>
          </Form.Item>
          <Form.Item name="clos" label="Select CLOs" rules={[{ required: true }]}>
            <Select
              defaultValue={[]}
              mode="multiple"
              showSearch
              placeholder="Select CLOs"
              style={{ width: "350px" }}
            >
              {cloList.map((ele) => (
                <Option key={ele.clo_id} value={ele.clo_id}>
                  {ele.order_number + " " + ele.detail}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="allowImportStudentScore" valuePropName="checked">
            <Checkbox>Allow import student score</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassroomTab;
