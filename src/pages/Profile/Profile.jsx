import styles from './Profile.module.scss';
import { Helmet } from 'react-helmet';
import { Header, Button, Input, Option,Body } from "../../components";
import { Divider, Form, Select } from "antd";
import { LinkOutlined } from '@ant-design/icons';
import { useProfileFrom } from './hooks/useProfile';
import { usePassword } from './hooks/usePassword';

export const Profile = () => {
  const [profileForm,isProfileEditing, handleEdit, handleCancelProfile, handleSaveProfile] = useProfileFrom();
  const [passwordForm, handleChangePassword] = usePassword();

  const selectBefore = (
    <Form.Item name="prefix" noStyle>
      <Select
        className="select-before"
        style={{ width: "85px" }}
        placeholder="Prefix"
        disabled={!isProfileEditing}
      >
        <Option value='PROF_DR'>ศ.ดร.</Option>
        <Option value='PROF'>ศ.</Option>
        <Option value='ASSOC_PROF_DR'>รศ.ดร.</Option>
        <Option value='ASSOC_PROF'>รศ.</Option>
        <Option value=' ASST_PROF_DR'>ผศ.ดร.</Option>
        <Option value='ASST_PROF'>ผศ.</Option>
        <Option value='DR'>ดร.</Option>
        <Option value='INSTRUCTOR'>อ.</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className={styles.profile}>
      <Helmet>
        <title>Profile - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Profile</Header>
        {!isProfileEditing && <Button onClick={() => handleEdit()}>Edit</Button>}
      </div>
      <Divider />
      <Form
        form={profileForm}
        name="profile"
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={handleSaveProfile}
        autoComplete="off"
        requiredMark={"required"}
      >
        <div className={styles.flexrow}>
          <Form.Item
            label="Firstname"
            name="firstname"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input firstname!" }]}
          >
            <Input disabled={!isProfileEditing} placeholder="Firstname" addonBefore={selectBefore} />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastname"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input lastname!" }]}
          >
            <Input disabled={!isProfileEditing} placeholder="Lastname" />
          </Form.Item>
        </div>
        <div className={styles.flexrow}>
          <Form.Item
            label="Email"
            name="email"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input email!" }, { type: "email" }]}
          >
            <Input disabled={!isProfileEditing} placeholder="Email" />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
          >
          </Form.Item>
        </div>
        {isProfileEditing ?
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <Button onClick={() => handleCancelProfile()}>Cancel</Button>
              <Button type="primary" htmlType="submit" >Save</Button>
            </div>
          </Form.Item>
          : null
        }
      </Form>
      <div className={styles.head}>
        <Header level={1}>Password</Header>
      </div>
      <Divider />
      {/* {isChangePassword ? */}
        <Form
          form={passwordForm}
          name="password"
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={handleChangePassword}
          autoComplete="off"
          requiredMark={"required"}
        >
          <div className={styles.flexrow}>
            <Form.Item
              label="Current Password"
              name="oldPassword"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please input Current Password!" }]}
            >
              <Input placeholder="Current Password" password />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
            >
            </Form.Item>
          </div>
          <div className={styles.flexrow}>
            <Form.Item
              label="New Password"
              name="newPassword"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please input New Password!" }]}
            >
              <Input placeholder="New Password" password />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirmNewPassword"
              style={{ width: "100%" }}
              rules={[
                { required: true, message: "Please Confirm New Password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The Confirm Password does not match!'));
                  },
                }),

              ]}
            >
              <Input placeholder="New Password" password />
            </Form.Item>
          </div>
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              {/* <Button onClick={() => handleCancelPassword()}>Cancel</Button> */}
              <Button type="primary" htmlType="submit" >Change Password</Button>
            </div>
          </Form.Item>
        </Form> 
        {/*  :
        <Button style={{ marginBottom: "2rem" }} type="primary" onClick={() => setIsChangePassword(true)}>Change Password</Button>

      } */}
      <div className={styles.head}>
        <Header level={1}>Google Account</Header>
      </div>
      <Divider />
      <Button style={{ marginBottom: "2rem" }} type="primary">Link with Google Account<LinkOutlined /></Button>
      <div className={styles.flexrow}>
      <Body>Linked with john.doe@kmitl.ac.th</Body>
      <Button  type="primary">Unlink</Button>
      </div>
    </div>
  );
};
