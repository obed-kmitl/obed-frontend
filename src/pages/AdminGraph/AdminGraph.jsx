import styles from "./AdminGraph.module.scss";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Divider, Select } from "antd";
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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartTooltip,
  Legend
);

const curriculum = [
  {
    curriculum_id: 1,
    title: "วิศวกรรมคอมพิวเตอร์ 2564",
  },
  {
    curriculum_id: 2,
    title: "วิศวกรรมคอมพิวเตอร์ 2560",
  },
];

const semester = [
  {
    id: 1,
    title: "2/2564",
  },
  {
    id: 2,
    title: "1/2564",
  },
  {
    id: 3,
    title: "3/2563",
  },
];

const subject = [
  {
    id: "01076001",
    title: "Introduction to Computer Engineering",
  },
  {
    id: "01076002",
    title: "Programming Fundamentals",
  },
];

const classes = ["65", "64", "63", "62", "61"];

const student = [
  {
    id: "61010001",
    fullname: "สมชาย ใจดี",
  },
  {
    id: "61010002",
    fullname: "สมหญิง จริงใจ",
  },
];

const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    r: {
      beginAtZero: true,
    },
  },
  ticks: {
    stepSize: 20,
  },
};

const data = {
  labels: ["1.1", "1.2", "2.1", "3.1", "6.1"],
  datasets: [
    {
      label: "Label 1",
      data: [80, 56, 77, 68, 75],
      backgroundColor: "rgba(0, 159, 199, 0.2)",
      borderColor: "rgba(0, 159, 199, 1)",
      borderWidth: 1,
    },
  ],
};

const data2 = {
  labels: ["PLO1", "PLO2", "PLO3", "PLO4", "PLO5"],
  datasets: [
    {
      label: "Label 1",
      data: [80, 56, 77, 68, 75],
      backgroundColor: "rgba(0, 159, 199, 0.2)",
      borderColor: "rgba(0, 159, 199, 1)",
      borderWidth: 1,
    },
    {
      label: "Label 2",
      data: [82, 68, 79, 81, 60],
      backgroundColor: "rgba(247, 148, 29, 0.2)",
      borderColor: "rgba(247, 148, 29, 1)",
      borderWidth: 1,
    },
  ],
};

export function AdminGraph({ page }) {
  const [selectedSubject, setSelectedSubject] = useState({
    curriculum: "",
    semester: "",
    subject: "",
  });
  const [selectedCohort, setSelectedCohort] = useState({
    curriculum: "",
    cohort: "",
  });
  const [selectedStudent, setSelectedStudent] = useState({
    curriculum: "",
    studentId: "",
  });

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
              Assesment Report by Subject
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
              }}
              style={{ width: "260px" }}
              defaultValue={null}
              value={selectedSubject?.curriculum.curriculum_id}
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
            <Header level={3}>Semester</Header>
            <Select
              placeholder="Semester"
              onChange={(value) => {
                setSelectedSubject({
                  ...selectedSubject,
                  semester: value,
                });
              }}
              style={{ width: "180px" }}
              defaultValue={null}
              value={selectedSubject?.semester?.id}
            >
              <Option value={null} disabled>
                None
              </Option>
              {semester.map((e) => (
                <Option value={e.id} key={e.id}>
                  {e.title}
                </Option>
              ))}
            </Select>
            <Header level={3}>Subject</Header>
            <Select
              placeholder="Subject"
              onChange={(value) => {
                setSelectedSubject({
                  ...selectedSubject,
                  subject: value,
                });
              }}
              style={{ width: "180px" }}
              defaultValue={null}
              value={selectedSubject?.subject?.id}
              showSearch
            >
              <Option value={null} disabled>
                None
              </Option>
              {subject.map((e) => (
                <Option value={e.id} key={e.id}>
                  {e.id}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.graphWrap}>
            <Radar data={data} options={options} />
          </div>
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
              value={selectedCohort?.curriculum?.curriculum_id}
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
            >
              <Option value={null} disabled>
                None
              </Option>
              {classes.map((e) => (
                <Option value={e} key={e}>
                  {e}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.graphWrap}>
            <Radar data={data} options={options} />
          </div>
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
              }}
              style={{ width: "260px" }}
              defaultValue={null}
              value={selectedCohort?.curriculum?.curriculum_id}
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
            >
              <Option value={null} disabled>
                None
              </Option>
              {student.map((e) => (
                <Option value={e.id} key={e.id}>
                  {e.id}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.graphWrap}>
            <Radar data={data2} options={options} />
          </div>
        </div>
      )}
    </>
  );
}
