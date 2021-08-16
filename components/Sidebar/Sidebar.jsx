import Link from 'next/link'
import styles from './Sidebar.module.scss'
import React from 'react'
import { Layout, Menu } from 'antd';
import {
    AreaChartOutlined,
    FileTextOutlined,
    TeamOutlined,
    CalendarOutlined,
    FormOutlined,
    BulbOutlined,
    ExperimentOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router'
import { useState } from 'react';

const { Sider } = Layout;
const { SubMenu } = Menu;
import { Header } from '../../components';
import { Headers } from 'node-fetch';
import Head from 'next/head';

const semesters = [
    {
        id: "1",
        semester: "2",
        year: "2021"
    },
    {
        id: "2",
        semester: "1",
        year: "2021"
    },
    {
        id: "3",
        semester: "2",
        year: "2020"
    },
    {
        id: "4",
        semester: "1",
        year: "2020"
    },
    {
        id: "5",
        semester: "2",
        year: "2019"
    }
]
const courses = [
    {
        id: "1",
        courseId: "01076001",
        courseName: "Introduction to Computer Engineering",
        section: "21"
    },
    {
        id: "2",
        courseId: "01076001",
        courseName: "Introduction to Computer Engineering",
        section: "22"
    },
    {
        id: "3",
        courseId: "01076002",
        courseName: "Subject 2 ",
        section: "1"
    },
    {
        id: "4",
        courseId: "01076003",
        courseName: "Subject 3",
        section: "1"
    },

]


function keyPath() {
    const router = useRouter()
    if (router.asPath === "/") {
        return "1"
    }
    else if (router.asPath === "/test") {
        return "2"
    }
    else if (router.asPath === "/plan") {
        return "3"
    }
}


const Sidebar = () => {

    const isAdmin = false;

    const [semesterTitle, setSemesterTitle] = useState({
        id: semesters[0].id,
        semester: semesters[0].semester,
        year: semesters[0].year
    })
    const [courseTitle, setCourseTitle] = useState({
        id: courses[0].id,
        courseId: courses[0].courseId,
        courseName: courses[0].courseName,
        section: courses[0].section
    })
    
    return (
        <div className={styles.sidebar}>
            <Sider className={isAdmin ? styles.containerAdmin : styles.container} width={256} >
                <div className={styles.logo}>
                    <img src="/Logo.png" height="119px" width="179px" alt="OBED Logo" />
                    {isAdmin &&  <Header level={1}>Administrator</Header>}
                </div>
                {!isAdmin ?
                    <>
                        <Menu
                            className={styles.menu}
                            defaultSelectedKeys={['1']}
                            mode="vertical"
                        >
                            <SubMenu className={styles.year} key="sub1" title={<Header level={5}>{semesterTitle.semester}{"/"}{semesterTitle.year}</Header>} >
                                {semesters.map((semester) =>
                                    <Menu.Item
                                        key={semester.id}
                                        onClick={()=>setSemesterTitle({
                                            id: semester.id,
                                            semester: semester.semester,
                                            year: semester.year
                                        })}
                                    >
                                        {semester.semester}/{semester.year}
                                    </Menu.Item>
                                )}
                            </SubMenu>
                        </Menu>    
                        <Menu
                            className={styles.menu}
                            defaultSelectedKeys={['1']}
                            mode="vertical"
                        >
                            <SubMenu
                                className={styles.course} key="sub2"
                                title={
                                    
                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                        <Header level={5}>
                                        {courseTitle.courseId} <br />
                                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: "200px"}}>{courseTitle.courseName}</div>
                                        Section {courseTitle.section}
                                        </Header>
                                    </div>
                                }
                            >
                                {courses.map((course) =>
                                    <Menu.Item 
                                        key={course.id}
                                        onClick={()=>setCourseTitle({
                                            id: course.id,
                                            courseId: course.courseId,
                                            courseName: course.courseName,
                                            section: course.section
                                        })}>
                                        <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {course.courseId}{" "}{course.courseName}{" "}{"Section"}{" "}{course.section}
                                        </div>
                                    </Menu.Item>
                                )}
                            </SubMenu>
                        </Menu>
                        <Menu
                            className={styles.menu}
                            defaultSelectedKeys={"4"/*keyPath()*/}
                            mode="inline"
                        >
                            <Menu.Item className={styles.item} key="4">
                                <Link href="/">
                                    <a> <AreaChartOutlined className={styles.icon}/> Overview </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="5" className={styles.item}>
                                <Link href="#">
                                    <a> <TeamOutlined className={styles.icon}/> Student </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="6" className={styles.item}>
                                <Link href="#">
                                    <a> <FormOutlined className={styles.icon}/> Planning </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="7" className={styles.item}>
                                <Link href="#">
                                    <a> <BulbOutlined className={styles.icon}/> Learning Outcome </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="8" className={styles.item}>
                                <Link href="#">
                                    <a> <ExperimentOutlined className={styles.icon}/> Activity </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="9" className={styles.item}>
                                <Link href="#">
                                    <a> <FileTextOutlined className={styles.icon}/> Report </a>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </>
                    : <Menu
                        className={styles.menu}
                        defaultSelectedKeys={keyPath()}
                        mode="inline"
                    >
                        <Menu.Item className={styles.item} key="1">
                            <Link href="/">
                                <a> <FileTextOutlined className={styles.icon}/> Curriculum </a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" className={styles.item}>
                            <Link href="/test">
                                <a> <TeamOutlined className={styles.icon}/> Teacher </a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" className={styles.item}>
                            <Link href="/test">
                                <a> <CalendarOutlined className={styles.icon}/> Semester plan </a>
                            </Link>
                        </Menu.Item>
                    </Menu>
                }

            </Sider>
        </div>
    )
}

export default Sidebar

