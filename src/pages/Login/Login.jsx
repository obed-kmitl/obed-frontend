import styles from "./Login.module.scss";
import { Helmet } from "react-helmet";
import img from "../../assets/img/login_img.svg";
import logo from "../../assets/img/login_admin.svg";
import { Button } from "../../components";
import { Space, Input } from "antd";

export const Login = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Helmet>
          <title>Login - OBED</title>
        </Helmet>
        <div className={styles.loginBox}>
          <img src={logo} alt="OBED" className={styles.logo} />
          <Space direction="vertical" size="middle" className={styles.form}>
            <Input placeholder="Username" size="large" />
            <Input.Password
              placeholder="Password"
              type="password"
              size="large"
            />
            <Button type="primary" size="large">
              Login
            </Button>
          </Space>
        </div>
        <img src={img} alt="login" className={styles.loginPic} />
      </div>
    </div>
  );
};
