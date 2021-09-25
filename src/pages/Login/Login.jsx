import { useState } from "react";
import styles from "./Login.module.scss";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import img from "../../assets/img/login_img.svg";
import logo from "../../assets/img/login_admin.svg";
import { Button } from "../../components";
import { Input, Form, Alert } from "antd";

import AuthService from "../../services/auth.service";

export const Login = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(values) {
    setLoading(true);
    AuthService.login(values.username, values.password).then(
      () => {
        history.push("/");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setLoading(false);
      }
    );
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Helmet>
          <title>Login - OBED</title>
        </Helmet>
        <div className={styles.loginBox}>
          <img src={logo} alt="OBED" className={styles.logo} />
          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className={styles.form}>
              {message !== "" && (
                <Alert
                  className={styles.alert}
                  message={message}
                  type="error"
                />
              )}
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input username!" }]}
              >
                <Input placeholder="Username" size="large" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input password!" }]}
              >
                <Input.Password
                  placeholder="Password"
                  type="password"
                  size="large"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
        <img src={img} alt="login" className={styles.loginPic} />
      </div>
    </div>
  );
};
