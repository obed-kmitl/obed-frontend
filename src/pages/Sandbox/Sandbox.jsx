import {
  Button, Tabs, TabPane, Header, Body, Select, Input, Collapse, Panel, TableCard, Table
} from '../../components';

import styles from './Sandbox.module.scss';
import { Helmet } from 'react-helmet';

export const Sandbox = () => {
  const option = ["option1", "option2", "option3", "option4", "option5"]

  function handleSelectChange(value) {
    console.log(`selected ${value}`);
  }

  const titleSelector = ["Mr.", "Ms.", "Miss", "Prof.", "อ.", "ผศ.", "ดร."]
  const onSearch = value => console.log(value);

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const mock = {
    course_id: "01076001",
    course_name_en: "Introduction to Computer Engineering",
    course_name_th: "วิศวกรรมคอมพิวเตอร์เบื้องต้น",
    precourse_id: "01076002",
    plos: ["1.1","1.3","2.1"]
  }
  const mock2 = [{
    no: "ข้อ 1",
    description: "จงแปลงเลข 127 ฐาน 10 เป็นเลขฐาน 2",
    point: 2,
    los: [1, 2],
  },{
    no: "ข้อ 2",
    description: "จงแปลงเลข 1101101 ฐาน 2 (ไม่คิดเครื่องหมาย) เป็นเลขฐาน 10",
    point: 2,
    los: [1],
  },]
  const mockLO = [{
    id: 1,
    desc: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 10 ทั้งคิดและไม่คิดเครื่องหมาย"
  },{
    id: 2,
    desc: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 8 ทั้งคิดและไม่คิดเครื่องหมาย"
  },{
    id: 3,
    desc: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 16 ทั้งคิดและไม่คิดเครื่องหมาย"
  }]
  const mockCourseList = [{
    id: "01076001",
    course_name_en: "Introduction to Computer Engineering",
  },{
    id: "01076002",
    course_name_en: "Programming Fundamental",
  },{
    id: "01076003",
    course_name_en: "Circuits and Electronics",
  }]
  const mockPLO = [{
    id: "1.1",
    desc: "PLO 1.1"
  },{
    id: "1.2",
    desc: "PLO 1.2"
  },{
    id: "1.3",
    desc: "PLO 1.3"
  },{
    id: "2.1",
    desc: "PLO 2.1"
  }]


  return (
    <div className={styles.container}>
      <Helmet>
        <title>Sandbox - OBED</title>
      </Helmet>
      <h1><strong>OB</strong>ED SANDBOX</h1>
      <p>TableCard Type 1</p>
      <Table type={1} col1="Course ID" col2="Course Name" col3="Prerequisite" col4="PLO" col5="Action">
      <TableCard type={1} data={mock} course={mockCourseList} plo={mockPLO} />
      <TableCard type={1} course={mockCourseList} plo={mockPLO} edit />
      </Table>
      <p>TableCard Type 2</p>
      <Table type={2} col1="No." col2="Title" col3="Detail" col4="Outcome" col5="Point" col6="Action">
        {mock2.map((ele, i) => <TableCard type={2} data={ele} lo={mockLO} index={i+1} />)}
      <TableCard type={2} data={mock2} lo={mockLO} edit />
      </Table>
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
      Input
      <div className={styles.btnContainer}>
        <Input />
        <Input placeholder="placeholder" />
        <Input placeholder="placeholder" width="500px" />
        <Input placeholder="placeholder" password />
        <Input placeholder="placeholder" addonBefore={titleSelector} />
        <Input placeholder="placeholder" search onSearch={onSearch} />
      </div>
      Select
      <div className={styles.btnContainer}>
        <Select option={option} onChange={handleSelectChange} />
        <Select option={option} defaultValue="test" />
        <Select option={option} width="300px" onChange={handleSelectChange} />
        <Select option={option} mode="multiple" onChange={handleSelectChange} />
      </div>
      <p>Collapse</p>
      <Collapse>
        <Panel header={ <Header level={4} >This is panel nest panel</Header>} key="1">
          <p>{text}</p>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="This is panel header 2" key="1">
          <div style={{ width: "100%", padding: "10px 0", display: 'flex', justifyContent: "flex-end" }}>
            <Button type="primary" onClick={() => alert('Clicked')}>Primary</Button>
          </div>
          <Collapse defaultActiveKey="1">
            <Panel header="This is panel nest panel" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel nest panel" key="2">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
      <Collapse ghost>
        <Panel header={"This is panel header 3"} key="1">
          <p>{text}</p>
        </Panel>
      </Collapse>
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