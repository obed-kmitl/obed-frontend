import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown } from "antd";

import UserContext from "../../../contexts/UserContext";
import styles from "./Navbar.module.scss";
import logo from "../../../assets/img/logo_nav.svg";
import useAuthen from "../../../hooks/useAuthen";

const Navbar = () => {
  const { onLogout } = useAuthen();
  const { user } = useContext(UserContext);
  const isAdmin = user.role === "ADMIN";
  const isTeacherHome =
    window.location.pathname.split("/")[2] === "profile" ||
    window.location.pathname === "/obed/";

  const menu = (
    <Menu style={{ minWidth: "200px" }}>
      <Menu.Item disabled style={{ color: "#252629" }} key="1">
        Logged in as <strong>{user?.username || "N/A"}</strong>
      </Menu.Item>
      <Menu.Divider />
      {!isAdmin && (
        <Menu.Item icon={<BookOutlined />} key="2">
          <Link to="/">My Course</Link>
        </Menu.Item>
      )}
      <Menu.Item icon={<UserOutlined />} key="3">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} danger onClick={onLogout} key="4">
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
              User
            </NavLink>
            <NavLink
              to="/plan"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Semester Plan
            </NavLink>
            <NavLink
              to="/summary"
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
  ) : (
      <div className={styles.navbar} admin={isAdmin.toString()}>
        <div className={styles.container}>
          <div className={styles.l}>
            <Link to="/" className={styles.logo} title="Home">
              <img src={logo} alt="obed" />
            </Link>
            <div
              className={styles.linkWrap}
              style={{ visibility: isTeacherHome && "hidden" }}
            >
              <NavLink
                to={`/overview`}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Overview
              </NavLink>
              <NavLink
                to={`/student`}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Student
              </NavLink>
              <NavLink
                to={`/lo`}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Learning Outcome
              </NavLink>
              <NavLink
                to={`/activity`}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Activity
              </NavLink>
              <NavLink
                to={`/report`}
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
