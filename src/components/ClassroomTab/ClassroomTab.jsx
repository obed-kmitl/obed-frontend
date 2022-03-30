import styles from "./ClassroomTab.module.scss";
import { GoogleLogin } from "react-google-login";
import config from "../../config";
import { Header, Body,Button } from "..";
import { useGoogleClassroom } from "./hooks/useGoogleClassroom";
import { Radio, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import googleClassroomLogo from "../../assets/img/logo_google_classroom.svg"

const ClassroomTab = () => {

  const {
    googleCode,
    allGClass,
    loginSuccessHandle,
    selectedCourse,
    setSelectedCourse,
    onCourseChange,
    googleActivity
  } = useGoogleClassroom()

  return (
    <div className={styles.classroomTab}>

      {googleCode ?
        selectedCourse ?
          <div className={styles.flexcol}>
            <div className={styles.backBtn} onClick={() => setSelectedCourse(undefined)} title="Back" style={{ color: "#f7941d" }} >
              <LeftOutlined /> Back
            </div>
            <Header level={2}>{selectedCourse.googleClassroom_name}'s Activity</Header>
            {
              googleActivity.map((activity) =>
                <div className={styles.card}>
                    <img
                      src={googleClassroomLogo}
                      alt="google classroom"
                      className={styles.logo}
                    />
                  <div className={styles.detail}>
                    <div className={styles.content}>
                      <div className={styles.titleBox}>
                        <Header level={3} className={styles.title}>{activity.title}</Header>
                      </div>
                      <Body level={2} className={styles.description}>{activity.detail}</Body>
                    </div>
                    
                        <Button>Add to Activity</Button>
                    
                  </div>
                </div >
              )
            }
          </div>
          :
          <>
            <div className={styles.flexrow}>
              <Header level={2}>Google Classroom</Header>
              <Body level={2}>CODE: {googleCode}</Body>
            </div>
            <br />
            <div className={styles.flexcol}>
              <Header level={4}>Select Course</Header>
              <br/>
              <Radio.Group onChange={onCourseChange} value={selectedCourse} buttonStyle="solid">
                <Space wrap>
                  {allGClass.map((course) =>
                    <Radio.Button value={course} className={styles.courseselect}>
                      <div className={styles.course}>
                        <Body level={4}>{course.googleClassroom_code}</Body>
                        <Body level={1}>{course.googleClassroom_name}</Body>
                      </div>
                    </Radio.Button>
                  )}
                </Space>
              </Radio.Group>
            </div>
          </>
        :
        <>
          <Header level={4}>Google classroom</Header>
          <br />
          To Add Course from Google Classroom, Please Login with your google classroom account.
          <br />
          <br />
          <GoogleLogin
            clientId={config.googleClientId}
            buttonText="Login with google account"
            onSuccess={loginSuccessHandle}
            accessType="offline"
            responseType="code"
            // onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </>
      }
    </div>
  );
};

export default ClassroomTab;
