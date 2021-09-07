import { useState,useEffect } from 'react';
import styles from './Plan.module.scss';
import { Helmet } from 'react-helmet';
import { Header, Button, Select, Option, Input, Collapse, Panel, SectionTable } from '../../components';
import { Divider, Modal, Popconfirm, Transfer } from 'antd'
import {
    DeleteOutlined
} from '@ant-design/icons';

export const Plan = () => {

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

    const teacher= [
        {
          id: 1,
          firstname: "สมชาย",
          lastname: "ใจดี",
          username: "somchai1234",
          email: "somchai.ja@kmitl.ac.th",
          status: 1,
        },
        {
          id: 2,
          firstname: "สมหญิง",
          lastname: "จริงใจ",
          username: "somying1",
          email: "somying.ji@kmitl.ac.th",
          status: 1,
        },
        {
          id: 3,
          firstname: "สมปอง",
          lastname: "สุขสบาย",
          username: "sompong1988",
          email: "sompong.su@kmitl.ac.th",
          status: 0,
        },
        {
          id: 4,
          firstname: "สมปราชญ์",
          lastname: "สดใส",
          username: "somprach38",
          email: "somprach.so@kmitl.ac.th",
          status: 1,
        },
        {
          id: 5,
          firstname: "สมหมาย",
          lastname: "สายไทย",
          username: "sommai55",
          email: "sommai.sa@kmitl.ac.th",
          status: 0,
        },
        {
          id: 6,
          firstname: "สมหมาย",
          lastname: "รักไทย",
          username: "sommai1999",
          email: "sommai.ra@kmitl.ac.th",
          status: 1,
        },
        {
          id: 7,
          firstname: "สมศักดิ์",
          lastname: "ใฝ่รู้",
          username: "somsak74",
          email: "somsak.fh@kmitl.ac.th",
          status: 1,
        },
        {
          id: 8,
          firstname: "สมศรี",
          lastname: "ศรีไทย",
          username: "somsri6854",
          email: "somsri.sr@kmitl.ac.th",
          status: 1,
        },
        {
          id: 9,
          firstname: "สมพงศ์",
          lastname: "ชัยชนะ",
          username: "somphong",
          email: "somphong.ch@kmitl.ac.th",
          status: 1,
        },
        {
          id: 10,
          firstname: "สมสง่า",
          lastname: "ราศี",
          username: "somsanga34",
          email: "somsanga.ra@kmitl.ac.th",
          status: 0,
        },
        {
          id: 11,
          firstname: "สมเกิน",
          lastname: "อีกหน้า",
          username: "somkoen96",
          email: "somkoen.ei@kmitl.ac.th",
          status: 1,
        },
      ];
    const course = [{
        course_id: '01076001',
        curriculum_id: '01072560',
        precourse_id: null,
        course_name_th: 'วิศวกรรมคอมพิวเตอร์เบื้องต้น',
        course_name_en: 'Introduction to Computer Engineering',
        section: [{
            key: '1',
            section_id: '101',
            teacher: [1, 2]
        }, {
            key: '2',
            section_id: '102',
            teacher: [3]
        }, {
            key: '3',
            section_id: '103',
            teacher: [4,5,6]
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
            teacher: [1]
        }, {
            key: '2',
            section_id: '102',
            teacher: [7]
        }, {
            key: '3',
            section_id: '103',
            teacher: [8]
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
            teacher: [9,10,11]
        }, {
            key: '2',
            section_id: '102',
            teacher: [4,5,6]
        }]
    }, {
        course_id: '01076004',
        curriculum_id: '01072560',
        precourse_id: null,
        course_name_th: 'การเขียนโปรแกรมเชิงวัตถุ',
        course_name_en: 'Object Oriented Programming',
        section:[]
    }, {
        course_id: '01076005',
        curriculum_id: '01072560',
        precourse_id: '01076004',
        course_name_th: 'โครงสร้างข้อมูลและอัลกอริทึม',
        course_name_en: 'Data Structures and Algorithm',
        section:[]
    }];

    const curlist = [{
        name: 'CE Curriculum 2560',
        curriculum_id: '01072560',
    }, {
        name: 'CE Curriculum 2557',
        curriculum_id: '01072557',
    }];


    const [courses, setCourses] = useState(course)
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
    const [filterList, setFilterList] = useState(courses);
    const [searchValue, setSearchValue] = useState('');

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

        targetKeys.forEach(element => {
            const addItem = {
                course_id: mockCourse.find(e => e.key === element).course_id,
                curriculum_id: mockCourse.find(e => e.key === element).curriculum_id,
                precourse_id: mockCourse.find(e => e.key === element).precourse_id,
                course_name_th: mockCourse.find(e => e.key === element).course_name_th,
                course_name_en: mockCourse.find(e => e.key === element).course_name_en,
            }
            setCourses(courses => [...courses, addItem])
            setFilterList(courses => [...courses, addItem])
            setMockCourse(mockCourse => mockCourse.filter(e => e.key !== element))
        }
        )
       
        setTargetKeys([])
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function search(keyword) {
        if (keyword !== "") {
          const results = courses.filter((course) => {
            return (
              course.course_id.toLowerCase().includes(keyword.toLowerCase()) ||
              course.course_name_en.toLowerCase().includes(keyword.toLowerCase()) ||
              course.course_name_th.toLowerCase().includes(keyword.toLowerCase()) 
            );
          });
          setFilterList(results);
        } else {
          setFilterList(courses);
        }
      }

    useEffect(() => {
        setSearchValue('');
        search('');
    }, [courses])  
 


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
                    <Input placeholder="placeholder" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value);console.log(e.target.value)}} search onSearch={search} />
                    <Button onClick={() => handleAddCourse()}>Add</Button>
                </div>
            </div>
            <div className={styles.plan}>

                <div className={styles.collapseBox} >
                    <Collapse
                        accordion
                    >
                        {filterList.map((e, i) =>
                            <Panel
                                header={
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Header level={4} >{e.course_id}{' '}{e.course_name_en}</Header>
                                        <div style={{display:"flex" ,alignItems: "center"}}>
                                        {/* {!e.section?<WarningOutlined style={{color:"red" ,margin:"010px"}} />:null} */}
                                        <Popconfirm
                                            title="Are you sure to delete this course?"
                                            onConfirm={(e)=>{alert('Clicked');e.stopPropagation()}}
                                            onCancel={(e)=> e.stopPropagation()}
                                        >
                                            <div  onClick={(e) => { e.stopPropagation() }}><DeleteOutlined /></div>
                                        </Popconfirm>
                                        </div>
                                    </div>}
                                key={i}

                            >
                                {/* <div style={{ width: "100%", padding: "10px 0", display: 'flex', justifyContent: "flex-end", gap: '1rem' }}>
                                    <Button type="secondary" onClick={() => alert('Clicked')}>Add Section</Button>
                                    <Button danger onClick={() => alert('Clicked')}><DeleteOutlined /></Button>
                                </div> */}
                                <SectionTable section={e.section} teacher={teacher}/>
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
                <Divider />
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
                    locale={{ itemUnit: "course", itemsUnit: "course", searchPlaceholder: "Search by Course ID or Name" }}
                    render={item => `${item.course_id} ${item.course_name_en}`}
                />
            </Modal>

        </div>


    )
}

