import Head from 'next/head';
import { Tabs } from 'antd';
import {
  MyBtn, MyTabs, Header, Body
} from '../../components';

//fix useLayoutEffect SSR warning
import dynamic from 'next/dynamic'
const MySelect = dynamic(
  () => import('../../components/Select/Select'),
  { ssr: false }
)

import styles from './sandbox.module.scss';

export default function Sandbox() {
  const option = ["option1","option2","option3","option4","option5"]

  function handleSelectChange(value) {
    console.log(`selected ${value}`);
  }

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
        <MyBtn danger onClick={() => alert('Danger')}>Danger</MyBtn>
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
      <p>Select</p>
      <div className={styles.selectContainer}>
      <MySelect option={option} onChange={handleSelectChange}/>
      <MySelect option={option} width="300px" onChange={handleSelectChange}/>
      <MySelect option={option} mode="multiple" onChange={handleSelectChange}/>
      </div>
      <p>Typo</p>
      <div className={styles.textContainer}>
        <div className={styles.left}>
          <Header level={1}>Heading 1 - 30px Med</Header>
          <Header level={2}>Heading 2 - 24px Med</Header>
          <Header level={3}>Heading 3 - 20px Med</Header>
          <Header level={4}>Heading 4 - 18px Med</Header>
          <Header level={5}>Heading 5 - 16px Med</Header>
          <Header level={6}>Heading 6 - 14px Med</Header>
        </div>
        <div className={styles.right}>
          <Body level={1}>Body 1 - 18px Reg</Body>
          <Body level={2}>Body 2 - 16px Reg</Body>
          <Body level={3}>Body 3 - 14px Reg</Body>
          <Body level={4}>Body 4 - 12px Reg</Body>
          {/* <Text level="c1">Caption 1 - 14px Light</Text>
          <Text level="c2">Caption 2 - 12px Light</Text> */}
        </div>
      </div>
    
     
    </div>
  );
}
