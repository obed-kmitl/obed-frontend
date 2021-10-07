import styles from "./Login.module.scss";
import { Helmet } from "react-helmet";
import css from "classnames";
import img from "../../assets/img/login_img.svg";
import img2 from "../../assets/img/login_img2.svg";
import logo from "../../assets/img/logo_admin.svg";
import logo2 from "../../assets/img/logo_teacher.svg";
import { Button, Body } from "../../components";
import { Input, Form, Alert } from "antd";
import { useLocation } from "react-router";
import useAuthen from "../../hooks/useAuthen";

export const Login = () => {
  const [form] = Form.useForm();
  const { onLogin, onAdminLogin, message, loading } = useAuthen();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  const isAdmin = window.location.host.split(".")[0] === "admin";

  return (
    <div className={isAdmin ? styles.page : css(styles.page, styles.teacher)}>
      <Helmet>
        <title>Login - OBED</title>
      </Helmet>
      <div
        className={
          isAdmin ? styles.login : css(styles.login, styles.teacher)
        }
      >
        <div className={styles.loginBox}>
          <img
            src={isAdmin ? logo : logo2}
            alt="OBED"
            className={styles.logo}
          />
          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={(values) =>
              isAdmin
                ? onAdminLogin(
                    values.username,
                    values.password,
                    query.get("nextpage") || ""
                  )
                : onLogin(
                    values.username,
                    values.password,
                    query.get("nextpage") || ""
                  )
            }
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
              {!isAdmin && (
                <Body level={2} className={styles.infoText}>
                  To get the account please contact to OBED Administrator{" "}
                  <a href="mailto:administrator@obce.com">
                    administrator@obce.com
                  </a>{" "}
                  or <a href="tel:08X-XXX-XXXX">08X-XXX-XXXX</a>
                </Body>
              )}
            </div>
          </Form>
        </div>
        <img
          src={isAdmin ? img : img2}
          alt="login"
          className={styles.loginPic}
        />
      </div>
    </div>
  );
};
