import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  HomeTwoTone,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown } from "antd";

import UserContext from "../../../contexts/UserContext";
import styles from "./Navbar.module.scss";
import logo from "../../../assets/img/logo_nav.svg";
import useAuthen from "../../../hooks/useAuthen";

const Navbar = () => {
  const { onLogout } = useAuthen();
  const { user } = useContext(UserContext);
  const isAdmin = window.location.host.split(".")[0] === "admin";

  const menu = (
    <Menu>
      <Menu.Item disabled>
        Logged in as <strong>{user?.username}</strong>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} danger onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return isAdmin ? (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.l}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="obed" />
          </Link>
          <div className={styles.linkWrap}>
            <NavLink
              to="/curriculum"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Curriculum
            </NavLink>
            <NavLink
              to="/teacher"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Teacher
            </NavLink>
            <NavLink
              to="/plan"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Semester Plan
            </NavLink>
          </div>
        </div>
        <Dropdown overlay={menu} placement="bottomRight">
          <button className={styles.userBtn} admin={isAdmin.toString()}>
            <UserOutlined /> <DownOutlined />
          </button>
        </Dropdown>
      </div>
    </div>
  ) : (
    <div className={styles.navbar} admin={isAdmin.toString()}>
      <div className={styles.container}>
        <div className={styles.l}>
          <Link to="/" className={styles.logo} title="Home">
            <img src={logo} alt="obed" />
          </Link>
          <div className={styles.linkWrap}>
            <NavLink
              to="/"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Overview
            </NavLink>
            <NavLink
              to="/student"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Student
            </NavLink>
            <NavLink
              to="/plan"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Planning
            </NavLink>
            <NavLink
              to="/lo"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Learning Outcome
            </NavLink>
            <NavLink
              to="/activity"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Activity
            </NavLink>
            <NavLink
              to="/report"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Report
            </NavLink>
          </div>
        </div>
        <Dropdown overlay={menu} placement="bottomRight">
          <button className={styles.userBtn} admin={isAdmin.toString()}>
            <UserOutlined /> <DownOutlined />
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
