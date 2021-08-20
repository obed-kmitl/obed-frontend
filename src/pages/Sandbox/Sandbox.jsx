import {
  Button, Tabs, TabPane, Header, Body,
} from '../../components';
import styles from './Sandbox.module.scss';
import { Helmet } from 'react-helmet';

export const Sandbox = () => {
  return(
    <div className={styles.container}>
      <Helmet>
        <title>Sandbox - OBED</title>
      </Helmet>
      <h1><strong>OB</strong>ED SANDBOX</h1>
      <p>Button</p>
      <div className={styles.btnContainer}>
        <Button type="primary" onClick={() => alert('Clicked')}>Primary</Button>
        <Button>Seccondary</Button>
        <Button type="primary" carrot>Primary</Button>
        <Button carrot>Seccondary</Button>
        <Button danger onClick={() => alert('Danger')}>Danger</Button>
        <Button disabled>Disabled</Button>
      </div>
      <p>Tabs</p>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Active" key="1">
      Content of Tab Active
        </TabPane>
        <TabPane tab="Archive" key="2">
      Content of Tab Archive
        </TabPane>
        <TabPane tab="อื่น ๆ" key="3">
      เนื้อหาของแท็บอื่น ๆ
        </TabPane>
      </Tabs>
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
  )
}