import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {
    AreaChartOutlined,
    FileTextOutlined,
    TeamOutlined,
    CalendarOutlined,
    FormOutlined,
    BulbOutlined,
    ExperimentOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined
} from '@ant-design/icons';
// import { useRouter } from 'next/router'
import { useState } from 'react';
import { Header } from '../../../components';
import logo from '../../../assets/img/Logo.png'


const { Sider } = Layout;
const { SubMenu } = Menu;


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



const Sidebar = () => {

    const userName = "username"

    const isAdmin = true;

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

    const location = useLocation();

    const userMenu = (
        <Menu className={styles.usermenu}>
            <Menu.Item key="1">
                <UserOutlined /><Link to="/profile"> Profile </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <SettingOutlined /><Link to="/sandbox" > Setting </Link>
            </Menu.Item>
            <Menu.Item key="3" style={{ color: 'red' }}>
                <LogoutOutlined /> <Link to="#" > Sign Out </Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={styles.sidebar}>
            <Sider
                className={isAdmin ? styles.containerAdmin : styles.container}
                width={256}
            >
                <div>
                    <div className={styles.logo}>
                        <img src={logo} height="119px" width="179px" alt="OBED Logo" />
                        {isAdmin && <Header level={1}>Administrator</Header>}
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
                                            onClick={() => setSemesterTitle({
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
                                                <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: "200px" }}>{courseTitle.courseName}</div>
                                                Section {courseTitle.section}
                                            </Header>
                                        </div>
                                    }
                                >
                                    {courses.map((course) =>
                                        <Menu.Item
                                            key={course.id}
                                            onClick={() => setCourseTitle({
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
                                    <Link to="/">
                                        <AreaChartOutlined className={styles.icon} /> Overview
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="5" className={styles.item}>
                                    <Link to="#">
                                        <TeamOutlined className={styles.icon} /> Student
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="6" className={styles.item}>
                                    <Link to="#">
                                        <FormOutlined className={styles.icon} /> Planning
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="7" className={styles.item}>
                                    <Link to="#">
                                        <BulbOutlined className={styles.icon} /> Learning Outcome
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="8" className={styles.item}>
                                    <Link to="#">
                                        <ExperimentOutlined className={styles.icon} /> Activity
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="9" className={styles.item}>
                                    <Link to="#">
                                        <FileTextOutlined className={styles.icon} /> Report
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </>
                        : <Menu
                            className={styles.menu}
                            defaultSelectedKeys={location.pathname}
                            mode="inline"
                        >
                            <Menu.Item className={styles.item} key="/curriculum">
                                <Link to="/curriculum">
                                    <FileTextOutlined className={styles.icon} /> Curriculum
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/" className={styles.item}>
                                <Link to="/">
                                    <TeamOutlined className={styles.icon} /> Teacher
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/plan" className={styles.item}>
                                <Link to="/plan">
                                    <CalendarOutlined className={styles.icon} /> Semester plan
                                </Link>
                            </Menu.Item>
                        </Menu>
                    }
                </div>
                <Dropdown overlay={userMenu} placement="topCenter" trigger={['click']} overlayClassName={styles.dropdown}>
                    <div className={styles.footer}>
                        <Avatar size={50} icon={<UserOutlined />} />
                        <Link to="#" className={styles.link}> {userName} </Link>
                    </div>
                </Dropdown>
            </Sider>
        </div>
    )
}

export default Sidebar