/* eslint-disable camelcase */
import Head from 'next/head';
import { useState } from 'react';
import { Tabs, Table, Divider } from 'antd';
import {
  EditFilled,
} from '@ant-design/icons';
import { Header, MyBtn, MyTabs } from '../../components';
import styles from './curriculum.module.scss';

const { Column } = Table;

export default function Curriculum() {
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
      <Head>
        <title>Curriculum - OBED</title>
      </Head>
      <Header level={1}>Curriculum</Header>
      <div className={styles.selectCurriculum}>
        <Header level={2}>Select Active Curriculum</Header>
        <select name="curriculum" defaultValue="0" onChange={(e) => setSelected(e.target.value)}>
          <option disabled value="0">Curriculum</option>
          {curlist.map((e, i) => <option value={e.name} key={i}>{e.name}</option>)}
        </select>
        <Header level={2}>or</Header>
        <MyBtn>Create Curriculum</MyBtn>
      </div>
      <Divider />
      {selected && <>
        <div className={styles.curriculumMenu}>
          <Header level={2}>{selected}&nbsp;
            <EditFilled className={styles.editBtn} /* onClick={() => doSomething()} */ />
          </Header>
          <MyBtn danger>Archive Curriculum</MyBtn>
        </div>
        <MyTabs defaultActiveKey="1">
          <Tabs.TabPane tab="Course" key="1">
            <div className={styles.tabHead}>
              <Header level={2}>Course</Header>
              <div>
                <MyBtn>Import</MyBtn>
                <MyBtn>New</MyBtn>
              </div>
            </div>
            <Table dataSource={courses}>
              <Column title="Course ID" dataIndex="course_id" key="course_id" sorter={(a, b) => a.age - b.age}/>
              <Column title="Course Name" dataIndex='course_name_th' key="course_name_th" />
              <Column title="Prerequisite" dataIndex='precourse_id' key="precourse_id" />
              <Column title="PLO" dataIndex='' key="plo" />
              <Column title="Action" dataIndex='' key="action" />
            </Table>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Standard" key="2">
      Content of Tab Standard
          </Tabs.TabPane>
          <Tabs.TabPane tab="Mapping" key="3">
      Content of Tab Mapping
          </Tabs.TabPane>
          <Tabs.TabPane tab="Details" key="4">
      Content of Tab Details
          </Tabs.TabPane>
        </MyTabs>
      </>}
    </div>
  );
}
