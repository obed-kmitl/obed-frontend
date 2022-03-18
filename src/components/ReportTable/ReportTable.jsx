import styles from "./ReportTable.module.scss";
import { Table, Tag, Tooltip } from "antd";
import { Header } from "..";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReportTable } from "./hooks/useReportTable";

const { Column } = Table;

function ReportTable() {
  const { sectionId } = useParams();
  const { getSectionReport } = useReportTable();
  const [data, setData] = useState();

  useEffect(() => {
    getSectionReport(sectionId).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className={styles.ReportTable}>
      <Header level={2} style={{ marginTop: "1rem" }}>
        ผลการเรียนรู้และการประเมินผล
      </Header>
      <Table dataSource={data} bordered>
        <Column
          title="ผลการเรียนรู้"
          dataIndex="order_number"
          key="clo_id"
          render={(text, record) => <>{text + " " + record.detail}</>}
          width={200}
        />
        <Column
          title="ข้อบ่งชี้ผลการเรียนรู้ (บรรลุผลการเรียนรู้เมื่อนักศึกษาไม่น้อยกว่า 70% สามารถทำได้หรือผิดเล็กน้อย)"
          dataIndex="activities"
          render={(activities) => (
            <>
              {activities.map((item) => (
                <>
                  <Tooltip
                    title={
                      item.title +
                      " (" +
                      item.sub_activities.map((ele) => ele.detail) +
                      ")"
                    }
                    placement="topLeft"
                  >
                    <p
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: "300px",
                      }}
                    >
                      {item.title +
                        " (" +
                        item.sub_activities.map((ele) => ele.detail) +
                        ")"}
                    </p>
                  </Tooltip>
                </>
              ))}
            </>
          )}
          width={400}
        />
        <Column
          title="ผลการประเมินผลการเรียนรู้"
          dataIndex="activities"
          render={(activities) => (
            <>
              {activities.map((item) => (
                <>
                  <p>{item.percent + "%"}</p>
                </>
              ))}
            </>
          )}
        />
        <Column
          title="บรรลุ"
          dataIndex="isPassed"
          render={(pass) => <>{pass ? "Y" : "N"}</>}
        />
        <Column
          title="มคอ.2"
          dataIndex="main_sub_standards"
          render={(tags) => (
            <>
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </>
          )}
          width={20}
        />
        <Column
          title="PLO"
          dataIndex="relative_sub_standards"
          render={(tags) => (
            <>
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </>
          )}
          width={20}
        />
      </Table>
    </div>
  );
}

export { ReportTable };
