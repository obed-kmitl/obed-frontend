import styles from "./AdminReport.module.scss";
import { Divider } from "antd";
import { Helmet } from "react-helmet";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  BarsOutlined,
  BookOutlined,
  RightOutlined,
} from "@ant-design/icons";

export function AdminReport() {
  return (
    <div className={styles.adminReport}>
      <Helmet>
        <title>Report - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Assesment Report</Header>
      </div>
      <Divider />
      <div className={styles.linkContainer}>
        <Link to="/summary/subject" className={styles.linkWrap}>
          <div>
            <BarsOutlined />
            &emsp;<p>By Course</p>
          </div>
          <RightOutlined />
        </Link>
        <Link to="/summary/cohort" className={styles.linkWrap}>
          <div>
            <BookOutlined />
            &emsp;<p>By Cohort</p>
          </div>
          <RightOutlined />
        </Link>
        <Link to="/summary/student" className={styles.linkWrap}>
          <div>
            <UserOutlined />
            &emsp;<p>By Student</p>
          </div>
          <RightOutlined />
        </Link>
      </div>
    </div>
  );
}
