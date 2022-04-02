import styles from "../Overview/Overview.module.scss"
import { Helmet } from "react-helmet";
import { Body, Header } from "../../components";
import { Divider } from "antd";
// import {
//   //EditOutlined,
//   LinkOutlined,
//   CheckCircleFilled,
//   DeleteOutlined,
//   SyncOutlined
// } from "@ant-design/icons";
// import googleClassroomLogo from "../../assets/img/logo_google_classroom.svg"
// import { useGoogleClassroom } from "./hooks/useGoogleClassroom";
import { useOverview } from "./hooks/useOverview";

// const GoogleClassroomCard = ({ name, code, selected, hasAction, handleChangeGClass, handleDeleteGClass }) => {

//   return (
//     selected === false ?
//       <div className={styles.card} >
//         <div className={styles.flexrow}>
//           <Header level={1}>{name}</Header><LinkOutlined className={styles.linkicon} />
//         </div>
//         <Body level={2} >{code}</Body>
//       </div>
//       :
//       <div className={styles.selectedCard} >
//         <div className={styles.flexrowspace}>
//           <div>
//             <div className={styles.flexrow}>
//               <Header level={1}>{name}</Header><LinkOutlined className={styles.linkicon} />
//             </div><Body level={2} >{code}</Body>
//           </div>
//           {hasAction === true ?
//             <div className={styles.cardaction}>
//               <Typography.Link
//                 style={{ fontSize: "20px", color: "#FFFFFF" }}
//                 onClick={() => handleChangeGClass()}
//               >
//                 <SyncOutlined />
//               </Typography.Link>
//               <Popconfirm
//                 title="Are you sure to remove linked Google Classroom course?"
//                 onConfirm={handleDeleteGClass}
//                 okText="Yes"
//                 cancelText="No">
//                 <Typography.Link
//                   style={{ fontSize: "20px", color: "#FFFFFF" }}
//                 >
//                   <DeleteOutlined />
//                 </Typography.Link>
//               </Popconfirm>
//             </div>
//             :
//             <CheckCircleFilled className={styles.checkicon} />
//           }
//         </div>
//       </div>
//   )
// }

export const Overview = () => {

  const { courseData } = useOverview()
  // const [
  //   allGClass,
  //   selectedGClass,
  //   ggClassroomVisible,
  //   handleAddGClass,
  //   handleOk,
  //   handleCancel,
  //   handleCardClick,
  //   linkedGClass,
  //   handleChangeGClass,
  //   changeCard,
  //   handleDeleteGClass
  // ] = useGoogleClassroom()


  const getThPrefix = {
    PROF_DR: "ศ.ดร.",
    PROF: "ศ.",
    ASSOC_PROF_DR: "รศ.ดร.",
    ASSOC_PROF: "รศ.",
    ASST_PROF_DR: "ผศ.ดร.",
    ASST_PROF: "ผศ.",
    DR: "ดร.",
    INSTRUCTOR: "อ.",
  };

  return (
    <div className={styles.overview}>
      <Helmet>
        <title>Overview - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Overview</Header>
      </div>
      <Divider />
      <div className={styles.details}>
        <div className={styles.flexrow}>
          <Header level={2}>Class Information</Header>
        </div>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td style={{ width: "20%", minWidth: "200px" }}>
                <Header level={5}>Course Id</Header>
              </td>
              <td><Body level={2}>{courseData?.course_number || ""}</Body></td>
            </tr>
            <tr>
              <td><Header level={5}>Section</Header></td>
              <td><Body level={2}>{courseData?.section_number || ""}</Body></td>
            </tr>
            <tr>
              <td><Header level={5}>Course Name (EN)</Header></td>
              <td><Body level={2}>{courseData?.course_name_en || ""}</Body></td>
            </tr>
            <tr>
              <td><Header level={5}>Course Name (TH)</Header></td>
              <td><Body level={2}>{courseData?.course_name_th || ""}</Body></td>
            </tr>
            <tr className={styles.nestTableTitle}>
              <td><Header level={5}>Instructor</Header></td>
              <td>
                {courseData?.teachers.map((teacher, i) =>
                  <div key={teacher.firstname + i}>
                    <Body level={2}>{getThPrefix[teacher.prefix]}{teacher.firstname}{" "}{teacher.lastname}</Body>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td><Header level={5}>Pre-Requisite</Header></td>
              <td>
                <Body level={2}>{
                  courseData?.pre_course.course_id === null ?
                    "None" :
                    (courseData?.pre_course.course_id || "") + " " +(courseData?.pre_course.course_name_en ||"" )
                }
                </Body>
              </td>
            </tr>
            {/* <tr className={styles.nestTableTitle}>
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
            </tr> */}
          </tbody>
        </table>
      </div>
      {/* <Modal
        title={changeCard ? "Change Course" : "Choose Course"}
        visible={ggClassroomVisible}
        onOk={handleOk}
        onCancel={() => handleCancel(changeCard)}
        width="768px"
      >
        <div className={styles.cardList}>
          {allGClass.map((course) =>
            <div onClick={() => handleCardClick(course.id)} key={course.id}>
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
      </Modal> */}

    </div>
  );
};
