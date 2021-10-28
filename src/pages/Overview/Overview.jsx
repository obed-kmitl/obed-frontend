//import { useParams } from "react-router-dom";
import styles from "../Overview/Overview.module.scss"
import { Helmet } from "react-helmet";
import { Body, Button, Header } from "../../components";
import { Divider, Typography, Modal, Popconfirm } from "antd";
import {
  EditOutlined,
  LinkOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  SyncOutlined
} from "@ant-design/icons";
import googleClassroomLogo from "../../assets/img/logo_google_classroom.svg"
import { useState } from "react";
import { useGoogleClassroom } from "./hooks/useGoogleClassroom";

const mockCourse =
{
  id: "1",
  course_id: "01076001",
  course_name_th: "วิศวกรรมคอมพิวเตอร์เบื้องต้น",
  course_name_en: "Introduction to Computer Engineering",
  section: "1",
  year: "2021",
  semester: "1",
  prerequisite_id: "01076002",
  prerequisite_name: "Programming Fundamental",
  teacher: [
    {
      id: 1,
      prefix: "อ.",
      firstname: "สมชาย",
      lastname: "สบายดี",
      username: "somchai15",
      email: "somchai12@obed.com",
    },
    {
      id: 2,
      prefix: "ผศ.",
      firstname: "สมศักดิ์",
      lastname: "พักผ่อน",
      username: "somsak77",
      email: "somsak77@obed.com",
    }
  ]
}
const GoogleClassroomCard = ({ name, code, selected, hasAction, handleChangeGClass, handleDeleteGClass }) => {

  return (
    selected === false ?
      <div className={styles.card} >
        <div className={styles.flexrow}>
          <Header level={1}>{name}</Header><LinkOutlined className={styles.linkicon} />
        </div>
        <Body level={2} >{code}</Body>
      </div> :
      <div className={styles.selectedCard} >
        <div className={styles.flexrowspace}>
          <div>
            <div className={styles.flexrow}>
              <Header level={1}>{name}</Header><LinkOutlined className={styles.linkicon} />
            </div><Body level={2} >{code}</Body>
          </div>
          {hasAction === true ?
            <div className={styles.cardaction}>
              <Typography.Link
                style={{ fontSize: "20px", color: "#FFFFFF" }}
                onClick={() => handleChangeGClass()}
              >
                <SyncOutlined />
              </Typography.Link>
              <Popconfirm
                title="Are you sure to remove linked Google Classroom course?"
                onConfirm={handleDeleteGClass}
                //onCancel={cancel}
                okText="Yes"
                cancelText="No">
                <Typography.Link
                  style={{ fontSize: "20px", color: "#FFFFFF" }}
                  //onClick={() => handleDeleteGClass()}
                >
                  <DeleteOutlined />
                </Typography.Link>
              </Popconfirm>
            </div>
            :
            <CheckCircleFilled className={styles.checkicon} />
          }
        </div>
      </div>
  )
}

export const Overview = () => {
  //let { sectionId } = useParams();
  const [course, setCourse] = useState(mockCourse);
  const [
    allGClass,
    selectedGClass,
    ggClassroomVisible,
    handleAddGClass,
    handleOk,
    handleCancel,
    handleCardClick,
    linkedGClass,
    handleChangeGClass,
    changeCard,
    handleDeleteGClass
  ] = useGoogleClassroom()


  return (
    <div className={styles.overview}>
      <Helmet>
        <title>{course.course_id} Overview - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Overview</Header>
      </div>
      <Divider />
      <div className={styles.details}>
        <div className={styles.flexrow}>
          <Header level={2}>Class Infomation</Header>
          <Typography.Link
            style={{ fontSize: "20px" }}
          >
            <EditOutlined />
          </Typography.Link>
        </div>
        <table className={styles.table}>
          <tr>
            <td style={{ width: "20%", minWidth: "200px" }}>
              <Header level={5}>Course Id</Header>
            </td>
            <td><Body level={2}>{course.course_id}</Body></td>
          </tr>
          <tr>
            <td><Header level={5}>Section</Header></td>
            <td><Body level={2}>{course.section}</Body></td>
          </tr>
          <tr>
            <td><Header level={5}>Course Name (EN)</Header></td>
            <td><Body level={2}>{course.course_name_en}</Body></td>
          </tr>
          <tr>
            <td><Header level={5}>Course Name (TH)</Header></td>
            <td><Body level={2}>{course.course_name_th}</Body></td>
          </tr>
          <tr className={styles.nestTableTitle}>
            <td><Header level={5}>Instructor</Header></td>
            <td>
              {course.teacher.map((teacher) =>
                <tr><Body level={2}>{teacher.prefix}{teacher.firstname}{" "}{teacher.lastname}</Body></tr>
              )}
            </td>
          </tr>
          <tr>
            <td><Header level={5}>Pre-Requisite</Header></td>
            <td><Body level={2}>{course.prerequisite_id}{" "}{course.prerequisite_name}</Body></td>
          </tr>
          <tr className={styles.nestTableTitle}>
            <td><Header level={5}>Google Classroom</Header></td>
            <td style={{ verticalAlign: "bottom" }}>
              {linkedGClass === null ?
                <Button className={styles.googleClassroomBtn} onClick={() => handleAddGClass()}>
                  <img
                    src={googleClassroomLogo}
                    alt="google classroom"
                    className={styles.logo}
                  />
                  Import Course from Google Classroom
                </Button> :
                <div>
                  <div className={styles.flexrow}>
                    <GoogleClassroomCard
                      name={linkedGClass.googleClassroom_name}
                      code={linkedGClass.googleClassroom_code}
                      key={linkedGClass.id}
                      selected={true}
                      hasAction={true}
                      handleChangeGClass={handleChangeGClass}
                      handleDeleteGClass={handleDeleteGClass}
                    />
                  </div>
                </div>
              }
            </td>
          </tr>
        </table>
      </div>
      <Modal
        title={changeCard ? "Change Course" : "Choose Course"}
        visible={ggClassroomVisible}
        onOk={handleOk}
        onCancel={() => handleCancel(changeCard)}
        width="768px"
      >
        <div className={styles.cardList}>
          {allGClass.map((course) =>
            <div onClick={() => handleCardClick(course.id)}>
              <GoogleClassroomCard
                name={course.googleClassroom_name}
                code={course.googleClassroom_code}
                key={course.id}
                selected={course.id === selectedGClass}
              />
            </div>
          )
          }
        </div>
      </Modal>

    </div>
  );
};
