import { useState } from "react";
import { Divider } from "antd";
import { EditFilled } from "@ant-design/icons";
import {
  Header,
  Body,
  Button,
  Tabs,
  TabPane,
  Select,
  CourseTable,
  Option,
  Input,
} from "../../components";
import styles from "./Curriculum.module.scss";
import { Helmet } from "react-helmet";

export function Curriculum() {
  const [selected, setSelected] = useState(null);
  const [editDetail, setEditDetail] = useState(false);
  const curlist = [
    {
      name: "CE Curriculum 2560",
      curriculum_id: "01072560",
    },
    {
      name: "CE Curriculum 2557",
      curriculum_id: "01072557",
    },
  ];
  const courses = [
    {
      key: "1",
      course_id: "01076001",
      curriculum_id: "01072560",
      precourse_id: null,
      course_name_th: "วิศวกรรมคอมพิวเตอร์เบื้องต้น",
      course_name_en: "Introduction to Computer Engineering",
      plo: [1.2, 1.3],
    },
    {
      key: "2",
      course_id: "01076002",
      curriculum_id: "01072560",
      precourse_id: null,
      course_name_th: "พื้นฐานการเขียนโปรแกรมคอมพิวเตอร์",
      course_name_en: "Programming Fundamental",
      plo: [1.1, 1.2],
    },
    {
      key: "3",
      course_id: "01076003",
      curriculum_id: "01072560",
      precourse_id: null,
      course_name_th: "วงจรไฟฟ้าและอิเล็กทรอนิกส์",
      course_name_en: "Circuits and Electronics",
      plo: [2.1, 2.2, 2.4],
    },
    {
      key: "4",
      course_id: "01076004",
      curriculum_id: "01072560",
      precourse_id: null,
      course_name_th: "การเขียนโปรแกรมเชิงวัตถุ",
      course_name_en: "Object Oriented Programming",
      plo: [1.1, 1.3],
    },
    {
      key: "5",
      course_id: "01076005",
      curriculum_id: "01072560",
      precourse_id: "01076004",
      course_name_th: "โครงสร้างข้อมูลและอัลกอริทึม",
      course_name_en: "Data Structures and Algorithm",
      plo: [2.1, 2.2],
    },
  ];
  const curDetail = {
    id: "01072560",
    name: "CE Curriculum 2560",
    year: 2560,
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
    faculty: "วิศวกรรมศาสตร์",
    department: "วิศวกรรมคอมพิวเตอร์",
  };

  function save() {
    alert("Saved!");
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Curriculum - OBED</title>
      </Helmet>
      <Header level={1}>Curriculum</Header>
      <div className={styles.selectCurriculum}>
        <Header level={2}>Select Active Curriculum</Header>
        <Select
          defaultValue="Curriculum"
          onChange={(value) => setSelected(value)}
          width="240px"
        >
          <Option disabled value="0">
            Curriculum
          </Option>
          {curlist.map((e, i) => (
            <Option value={e.name} key={e.curriculum_id}>
              {e.name}
            </Option>
          ))}
        </Select>
        <Header level={2}>or</Header>
        <Button>Create Curriculum</Button>
      </div>
      <Divider />
      {selected && (
        <>
          <div className={styles.curriculumMenu}>
            <Header level={2}>
              {curDetail.name}&nbsp;
              <EditFilled
                className={styles.editBtn}
                onClick={() => alert("Clicked")}
              />
            </Header>
            <Button danger>Archive Curriculum</Button>
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Course" key="1">
              <div className={styles.tabHead}>
                <Header level={2}>Course</Header>
                <div>
                  <Input
                    placeholder="Search"
                    search /*onSearch={search tab}*/
                  />
                  <Button>Import</Button>
                  <Button>New</Button>
                </div>
              </div>
              <CourseTable course={courses} />
            </TabPane>
            <TabPane tab="Standard" key="2">
              Content of Tab Standard
            </TabPane>
            <TabPane tab="Mapping" key="3">
              Content of Tab Mapping
            </TabPane>
            <TabPane tab="Details" key="4">
              <div className={styles.detailTab}>
                <Header level={4}>
                  University:{" "}
                  {editDetail ? (
                    <Input
                      placeholder="University or Institue Name"
                      defaultValue={curDetail.university}
                    />
                  ) : (
                    <Body level={1}>{curDetail.university}</Body>
                  )}
                </Header>
                <Header level={4}>
                  Faculty:{" "}
                  {editDetail ? (
                    <Input
                      placeholder="Faculty"
                      defaultValue={curDetail.faculty}
                    />
                  ) : (
                    <Body level={1}>{curDetail.faculty}</Body>
                  )}
                </Header>
                <Header level={4}>
                  Department:{" "}
                  {editDetail ? (
                    <Input
                      placeholder="Department"
                      defaultValue={curDetail.department}
                    />
                  ) : (
                    <Body level={1}>{curDetail.department}</Body>
                  )}
                </Header>
                {editDetail ? (
                  <div className={styles.btn}>
                    <Button
                      type="primary"
                      onClick={() => {
                        save();
                        setEditDetail(false);
                      }}
                    >
                      Save
                    </Button>
                    <Button onClick={() => setEditDetail(false)}>Cancel</Button>
                  </div>
                ) : (
                  <div className={styles.btn}>
                    <Button type="primary" onClick={() => setEditDetail(true)}>
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </TabPane>
          </Tabs>
        </>
      )}
    </div>
  );
}
