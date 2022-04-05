import styles from "./AdminGraph.module.scss";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Divider, Select, Empty, Spin } from "antd";
import { Header, Option } from "../../components";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

import { useAdminGraph } from "./hooks/useAdminGraph";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartTooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      min: 0,
    },
  },
  ticks: {
    stepSize: 20,
  },
};

let cohortList = [];
for (let i = 61; i <= new Date().getFullYear() - 1957; i++) {
  cohortList.push(i);
}

export function AdminGraph({ page }) {
  const {
    getCurriculumList,
    getPLOSummaryByCourseAndSemester,
    getPLOSummaryByStudentNumberAndCurriculum,
    getPLOSummaryByCohortAndCurriculum,
    getPLOSummaryByCurriculum,
    getCourseDropdown,
    getSemesterDropdown,
    getStudentDropdown,
  } = useAdminGraph();
  const [curriculumList, setCurriculumList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [curriculumGraphData, setCurriculumGraphData] = useState(null);
  const [subjectGraphData, setSubjectGraphData] = useState(null);
  const [cohortGraphData, setCohortGraphData] = useState(null);
  const [studentGraphData, setStudentGraphData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState({
    curriculum: "",
    semester: "",
    subject: "",
    number: "",
  });
  const [selectedCohort, setSelectedCohort] = useState({
    curriculum: "",
    cohort: "",
  });
  const [selectedStudent, setSelectedStudent] = useState({
    curriculum: "",
    studentId: "",
  });

  useEffect(() => {
    getCurriculumList().then((data) => {
      setCurriculumList(data);
    });
  }, [page]);

  useEffect(() => {
    if (selectedSubject.subject !== "") {
      setIsLoading(true);
      getPLOSummaryByCourseAndSemester(
        selectedSubject.subject,
        selectedSubject.semester
      )
        .then((data) => {
          setSubjectGraphData({
            labels: data.map((ele) => ele.order_number),
            datasets: [
              {
                label: selectedSubject.number,
                data: data.map((ele) => ele.percent),
                backgroundColor: "rgba(0, 159, 199, 0.2)",
                borderColor: "rgba(0, 159, 199, 1)",
                borderWidth: 1,
              },
            ],
          });
        })
        .catch(() => {
          setSubjectGraphData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedCohort.cohort !== "") {
      setIsLoading(true);
      getPLOSummaryByCohortAndCurriculum(
        selectedCohort.curriculum,
        selectedCohort.cohort
      )
        .then((data) => {
          setCohortGraphData({
            labels: data.map((ele) => ele.order_number),
            datasets: [
              {
                label: selectedCohort.cohort,
                data: data.map((ele) => ele.percent),
                backgroundColor: "rgba(0, 159, 199, 0.2)",
                borderColor: "rgba(0, 159, 199, 1)",
                borderWidth: 1,
              },
            ],
          });
        })
        .catch(() => {
          setCohortGraphData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedCohort]);

  useEffect(() => {
    if (selectedStudent.curriculum !== "") {
      setIsLoading(true);
      getPLOSummaryByCurriculum(selectedStudent.curriculum)
        .then((data) => {
          setCurriculumGraphData({
            label: "Curriculum Average",
            data: data.map((ele) => ele.percent),
            backgroundColor: "rgba(0, 159, 199, 0.2)",
            borderColor: "rgba(0, 159, 199, 1)",
            borderWidth: 1,
          });
        })
        .catch(() => {
          setCurriculumGraphData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedStudent.curriculum]);

  useEffect(() => {
    if (selectedStudent.studentId !== "") {
      setIsLoading(true);
      getPLOSummaryByStudentNumberAndCurriculum(
        selectedStudent.curriculum,
        selectedStudent.studentId
      )
        .then((data) => {
          setStudentGraphData({
            labels: data.map((ele) => ele.order_number),
            datasets: [
              curriculumGraphData,
              {
                label: selectedStudent.studentId,
                data: data.map((ele) => ele.percent),
                backgroundColor: "rgba(247, 148, 29, 0.2)",
                borderColor: "rgba(247, 148, 29, 1)",
                borderWidth: 1,
              },
            ],
          });
        })
        .catch(() => {
          setStudentGraphData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedStudent.studentId]);

  return (
    <>
      <Helmet>
        <title>Report - OBED</title>
      </Helmet>
      {page === "subject" && (
        <div>
          <div className={styles.head}>
            <Header level={1} className={styles.header}>
              <Link to="/summary" className={styles.backBtn} title="Back">
                <LeftOutlined />
              </Link>
              Assesment Report by Course
            </Header>
          </div>
          <Divider />
          <div className={styles.filterWrap}>
            <Header level={3}>Curriculum</Header>
            <Select
              placeholder="Curriculum"
              onChange={(value) => {
                setSelectedSubject({
                  ...selectedSubject,
                  curriculum: value,
                });
                getSemesterDropdown(value).then((data) => {
                  setSemesterList(data);
                });
              }}
              style={{ width: "260px" }}
              defaultValue={null}
            >
              <Option value={null} disabled>
                None
              </Option>
              {curriculumList.map((e) => (
                <Option value={e.curriculum_id} key={e.curriculum_id}>
                  {e.title}
                </Option>
              ))}
            </Select>
            <Header level={3}>Semester</Header>
            <Select
              placeholder="Semester"
              onChange={(value) => {
                setSelectedSubject({
                  ...selectedSubject,
                  semester: value,
                });
                getCourseDropdown(value).then((data) => {
                  setCourseList(data);
                });
              }}
              style={{ width: "180px" }}
              defaultValue={null}
              disabled={selectedSubject.curriculum === ""}
            >
              <Option value={null} disabled>
                None
              </Option>
              {semesterList.map((e) => (
                <Option value={e.id} key={e.label}>
                  {e.label}
                </Option>
              ))}
            </Select>
            <Header level={3}>Course</Header>
            <Select
              placeholder="Course"
              onChange={(value) => {
                setSelectedSubject({
                  ...selectedSubject,
                  subject: value[1],
                  number: value[0],
                });
              }}
              style={{ width: "180px" }}
              defaultValue={null}
              showSearch
              disabled={
                selectedSubject.curriculum === "" ||
                selectedSubject.semester === ""
              }
            >
              <Option value={null} disabled>
                None
              </Option>
              {courseList.map((e) => (
                <Option value={[e.label, e.id]} key={e.label}>
                  {e.label}
                </Option>
              ))}
            </Select>
          </div>
          <Spin spinning={isLoading}>
            <div className={styles.graphWrap}>
              {subjectGraphData ? (
                <Radar data={subjectGraphData} options={options} />
              ) : (
                <Empty
                  style={{
                    margin: "50px",
                    color: "#c3c3c4",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  imageStyle={{ height: 100 }}
                  description="Please select course"
                />
              )}
            </div>
          </Spin>
        </div>
      )}
      {page === "cohort" && (
        <div>
          <div className={styles.head}>
            <Header level={1} className={styles.header}>
              <Link to="/summary" className={styles.backBtn} title="Back">
                <LeftOutlined />
              </Link>
              Curriculum Assesment Report by Cohort
            </Header>
          </div>
          <Divider />
          <div className={styles.filterWrap}>
            <Header level={3}>Curriculum</Header>
            <Select
              placeholder="Curriculum"
              onChange={(value) => {
                setSelectedCohort({
                  ...selectedCohort,
                  curriculum: value,
                });
              }}
              style={{ width: "260px" }}
              defaultValue={null}
            >
              <Option value={null} disabled>
                None
              </Option>
              {curriculumList.map((e) => (
                <Option value={e.curriculum_id} key={e.curriculum_id}>
                  {e.title}
                </Option>
              ))}
            </Select>
            <Header level={3}>Class of</Header>
            <Select
              placeholder="Class of"
              onChange={(value) => {
                setSelectedCohort({
                  ...selectedCohort,
                  cohort: value,
                });
              }}
              style={{ width: "180px" }}
              defaultValue={null}
              disabled={selectedCohort.curriculum === ""}
            >
              <Option value={null} disabled>
                None
              </Option>
              {cohortList?.map((e) => (
                <Option value={e} key={e}>
                  {e}
                </Option>
              ))}
            </Select>
          </div>
          <Spin spinning={isLoading}>
            <div className={styles.graphWrap}>
              {cohortGraphData ? (
                <Radar data={cohortGraphData} options={options} />
              ) : (
                <Empty
                  style={{
                    margin: "50px",
                    color: "#c3c3c4",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  imageStyle={{ height: 100 }}
                  description="Please select cohort"
                />
              )}
            </div>
          </Spin>
        </div>
      )}
      {page === "student" && (
        <div>
          <div className={styles.head}>
            <Header level={1} className={styles.header}>
              <Link to="/summary" className={styles.backBtn} title="Back">
                <LeftOutlined />
              </Link>
              Student Report
            </Header>
          </div>
          <Divider />
          <div className={styles.filterWrap}>
            <Header level={3}>Curriculum</Header>
            <Select
              placeholder="Curriculum"
              onChange={(value) => {
                setSelectedStudent({
                  ...selectedStudent,
                  curriculum: value,
                });
                getStudentDropdown(value).then((data) => {
                  setStudentList(data);
                });
              }}
              style={{ width: "260px" }}
              defaultValue={null}
            >
              <Option value={null} disabled>
                None
              </Option>
              {curriculumList.map((e) => (
                <Option value={e.curriculum_id} key={e.curriculum_id}>
                  {e.title}
                </Option>
              ))}
            </Select>
            <Header level={3}>Student ID</Header>
            <Select
              placeholder="Student ID"
              onChange={(value) => {
                setSelectedStudent({
                  ...selectedStudent,
                  studentId: value,
                });
              }}
              style={{ width: "180px" }}
              defaultValue={null}
              showSearch
              disabled={selectedStudent.curriculum === ""}
            >
              <Option value={null} disabled>
                None
              </Option>
              {studentList.map((e) => (
                <Option value={e.value} key={e.value}>
                  {e.value}
                </Option>
              ))}
            </Select>
          </div>
          <Spin spinning={isLoading}>
            <div className={styles.graphWrap}>
              {studentGraphData ? (
                <Radar data={studentGraphData} options={options} />
              ) : (
                <Empty
                  style={{
                    margin: "50px",
                    color: "#c3c3c4",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  imageStyle={{ height: 100 }}
                  description="Please select student"
                />
              )}
            </div>
          </Spin>
        </div>
      )}
    </>
  );
}
