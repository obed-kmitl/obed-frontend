import styles from "./Home.module.scss";
import { Helmet } from "react-helmet";
import { Body, CourseCard, Header, Select, Option, Input } from "../../components";
import { Divider } from "antd"
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SectionContext from "../../contexts/SectionContext";
import httpClient from "../../utils/httpClient";

const courseList = [
  {
    year: "2021",
    semester: "1",
    ended: false,
    courses: [
      {
        id: "1",
        course_id: "01076001",
        course_name_th: "วิศวกรรมคอมพิวเตอร์เบื้องต้น",
        course_name_en: "Introduction to Computer Engineering",
        section: "1",
        year: "2021",
        semester: "1",
      },
      {
        id: "2",
        course_id: "01076002",
        course_name_th: "พื้นฐานการเขียนโปรแกรมคอมพิวเตอร์",
        course_name_en: "Programming Fundamental",
        section: "1",
        year: "2021",
        semester: "1",
      },
      {
        id: "3",
        course_id: "01076003",
        course_name_th: "วงจรไฟฟ้าและอิเล็กทรอนิกส์",
        course_name_en: "Circuits and Electronics",
        section: "1",
        year: "2021",
        semester: "1",
      },
      {
        id: "4",
        course_id: "01076004",
        course_name_th: "การเขียนโปรแกรมเชิงวัตถุ",
        course_name_en: "Object Oriented Programming",
        section: "1",
        year: "2021",
        semester: "1",
      },
      {
        id: "5",
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
    ended: true,
    courses: [
      {
        id: "6",
        course_id: "01076001",
        course_name_th: "วิศวกรรมคอมพิวเตอร์เบื้องต้น",
        course_name_en: "Introduction to Computer Engineering",
        section: "1",
        year: "2020",
        semester: "2",
      },
      {
        id: "7",
        course_id: "01076002",
        course_name_th: "พื้นฐานการเขียนโปรแกรมคอมพิวเตอร์",
        course_name_en: "Programming Fundamental",
        section: "1",
        year: "2020",
        semester: "2",
      },
      {
        id: "8",
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
    ended: true,
    courses: [
      {
        id: "9",
        course_id: "01076004",
        course_name_th: "การเขียนโปรแกรมเชิงวัตถุ",
        course_name_en: "Object Oriented Programming",
        section: "1",
        year: "2020",
        semester: "1",
      },
      {
        id: "10",
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
  const [filterSelected, setFilterSelected] = useState()
  const [filteredCourse, setFilteredCourse] = useState(courseList)
  const { setSection } = useContext(SectionContext)

  async function fetchCourse() {
    const seen = new Set();
    return await httpClient
      .get(`/semester/getSectionByTeacher`)
      .then((response) => {
        console.log(response.data.data[0].sections)
        const allSemester = response.data.data[0].sections.map((e) =>
        ({
          semester_id: e.semester_id,
          year: e.year_number,
          semester: e.semester_number,
          ended: false,
          courses: []
        })).filter(el => {
          const duplicate = seen.has(el.semester_id);
          seen.add(el.semester_id);
          return !duplicate;
        }).sort(({ semester_id: first }, { semester_id: second }) => first - second);

        allSemester.forEach(semester => {
          response.data.data[0].sections.forEach(course => {
            if (course.semester_id === semester.semester_id) {
              semester.courses.push({
                id: course.section_id,
                course_id: course.course_number,
                course_name_th: course.course_name_th,
                course_name_en: course.course_name_en,
                section: course.section_number,
                year: course.year_number,
                semester: course.semester_number,
              })
            }
          })
        })
        setFilteredCourse(allSemester.reverse())

      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log(filteredCourse)
  }, [filteredCourse])


  function search(keyword) {
    if (keyword !== "") {
      const results = courseList.map((element) => {
        return {
          ...element,
          courses: element.courses.filter((subElement) => {
            return (
              subElement.course_id.toLowerCase().includes(keyword.toLowerCase()) ||
              subElement.course_name_en.toLowerCase().includes(keyword.toLowerCase()) ||
              subElement.course_name_th.includes(keyword)
            )
          })
        }
      })
      setFilteredCourse(results);
    } else {
      setFilteredCourse(courseList);
    }
  }

  useEffect(() => {
    fetchCourse()
    //console.log(user)
  }, [])

  return (
    <div className={styles.home}>
      <Helmet>
        <title>Course - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Course</Header>
        <div className={styles.filterbox}>
          <Body level={2}>Semester</Body>
          <Select
            placeholder="Semester"
            onChange={(value) => setFilterSelected(value ? [value.split("/")[0], value.split("/")[1]] : value)}
            style={{ width: "100px" }}
            defaultValue={"All"}
          >
            <Option value={undefined}>
              All
            </Option>
            {courseList.map((e) => (
              <Option value={e.semester + "/" + e.year} key={e.semester + "/" + e.year}>
                {e.semester + "/" + e.year}
              </Option>
            ))}
          </Select>
          <Input
            search
            placeholder="Search"
            onSearch={search}
            allowClear
          />
        </div>
      </div>
      {filteredCourse.filter((item) => {
        if (filterSelected) {
          return item.semester === filterSelected[0] && item.year === filterSelected[1]
        } else {
          return item
        }
      }).map((semesterCourse) =>
        <div>
          <div style={{ display: "flex", alignItems: "center", margin: "1rem 0" }}>
            <Header level={2}>{semesterCourse.semester}{"/"}{semesterCourse.year}</Header>
            <Divider style={{ minWidth: "0", marginLeft: "8px" }} />
          </div>
          <div className={styles.cards}>
            {semesterCourse.courses.map((course) =>
              <div
                onClick={() => setSection(course.id)}
                className={styles.card}
              >
                <Link to={`${course.id}/overview`}>
                  <CourseCard details={course} ended={false} />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
