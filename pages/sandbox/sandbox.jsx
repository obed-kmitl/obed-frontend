import Head from 'next/head';
import { Tabs } from 'antd';
import { MyBtn, MyTabs } from '../../components';
import styles from './sandbox.module.scss';

export default function Sandbox() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sandbox - OBED</title>
      </Head>
      <h1><strong>OB</strong>ED SANDBOX</h1>
      <p>Button</p>
      <div className={styles.btnContainer}>
        <MyBtn type="primary" onClick={() => alert('Clicked')}>Primary</MyBtn>
        <MyBtn>Seccondary</MyBtn>
        <MyBtn type="primary" carrot>Primary</MyBtn>
        <MyBtn carrot>Seccondary</MyBtn>
        <MyBtn danger onClick={() => alert('Danger')}>Seccondary</MyBtn>
        <MyBtn disabled>Disabled</MyBtn>
      </div>
      <p>Tabs</p>
      <MyTabs defaultActiveKey="1">
        <Tabs.TabPane tab="Active" key="1">
      Content of Tab Active
        </Tabs.TabPane>
        <Tabs.TabPane tab="Archive" key="2">
      Content of Tab Archive
        </Tabs.TabPane>
        <Tabs.TabPane tab="อื่น ๆ" key="3">
      เนื้อหาของแท็บอื่น ๆ
        </Tabs.TabPane>
      </MyTabs>
    </div>
  );
}
