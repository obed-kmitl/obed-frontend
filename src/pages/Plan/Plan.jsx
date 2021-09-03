import { useState } from 'react';
import styles from './Plan.module.scss';
import { Helmet } from 'react-helmet';
import { Header, Button, Select, Input, Collapse, Panel , SectionTable } from '../../components';
import { Divider } from 'antd'
import {
    DeleteOutlined,
} from '@ant-design/icons';

export const Plan = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedSemester, setSelectedSemester] = useState("1");

    const onSearch = value => console.log(value);

    const yearSemesters = [{
        year: "2021",
        semester: ["1", "2", "3"]
    }, {
        year: "2020",
        semester: ["1", "2", "3"]
    }, {
        year: "2019",
        semester: ["1", "2"]
    }]

    const courses = [{
        course_id: '01076001',
        curriculum_id: '01072560',
        precourse_id: null,
        course_name_th: 'วิศวกรรมคอมพิวเตอร์เบื้องต้น',
        course_name_en: 'Introduction to Computer Engineering',
        section: [{
            section_id: '101',
            teacher: ["John Tommy", "Michel Danny"]
        }, {
            section_id: '102',
            teacher: ["Jack Giant"]
        }, {
            section_id: '103',
            teacher: ["John Tommy", "Michel Danny", "Jack Giant"]
        }]
    }, {
        course_id: '01076002',
        curriculum_id: '01072560',
        precourse_id: null,
        course_name_th: 'พื้นฐานการเขียนโปรแกรมคอมพิวเตอร์',
        course_name_en: 'Programming Fundamental',
        section: [{
            section_id: '101',
            teacher: ["Michel Danny"]
        }, {
            section_id: '102',
            teacher: ["John Tommy"]
        }, {
            section_id: '103',
            teacher: ["John Tommy", "Michel Danny", "Jack Giant"]
        }]
    }, {
        course_id: '01076003',
        curriculum_id: '01072560',
        precourse_id: null,
        course_name_th: 'วงจรไฟฟ้าและอิเล็กทรอนิกส์',
        course_name_en: 'Curcuits and Electronics',
        section: [{
            section_id: '101',
            teacher: ["John Tommy", "Michel Danny", "Jack Giant"]
        }, {
            section_id: '102',
            teacher: ["John Tommy", "Michel Danny", "Jack Giant"]
        }]
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
    console.log(yearSemesters.filter((e) => e.year === selectedYear)[0].semester)

    return (
        <div className={styles.container}>
            <Helmet>
                <title>Semester Plan - OBED</title>
            </Helmet>
            <Header level={1}>Semester Plan</Header>
            <Divider />
            <div className={styles.selectSemester}>
                <Header level={2}>Year</Header>
                <Select defaultValue={selectedYear} onChange={(value) => setSelectedYear(value)} width={100}>
                    {yearSemesters.map((e, i) => <option value={e.year} key={i}>{e.year}</option>)}
                </Select>
                <Header level={2}>Semester</Header>
                {yearSemesters.filter(() => yearSemesters.year === selectedYear).semester}
                <Select defaultValue={selectedSemester} onChange={(value) => setSelectedSemester(value)} width={100}>
                    {yearSemesters.filter((e) => e.year === selectedYear)[0].semester.map((e, i) => <option value={e} key={i}>{e}</option>)}
                </Select>
            </div>
            <div className={styles.planHeader}>
                <Header level={2}>{selectedYear}/{selectedSemester}</Header>
                <div className={styles.rightContainer}>
                    <Input placeholder="placeholder" search onSearch={onSearch} />
                    <Button>Add</Button>
                </div>
            </div>
            <div className={styles.plan}>
               
                    <div className={styles.collapseBox}>
                        <Collapse accordion>
                        {courses.map((e, i) =>
                            <Panel header={<Header level={4} >{e.course_id}{' '}{e.course_name_en}</Header>} key={i}>
                                {/* <div style={{ width: "100%", padding: "10px 0", display: 'flex', justifyContent: "flex-end", gap: '1rem' }}>
                                    <Button type="secondary" onClick={() => alert('Clicked')}>Add Section</Button>
                                    <Button danger onClick={() => alert('Clicked')}><DeleteOutlined /></Button>
                                </div> */}
                                <SectionTable section={e.section} />
                            </Panel>  )}
                        </Collapse>
                    </div>
              
            </div>

        </div>
    )
}

