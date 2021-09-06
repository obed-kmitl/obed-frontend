import { useState } from 'react';
import styles from './Plan.module.scss';
import { Helmet } from 'react-helmet';
import { Header, Button, Select, Option, Input, Collapse, Panel, SectionTable } from '../../components';
import { Divider, Modal, Transfer } from 'antd'
import {
    DeleteOutlined,
} from '@ant-design/icons';
import { element } from 'prop-types';

export const Plan = () => {
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

    const course = [{
        course_id: '01076001',
        curriculum_id: '01072560',
        precourse_id: null,
        course_name_th: 'วิศวกรรมคอมพิวเตอร์เบื้องต้น',
        course_name_en: 'Introduction to Computer Engineering',
        section: [{
            key: '1',
            section_id: '101',
            teacher: ["John Tommy", "Michel Danny"]
        }, {
            key: '2',
            section_id: '102',
            teacher: ["Jack Giant"]
        }, {
            key: '3',
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
            key: '1',
            section_id: '101',
            teacher: ["Michel Danny"]
        }, {
            key: '2',
            section_id: '102',
            teacher: ["John Tommy"]
        }, {
            key: '3',
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
            key: '1',
            section_id: '101',
            teacher: ["John Tommy", "Michel Danny", "Jack Giant"]
        }, {
            key: '2',
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

    const curlist = [{
        name: 'CE Curriculum 2560',
        curriculum_id: '01072560',
    }, {
        name: 'CE Curriculum 2557',
        curriculum_id: '01072557',
    }];


    const [courses ,setCourses] = useState(course)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedSemester, setSelectedSemester] = useState("1");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCurriculum, setSelectedCurriculum] = useState(curlist[0].name);
    const [mockCourse, setMockCourse] = useState(() => {
        const data = []
        for (let i = 0; i < 20; i++) {
            data.push({
                key: `010760${i + 10}`,
                course_id: `010760${i + 10}`,
                curriculum_id: '01072560',
                precourse_id: null,
                course_name_th: `วิชาตัวอย่างลำดับที่ ${i}`,
                course_name_en: `Mock Subject -  ${i}`,
            });
        }
        return data
    })

    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const onChange = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys:', nextTargetKeys);
        console.log('direction:', direction);
        console.log('moveKeys:', moveKeys);
        setTargetKeys(nextTargetKeys);
      };
    
      const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys:', sourceSelectedKeys);
        console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
      };
    
    const handleAddCourse = () => {
        setIsModalVisible(true)

    }

    const handleOk = () => {
        setIsModalVisible(false);

        targetKeys.forEach(element=>{
            const addItem = {
                course_id: mockCourse.find(e=>e.key === element).course_id ,
                curriculum_id: mockCourse.find(e=>e.key === element).curriculum_id,
                precourse_id: mockCourse.find(e=>e.key === element).precourse_id,
                course_name_th: mockCourse.find(e=>e.key === element).course_name_th,
                course_name_en: mockCourse.find(e=>e.key === element).course_name_en,
            }
            setCourses(courses=>[...courses,addItem])
            setMockCourse(mockCourse=>mockCourse.filter(e=>e.key !== element))
        }
       )
      
       setTargetKeys([])
       
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };


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
                    {yearSemesters.map((e, i) => <Option value={e.year} key={i}>{e.year}</Option>)}
                </Select>
                <Header level={2}>Semester</Header>
                {yearSemesters.filter(() => yearSemesters.year === selectedYear).semester}
                <Select defaultValue={selectedSemester} onChange={(value) => setSelectedSemester(value)} width={100}>
                    {yearSemesters.filter((e) => e.year === selectedYear)[0].semester.map((e, i) => <Option value={e} key={i}>{e}</Option>)}
                </Select>
            </div>
            <div className={styles.planHeader}>
                <Header level={2}>{selectedYear}/{selectedSemester}</Header>
                <div className={styles.rightContainer}>
                    <Input placeholder="placeholder" search onSearch={onSearch} />
                    <Button onClick={() => handleAddCourse()}>Add</Button>
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
                            </Panel>)}
                    </Collapse>
                </div>

            </div>

            <Modal
                visible={isModalVisible}
                title={<Header level={2} style={{ padding: "1rem" }}>Add Course</Header>}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Add
                    </Button>,
                ]}
                width={1024}
            >
                    <Header level={4}>Curriculum</Header>
                    <Select defaultValue={selectedCurriculum} onChange={(value) => setSelectedCurriculum(value)} width="440px" >
                        {curlist.map((e, i) => <Option value={e.name} key={i}>{e.name}</Option>)}
                    </Select>
                    <Divider/>
                    <Transfer
                        dataSource={mockCourse}
                        titles={['Courses', 'Selected']}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        onChange={onChange}
                        onSelectChange={onSelectChange}
                        showSearch
                        listStyle={{
                          width: 450,
                          height: 400,
                        }}
                        operations={['Add', 'Remove']}
                        locale={{ itemUnit: "course", itemsUnit: "course", searchPlaceholder: "Search by Course ID or Name"}}
                        render={item => `${item.course_id} ${item.course_name_en}`}
                    />
            </Modal>

        </div>


    )
}

