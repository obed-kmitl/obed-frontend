import styles from "./TeacherReport.module.scss";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Radar } from "react-chartjs-2";
import {
  Divider,
  Select,
} from "antd";
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
import { TeacherReportForm } from "../../components";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartTooltip,
  Legend
);

const mockStudentId = [
  {
    id: "61010001",
  },
  {
    id: "61010002",
  },
  {
    id: "61010003",
  },
];

export function TeacherReport() {
  const [selectedId, setSelectedId] = useState("");

  function handleChange(value) {
    setSelectedId(value);
  }

  const options = {
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
        label: "Class Average",
        data: [80, 56, 77, 68, 75],
        backgroundColor: "rgba(0, 159, 199, 0.2)",
        borderColor: "rgba(0, 159, 199, 1)",
        borderWidth: 1,
      },
      {
        label: "61010001",
        data: [82, 68, 79, 81, 60],
        backgroundColor: "rgba(247, 148, 29, 0.2)",
        borderColor: "rgba(247, 148, 29, 1)",
        borderWidth: 1,
      },
    ],
  };

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
              defaultValue=""
              style={{ width: "160px" }}
              onChange={handleChange}
            >
              <Option value="">None</Option>
              {mockStudentId.map((ele) => (
                <Option key={ele.id} value={ele.id}>
                  {ele.id}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <Radar width={600} data={data} options={options} />
        </div>
      </div>
      <TeacherReportForm />
    </div>
  );
}
