import styles from "./Login.module.scss";
import { Helmet } from "react-helmet";
import img from "../../assets/img/login_img.svg";
import logo from "../../assets/img/login_admin.svg";
import { Button } from "../../components";
import { Input, Form } from "antd";

export const Login = () => {
  const [form] = Form.useForm();
  function onFinish(values) {
    console.log("Success:", values);
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className={styles.form}>
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
              <Button type="primary" htmlType="submit" size="large">
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
