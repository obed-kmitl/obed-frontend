import styles from './Profile.module.scss';
import { Helmet } from 'react-helmet';
import { Header, Button, Input, Option } from "../../components";
import {
  Divider,
  Table,
  Modal,
  Form,
  Select,
  Tooltip,
  Popconfirm,
  notification,
  Space,
} from "antd";
import { useGetProfile } from './hooks/useGetProfile';
import { useState, useEffect } from "react";
import { useProfileFrom } from './hooks/useProfileFrom';

export const Profile = () => {
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzNTg5ODk2LCJleHAiOjE2MzM1OTM0OTZ9.RC43BFTffeKuaISkTJkYlVzAIncPALpkekCsSkT6zgA"
  const [retrived, setRetrived, profileForm] = useGetProfile(accessToken);
  const [isProfileEditing, handleEdit, handleCancelProfile, handleSaveProfile] = useProfileFrom(retrived, profileForm,accessToken);

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
    <div className={styles.container}>
      <Helmet>
        <title>Profile - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Profile</Header>
        {!isProfileEditing && <Button onClick={() => handleEdit()}>Edit</Button>}
      </div>
      <Divider />
      <div className={styles.profile}>
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
              rules={[{ required: true, message: "Please input email!" }]}
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
      </div>
      <div className={styles.head}>
        <Header level={1}>Password</Header>
        <div>
          <Button>Edit</Button>
        </div>
      </div>
      <Divider />
      <div className={styles.head}>
        <Header level={1}>Google Account</Header>
      </div>
      <Divider />
    </div>
  )
}
