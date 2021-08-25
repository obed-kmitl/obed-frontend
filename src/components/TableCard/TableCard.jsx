import styles from "./TableCard.module.scss";
import { useState } from "react";
import { Input, Select, Option, Body, TextArea } from "..";
import { SaveFilled, EditFilled } from "@ant-design/icons";
import { Tag } from "antd";

export function TableCard({ edit, type, data = {} }) {
  const [mode, setMode] = useState(edit);

  return (
    <div className={styles.container}>
      {type === 1 ? (
        mode ? (
          <div className={styles.type1}>
            <div className={styles.col1}>
              <Input
                placeholder="Course ID"
                defaultValue={data.course_id}
                width="100%"
              />
            </div>
            <div className={styles.col2}>
              <Input
                placeholder="EN"
                defaultValue={data.course_name_en}
                width="100%"
              />
              <Input
                placeholder="TH"
                defaultValue={data.course_name_th}
                width="100%"
              />
            </div>
            <div className={styles.col3}>
              <Select
                showSearch
                placeholder="Search Prerequisite"
                defaultValue={data.precourse_id ? data.precourse_id : "0"}
                width="100%"
              >
                <Option value="0">None</Option>
                <Option value="01076001">
                  01076001 Introduction to Computer Engineering
                </Option>
                <Option value="01076002">
                  01076002 Programming Fundamental
                </Option>
                <Option value="01076003">
                  01076003 Circuits and Electronics
                </Option>
              </Select>
            </div>
            <div className={styles.col4}>
              <Select
                mode="multiple"
                placeholder="Select PLO"
                width="100%"
                defaultValue={data.plos ? data.plos : []}
              >
                <Option value="1.1">1.1</Option>
                <Option value="1.2">1.2</Option>
                <Option value="1.3">1.3</Option>
                <Option value="1.4">1.4</Option>
                <Option value="1.5">1.5</Option>
                <Option value="1.6">1.6</Option>
              </Select>
            </div>
            <div className={styles.col5}>
              <button onClick={() => setMode(!mode)}>
                <SaveFilled style={{ fontSize: "24px" }} />
                <br />
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.type1}>
            <div className={styles.col1}>
              <Body level={2}>{data.course_id}</Body>
            </div>
            <div className={styles.col2}>
              <Body level={2}>
                {data.course_name_en}
                <br />
                {data.course_name_th}
              </Body>
            </div>
            <div className={styles.col3}>
              <Select
                showSearch
                placeholder="Search Prerequisite"
                defaultValue={data.precourse_id ? data.precourse_id : "0"}
                disabled
                width="100%"
              >
                <Option value="0">None</Option>
                <Option value="01076001">
                  01076001 Introduction to Computer Engineering
                </Option>
                <Option value="01076002">
                  01076002 Programming Fundamental
                </Option>
                <Option value="01076003">
                  01076003 Circuits and Electronics
                </Option>
              </Select>
            </div>
            <div className={styles.col4}>
              {data.plos?.map((ele, i) => (
                <Tag key={i}>{ele}</Tag>
              ))}
            </div>
            <div className={styles.col5}>
              <button onClick={() => setMode(!mode)}>
                <EditFilled style={{ fontSize: "24px" }} />
                <br />
                Edit
              </button>
            </div>
          </div>
        )
      ) : type === 2 ? (
        mode ? (
          <div className={styles.type2}>
            <div className={styles.col1}>
              <Body level={2}>1</Body>
            </div>
            <div className={styles.col2}>
              <Input placeholder="No." defaultValue={data.no} width="100%" />
            </div>
            <div className={styles.col3}>
              <TextArea
                placeholder="Description"
                defaultValue={data.description}
                width="100%"
                rows="4"
              />
            </div>
            <div className={styles.col4}>
              <Select
                showSearch
                placeholder="Select Learning Outcome"
                defaultValue={data.los ? data.los : []}
                width="100%"
                mode="multiple"
              >
                <Option value="1">
                  สามารถแปลงเลขระหว่างฐาน 2 และฐาน 10
                  ทั้งคิดและไม่คิดเครื่องหมาย
                </Option>
                <Option value="2">
                  สามารถแปลงเลขระหว่างฐาน 2 และฐาน 16
                  ทั้งคิดและไม่คิดเครื่องหมาย
                </Option>
              </Select>
            </div>
            <div className={styles.col5}>
              <Input
                placeholder="Point"
                defaultValue={data.point}
                width="100%"
                type="number"
              />
            </div>
            <div className={styles.col6}>
              <button onClick={() => setMode(!mode)}>
                <SaveFilled style={{ fontSize: "24px" }} />
                <br />
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.type2}>
            <div className={styles.col1}>
              <Body level={2} center>1</Body>
            </div>
            <div className={styles.col2}>
              <Body level={2}>{data.no}</Body>
            </div>
            <div className={styles.col3}>
              <Body level={2}>{data.description}</Body>
            </div>
            <div className={styles.col4}>
              {data.los?.map((ele, i) => (
                <Tag
                  key={i}
                  color="blue"
                  style={{
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={ele}
                >
                  {ele}
                </Tag>
              ))}
            </div>
            <div className={styles.col5}>
              <Body level={2} center>{data.point}</Body>
            </div>
            <div className={styles.col6}>
              <button onClick={() => setMode(!mode)}>
                <EditFilled style={{ fontSize: "24px" }} />
                <br />
                Edit
              </button>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}
