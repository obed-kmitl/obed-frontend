import { useState } from 'react';
import { Table, Divider } from 'antd';
import {
  EditFilled,
} from '@ant-design/icons';
import { Header, Button, Tabs, TabPane } from '../../components';
import styles from './Curriculum.module.scss';
import { Helmet } from 'react-helmet';

export function Curriculum() {
  const [selected, setSelected] = useState(null);
  const curlist = [{
    name: 'CE Curriculum 2560',
    curriculum_id: '01072560',
  }, {
    name: 'CE Curriculum 2557',
    curriculum_id: '01072557',
  }];
  const courses = [{
    course_id: '01076001',
    curriculum_id: '01072560',
    precourse_id: null,
    course_name_th: 'วิศวกรรมคอมพิวเตอร์เบื้องต้น',
    course_name_en: 'Introduction to Computer Engineering',
  }, {
    course_id: '01076002',
    curriculum_id: '01072560',
    precourse_id: null,
    course_name_th: 'พื้นฐานการเขียนโปรแกรมคอมพิวเตอร์',
    course_name_en: 'Programming Fundamental',
  }, {
    course_id: '01076003',
    curriculum_id: '01072560',
    precourse_id: null,
    course_name_th: 'วงจรไฟฟ้าและอิเล็กทรอนิกส์',
    course_name_en: 'Curcuits and Electronics',
  }, {
    course_id: '01076004',
    curriculum_id: '01072560',
    precourse_id: null,
    course_name_th: 'การเขียนโปรแกรมเชิงวัตถุ',
    course_name_en: 'Object Oriented Programming',
  }, {
    course_id: '01076005',
    curriculum_id: '01072560',
    precourse_id: '01076004',
    course_name_th: 'โครงสร้างข้อมูลและอัลกอริทึม',
    course_name_en: 'Data Structures and Algorithm',
  }];

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Curriculum - OBED</title>
      </Helmet>
      <Header level={1}>Curriculum</Header>
      <div className={styles.selectCurriculum}>
        <Header level={2}>Select Active Curriculum</Header>
        <select name="curriculum" defaultValue="0" onChange={(e) => setSelected(e.target.value)}>
          <option disabled value="0">Curriculum</option>
          {curlist.map((e, i) => <option value={e.name} key={i}>{e.name}</option>)}
        </select>
        <Header level={2}>or</Header>
        <Button>Create Curriculum</Button>
      </div>
      <Divider />
      {selected && <>
        <div className={styles.curriculumMenu}>
          <Header level={2}>{selected}&nbsp;
            <EditFilled className={styles.editBtn} onClick={() => alert("Clicked")} />
          </Header>
          <Button danger>Archive Curriculum</Button>
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Course" key="1">
            <div className={styles.tabHead}>
              <Header level={2}>Course</Header>
              <div>
                <Button>Import</Button>
                <Button>New</Button>
              </div>
            </div>
            <Table dataSource={courses}>
              <Table.Column title="Course ID" dataIndex="course_id" key="course_id" sorter={(a, b) => a.age - b.age}/>
              <Table.Column title="Course Name" dataIndex='course_name_th' key="course_name_th" />
              <Table.Column title="Prerequisite" dataIndex='precourse_id' key="precourse_id" />
              <Table.Column title="PLO" dataIndex='' key="plo" />
              <Table.Column title="Action" dataIndex='' key="action" />
            </Table>
          </TabPane>
          <TabPane tab="Standard" key="2">
      Content of Tab Standard
          </TabPane>
          <TabPane tab="Mapping" key="3">
      Content of Tab Mapping
          </TabPane>
          <TabPane tab="Details" key="4">
      Content of Tab Details
          </TabPane>
        </Tabs>
      </>}
    </div>
  );
}