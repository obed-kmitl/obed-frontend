import styles from "./Home.module.scss";
import { Helmet } from "react-helmet";
import {
  Body,
  CourseCard,
  Header,
  Select,
  Option,
  Input,
} from "../../components";
import { Divider, Empty } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSectionContext } from "../../contexts/SectionContext";
import httpClient from "../../utils/httpClient";

export const Home = () => {
  const [filterSelected, setFilterSelected] = useState();
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const { setSection } = useSectionContext();

  async function fetchCourse() {
    const seen = new Set();
    return await httpClient
      .get(`/semester/getSectionByTeacher`)
      .then((response) => {
        if (response.data.data.length > 0) {
          const allSemester = response.data.data[0].sections
            .map((e) => ({
              semester_id: e.semester_id,
              year: e.year_number,
              semester: e.semester_number,
              ended: false,
              courses: [],
            }))
            .filter((el) => {
              const duplicate = seen.has(el.semester_id);
              seen.add(el.semester_id);
              return !duplicate;
            })
            .sort(
              ({ semester_id: first }, { semester_id: second }) =>
                first - second
            );

          allSemester.forEach((semester) => {
            response.data.data[0].sections.forEach((course) => {
              if (course.semester_id === semester.semester_id) {
                semester.courses.push({
                  id: course.section_id,
                  course_id: course.course_number,
                  course_name_th: course.course_name_th,
                  course_name_en: course.course_name_en,
                  section: course.section_number,
                  year: course.year_number,
                  semester: course.semester_number,
                });
              }
            });
          });
          setFilteredCourse(allSemester);
          setAllCourse(allSemester.reverse());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function search(kw) {
    let keyword = kw.trim();
    if (keyword !== "") {
      const results = allCourse.map((element) => {
        return {
          ...element,
          courses: element.courses.filter((subElement) => {
            return (
              subElement.course_id
                .toLowerCase()
                .includes(keyword.toLowerCase()) ||
              subElement.course_name_en
                .toLowerCase()
                .includes(keyword.toLowerCase()) ||
              subElement.course_name_th.includes(keyword)
            );
          }),
        };
      });
      setFilteredCourse(results);
    } else {
      setFilteredCourse(allCourse.reverse());
    }
  }

  useEffect(() => {
    fetchCourse();
  }, []);

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
            onChange={(value) =>
              setFilterSelected(
                value
                  ? [
                      parseInt(value.split("/")[0]),
                      parseInt(value.split("/")[1]),
                    ]
                  : value
              )
            }
            style={{ width: "100px" }}
            defaultValue={"All"}
          >
            <Option value={undefined}>All</Option>
            {allCourse.map((e) => (
              <Option
                value={e.semester + "/" + e.year}
                key={e.semester + "/" + e.year}
              >
                {e.semester + "/" + e.year}
              </Option>
            ))}
          </Select>
          <Input search placeholder="Search" onSearch={search} allowClear />
        </div>
      </div>
      {filteredCourse.length === 0 ? (
        <Empty
          style={{
            marginTop: "100px",
            color: "#c3c3c4",
            fontSize: "20px",
            fontWeight: "500",
          }}
          imageStyle={{ height: 100 }}
          description="No course found. Contact administrator if your course is not showing."
        />
      ) : (
        filteredCourse
          .filter((item) => {
            if (filterSelected) {
              return (
                item.semester === filterSelected[0] &&
                item.year === filterSelected[1]
              );
            } else {
              return item;
            }
          })
          .map((semesterCourse, index) => (
            <div key={semesterCourse.year + "/" + semesterCourse.semester}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "1rem 0",
                }}
              >
                <Header level={2}>
                  {semesterCourse.semester}
                  {"/"}
                  {semesterCourse.year}
                </Header>
                <Divider style={{ minWidth: "0", marginLeft: "8px" }} />
              </div>
              <div className={styles.cards}>
                {semesterCourse.courses.map((course, i) => (
                  <div
                    onClick={() => {
                      setSection(course.id)
                    }}
                    className={styles.card}
                    key={course.id}
                  >
                    <Link to={`/overview`}>
                      <CourseCard
                        details={course}
                        ended={false}
                        key={index + i}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  );
};
