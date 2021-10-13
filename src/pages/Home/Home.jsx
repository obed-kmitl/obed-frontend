import styles from "./Home.module.scss";
import { Helmet } from "react-helmet";
import { CourseCard, Header } from "../../components";
import { Divider, message ,Typography} from "antd"
const courseList = [
  {
    year: "2021",
    semester: "1",
    courses: [
      {
        key: "1",
        course_id: "01076001",
        course_name_th: "วิศวกรรมคอมพิวเตอร์เบื้องต้น",
        course_name_en: "Introduction to Computer Engineering",
        section: "1",
        year: "2021",
        semester: "1",
      },
      {
        key: "2",
        course_id: "01076002",
        course_name_th: "พื้นฐานการเขียนโปรแกรมคอมพิวเตอร์",
        course_name_en: "Programming Fundamental",
        section: "1",
        year: "2021",
        semester: "1",
      },
      {
        key: "3",
        course_id: "01076003",
        course_name_th: "วงจรไฟฟ้าและอิเล็กทรอนิกส์",
        course_name_en: "Circuits and Electronics",
        section: "1",
        year: "2021",
        semester: "1",
      },
      {
        key: "4",
        course_id: "01076004",
        course_name_th: "การเขียนโปรแกรมเชิงวัตถุ",
        course_name_en: "Object Oriented Programming",
        section: "1",
        year: "2021",
        semester: "1",
      },
      {
        key: "5",
        course_id: "01076001",
        course_name_th: "วิศวกรรมคอมพิวเตอร์เบื้องต้น",
        course_name_en: "Introduction to Computer Engineering",
        section: "2",
        year: "2021",
        semester: "1",
      },
    ]
  },
  {
    year: "2020",
    semester: "2",
    courses: [
      {
        key: "1",
        course_id: "01076001",
        course_name_th: "วิศวกรรมคอมพิวเตอร์เบื้องต้น",
        course_name_en: "Introduction to Computer Engineering",
        section: "1",
        year: "2020",
        semester: "2",
      },
      {
        key: "2",
        course_id: "01076002",
        course_name_th: "พื้นฐานการเขียนโปรแกรมคอมพิวเตอร์",
        course_name_en: "Programming Fundamental",
        section: "1",
        year: "2020",
        semester: "2",
      },
      {
        key: "3",
        course_id: "01076003",
        course_name_th: "วงจรไฟฟ้าและอิเล็กทรอนิกส์",
        course_name_en: "Circuits and Electronics",
        section: "1",
        year: "2020",
        semester: "2",
      },
    ]
  },
  {
    year: "2020",
    semester: "1",
    courses: [
      {
        key: "1",
        course_id: "01076004",
        course_name_th: "การเขียนโปรแกรมเชิงวัตถุ",
        course_name_en: "Object Oriented Programming",
        section: "1",
        year: "2020",
        semester: "1",
      },
      {
        key: "2",
        course_id: "01076001",
        course_name_th: "วิศวกรรมคอมพิวเตอร์เบื้องต้น",
        course_name_en: "Introduction to Computer Engineering",
        section: "2",
        year: "2020",
        semester: "1",
      },
    ]
  }

];
export const Home = () => {
  return (
    <div className={styles.home}>
      <Helmet>
        <title>Home - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Course</Header>

      </div>
      {courseList.map((semesterCourse) =>
        <div>
          <div style={{ display: "flex", alignItems: "center", margin: "1rem 0" }}>
            <Header level={2}>{semesterCourse.semester}{"/"}{semesterCourse.year}</Header>
            <Divider style={{ minWidth: "0", marginLeft: "8px" }} />
          </div>
          <div className={styles.cards}>
            {semesterCourse.courses.map((course) =>
              <div
                onClick={() => message.success("click"+course.course_id)}
                className={styles.card}
              >
                <CourseCard details={course} />
              </div>

            )}
          </div>
        </div>
      )}

    </div>
  );
};
