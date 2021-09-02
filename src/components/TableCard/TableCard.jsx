import styles from "./TableCard.module.scss";
import { useState } from "react";
import { Input, Select, Option, Body, TextArea } from "..";
import { SaveFilled, EditFilled } from "@ant-design/icons";
import { Tag, Tooltip } from "antd";

export function TableCard({
  edit,
  type,
  data = {},
  course = [{}],
  lo = [{}],
  plo = [{}],
  index
}) {
  const [mode, setMode] = useState(edit);
  const prereq = course.find((ele) => ele.id === data.precourse_id);

  return (
    <div className={styles.container}>
      {type === 1 ? (
        mode ? ( // Type 1 EDIT
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
                {course.map((ele, i) => (
                  <Option value={ele.id} key={i}>
                    {ele.id + " " + ele.course_name_en}
                  </Option>
                ))}
              </Select>
            </div>
            <div className={styles.col4}>
              <Select
                mode="multiple"
                placeholder="Select PLO"
                width="100%"
                defaultValue={data.plos ? data.plos : []}
              >
                {plo.map((ele, i) => (
                  <Option value={ele.id} key={i}>
                    {ele.id}
                  </Option>
                ))}
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
          // Type 1 VIEW
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
              <Body level={2}>
                {prereq ? prereq.id : "None"}
                <br />
                {prereq?.course_name_en}
              </Body>
            </div>
            <div className={styles.col4}>
              {data.plos?.map((ele, i) => (
                <Tooltip title={plo.find((x) => x.id === ele)?.desc}>
                  <Tag key={i}>{plo.find((x) => x.id === ele)?.id}</Tag>
                </Tooltip>
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
        mode ? ( // Type 2 EDIT
          <div className={styles.type2}>
            <div className={styles.col1}>
              <Body level={2}>{index}</Body>
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
                {lo.map((ele, i) => (
                  <Option value={ele.id}>{ele.desc}</Option>
                ))}
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
          // Type 2 VIEW
          <div className={styles.type2}>
            <div className={styles.col1}>
              <Body level={2} center>
                {index}
              </Body>
            </div>
            <div className={styles.col2}>
              <Body level={2}>{data.no}</Body>
            </div>
            <div className={styles.col3}>
              <Body level={2}>{data.description}</Body>
            </div>
            <div className={styles.col4}>
              {data.los?.map((ele, i) => (
                <Tooltip title={lo.find((x) => x.id === ele).desc}>
                  <Tag
                    key={i}
                    color="blue"
                    style={{
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {lo.find((x) => x.id === ele).desc}
                  </Tag>
                </Tooltip>
              ))}
            </div>
            <div className={styles.col5}>
              <Body level={2} center>
                {data.point}
              </Body>
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
