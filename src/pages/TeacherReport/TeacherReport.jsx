import styles from "./TeacherReport.module.scss";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Radar } from "react-chartjs-2";
import { Divider, Select } from "antd";
import { Header, Option } from "../../components";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { TeacherReportForm, ReportTable } from "../../components";
import { useTeacherReport } from "./hooks/useTeacherReport";
import { useStudent } from "../Student/hooks/useStudent";
import { useSectionContext } from "../../contexts/SectionContext";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartTooltip,
  Legend
);

export function TeacherReport() {
  const [selectedId, setSelectedId] = useState("");
  const { fetchStudents } = useStudent();
  const { getPLOSummaryBySection, getPLOSummaryByStudentAndSection } =
    useTeacherReport();
  const { section } = useSectionContext();
  const [students, setStudents] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [studentGraph, setStudentGraph] = useState([]);
  const [selectedVal, setSelectedVal] = useState("[]");

  function handleChange(value) {
    const parsedValue = JSON.parse(value);
    setSelectedVal(value);
    setSelectedId(parsedValue[0]);
  }

  const options = {
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

  const data = {
    labels: graphData.map((each) => each.order_number),
    datasets: [
      {
        label: "Class Average",
        data: graphData.map((each) => each.percent),
        backgroundColor: "rgba(0, 159, 199, 0.2)",
        borderColor: "rgba(0, 159, 199, 1)",
        borderWidth: 1,
      },
      selectedId && {
        label: selectedId,
        data: studentGraph.map((each) => each.percent),
        backgroundColor: "rgba(247, 148, 29, 0.2)",
        borderColor: "rgba(247, 148, 29, 1)",
        borderWidth: 1,
      },
    ],
  };

  function fetchStudentGraph(studentId) {
    getPLOSummaryByStudentAndSection(section, studentId).then((data) =>
      setStudentGraph(data)
    );
  }

  useEffect(() => {
    if (section) {
      fetchStudents(section).then((data) => {
        const newData = data.map((ele) => {
          return {
            label: ele.student_number,
            value: JSON.stringify([ele.student_number, ele.student_id]),
          };
        });
        setStudents(newData);
        setSelectedVal(newData[0].value);
      });
      getPLOSummaryBySection(section).then((data) => setGraphData(data));
    }
  }, [section]);

  useEffect(() => {
    const parseVal = JSON.parse(selectedVal);
    if (parseVal[1]) {
      fetchStudentGraph(parseVal[1]);
      setSelectedId(parseVal[0]);
    }
  }, [selectedVal]);

  return (
    <div>
      <Helmet>
        <title>Report - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Report</Header>
      </div>
      <Divider />
      <div className={styles.summary}>
        <div className={styles.top}>
          <Header level={2}>Learning Outcome by PLO (%)</Header>
          <div className={styles.selectWrap}>
            <Header level={3}>Compare with</Header>
            <Select
              className="select-student-id"
              style={{ width: "160px" }}
              value={selectedVal}
              onChange={handleChange}
              showSearch
              options={students}
            />
          </div>
        </div>
        <div>
          <Radar width={600} data={data} options={options} />
        </div>
      </div>
      <TeacherReportForm />
      <ReportTable />
    </div>
  );
}
