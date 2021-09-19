import { useState } from 'react'
import {
  Header,
  Button,
  Input,
  Collapse,
  Panel,
} from "..";
import { Form, Table, Popconfirm, Typography, Modal,InputNumber } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleTwoTone,
} from '@ant-design/icons';

import styles from "./Standard.module.scss";

const standardList = [
  {
    standardTitle: "ผลการเรียนรู้ระดับหลักสูตร (PLOs : Program-Level Learning Outcomes)",
    details: [
      {
        standardNo: '1',
        standardName: "ความรู้ทางด้านวิศวกรรม และพื้นฐานทางวิทยาศาสตร์",
        subStandard: [
          {
            subStandardNo: '1',
            subStandardName: "ประยุกต์ใช้ความรู้ด้านคณิตศาสตร์ วิทยาศาสตร์ สถิติและความน่าจะเป็น รวมทั้งคณิตศาสตร์ไม่ต่อเนื่อง กับงานด้านวิศวกรรมคอมพิวเตอร์",
          },
          {
            subStandardNo: '2',
            subStandardName: "ประยุกต์ใช้ความรู้ด้านการวิเคราะห์วงจรไฟฟ้าพื้นฐาน วงจรและอุปกรณ์อิเล็กทรอนิกส์กับการเชื่อมต่อไมโครคอนโทรลเลอร์",
          },
          {
            subStandardNo: '3',
            subStandardName: "ประยุกต์ใช้ภาษาโปรแกรม การโปรแกรมเชิงวัตถุ โครงสร้างข้อมูล การวิเคราะห์อัลกอริทึมเบื้องต้น เพื่อจัดการกับปัญหาโดยวิธีการทางซอฟต์แวร์",
          },
          {
            subStandardNo: '4',
            subStandardName: "อธิบายโครงสร้าง องค์ประกอบ และการทำงานระดับฮาร์ดแวร์ของคอมพิวเตอร์ รวมถึงวงจรดิจิตอลพื้นฐาน",
          },
          {
            subStandardNo: '5',
            subStandardName: "อธิบายการส่งข้อมูลทั้งแอนะล็อกและดิจิตอล อุปกรณ์ ตัวกลาง มัลติเพล็กซ์ สวิตซ์ การส่งข้อมูลแบบเฟรม การตรวจสอบและแก้ไขความผิดพลาด การควบคุมการไหลของข้อมูลการหาเส้นทาง รวมทั้งเครือข่ายอีเทอร์เน็ต และเครือข่ายไอพี ทั้งแบบใช้สายและไร้สาย",
          },
        ]
      }, {
        standardNo: '2',
        standardName: "การวิเคราะห์ปัญหาทางวิศวกรรม",
        subStandard: [
          {
            subStandardNo: '1',
            subStandardName: "วิเคราะห์ปัญหาทางวิศวกรรมคอมพิวเตอร์ เข้าใจปัญหาและอธิบายความต้องการ และสามารถระบุข้อกำหนดของปัญหา โดยใช้วิธีการทางวิศวกรรม",
          },
          {
            subStandardNo: '2',
            subStandardName: "ค้นคว้าเพื่อค้นหาแนวทางหรือวิธีการในการแก้ไขปัญหา แสดงข้อเปรียบเทียบระหว่างแนวทางหรือวิธีการในการแก้ไขปัญหา แสดงเหตุผลในการเลือกแนวทางในการแก้ไขปัญหา",
          },
        ]
      }, {
        standardNo: '3',
        standardName: "การออกแบบและพัฒนาเพื่อหาคำตอบของปัญหา",
        subStandard: []
      }, {
        standardNo: '4',
        standardName: "การพิจารณาตรวจสอบ",
        subStandard: []
      }, {
        standardNo: '5',
        standardName: "การใช้อุปกรณ์เครื่องมือทันสมัย",
        subStandard: []
      }
    ]
  }

]
const StandardTable = ({ standard = [], standardNo }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(standard);
  const [editingKey, setEditingKey] = useState("");
  const [isNewAdded, setIsNewAdded] = useState(false);

  const isEditing = (record) => record.subStandardNo === editingKey;

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            hasFeedback
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
              {
                validator: (rule, value, callback) => {
                  const alreadyExistNo = data.map((e) => e.subStandardNo).filter((e) => e !== record.subStandardNo)
                  if (inputType === "number") {
                    if (alreadyExistNo.includes(value)) {
                      return Promise.reject("Already exist!")
                    }
                    if (isNaN(value) || value.includes(".")) {
                      return Promise.reject("Enter number!")
                    }
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const columns = [

    {
      title: "No.",
      dataIndex: "subStandardNo",
      key: "subStandardNo",
      width: 100,
      editable: true,
      render: (subStandardNo) => {
        return standardNo + '.' + subStandardNo
      }

    },
    {
      title: "Description",
      dataIndex: "subStandardName",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 80,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Popconfirm title="Save Changes?" onConfirm={() => save(record.subStandardNo)}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                style={{
                  marginRight: 14,
                }}
              >
                <SaveOutlined />
              </a>
            </Popconfirm>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              onClick={cancel}
            >
              <CloseCircleTwoTone twoToneColor="#FE0000" />
            </a>

          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== "" || isNewAdded === true}
              onClick={() => edit(record)}
              style={{
                marginRight: 12,
              }}
            >
              <EditOutlined />
            </Typography.Link>
            <Popconfirm title="Delete this standard?" onConfirm={() => deleteSection(record)}>
              <Typography.Link
                disabled={editingKey !== "" || isNewAdded === true}
                type="danger"
              >
                <DeleteOutlined />
              </Typography.Link>
            </Popconfirm>
          </>

        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "subStandardNo"
          ? "number"
          : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAddSubStd = () => {
    //console.log(data)
    setIsNewAdded(true)
    const newData = { subStandardNo: '', subStandardName: '' };
    setData([...data, newData]);
    form.setFieldsValue({
      subStandardNo: "",
      subStandardName: "",
    });
    setEditingKey(newData.subStandardNo);
  };

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.subStandardNo);
  };

  const cancel = () => {
    setEditingKey("");
    if (isNewAdded) {
      setData(data.slice(0, data.length - 1))
      setIsNewAdded(false)
    }
  };

  const save = async (subStandardNo) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => subStandardNo === item.subStandardNo);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
      if (isNewAdded) {
        setIsNewAdded(false);
      }

    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  }

  const deleteSection = (record) => {
    setData(data.filter((standard) => standard.subStandardNo !== record.subStandardNo));
  }

  return (
    <>
      <div className={styles.topRightBtn}>
        <Button type="secondary" disabled={editingKey !== "" || isNewAdded === true} onClick={() => handleAddSubStd()}>Add</Button>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
          rowKey="subStandardNo"
          onRow={() => ({ className: styles.editableCell })}
        />
      </Form>
    </>
  )

}

export const Standard = () => {
  const [standard, setStandard] = useState(standardList);
  const [newStdVisible, setNewStdVisible] = useState(false);
  const [addStdVisible, setAddStdVisible] = useState(false);
  const [editingStdId, setEditingStdId] = useState();
  const [createStdForm] = Form.useForm();
  const [addStdForm] = Form.useForm();

  function handleCreateSubmit(value) {
    console.log("Recieved values of form: ", value);
    setNewStdVisible(false);
    setStandard([...standard, { standardTitle: value.standardTitle, details: [] }])
  }

  function handleCancel() {
    setNewStdVisible(false);
    setAddStdVisible(false)
    createStdForm.resetFields();
    addStdForm.resetFields();

  }

  const handleCreateStdBtn = () => {
    setNewStdVisible(true)
  }

  const handleAddStdBtn = (i) => {
    setAddStdVisible(true)
    setEditingStdId(i)
  }

  function handleAddSubmit(value) {
    console.log("Recieved values of form: ", value);
    const i = editingStdId;
    setStandard(prev => {
      return [
        ...prev.slice(0, i),
        {
          ...prev[i], details: [...prev[i].details, {
            standardNo: value.standardNo,
            standardName: value.standardName,
            subStandard: []
          }]
        },
        ...prev.slice(i + 1)]
    });
    setAddStdVisible(false);
    //setStandard([...standard, { standardTitle: value.standardTitle, details: [] }])
  }


  return (
    <div>
      <div className={styles.tabHead}>
        <Header level={2}>Education Standard</Header>
        <div>
          <Button onClick={() => handleCreateStdBtn()}>Create New Standard</Button>
        </div>
      </div>
      <Collapse accordion>
        {standard.map((e, i) =>
          <Panel
            header={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Header level={4} >{e.standardTitle}</Header>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div onClick={(e) => { e.stopPropagation() }}><EditOutlined /></div>
                  {/* <Popconfirm
                    title="Are you sure to delete this course?"
                    onConfirm={(e) => { handleDeleteCourse(item); e.stopPropagation() }}
                    onCancel={(e) => e.stopPropagation()}
                  > */}
                  <div onClick={(e) => { e.stopPropagation() }}><DeleteOutlined /></div>
                  {/* </Popconfirm> */}
                </div>
              </div>}
            key={i}
          >
            <div className={styles.topRightBtn} >
              <Button onClick={() => handleAddStdBtn(i)}>Add</Button>
            </div>
            <Collapse accordion>
              {e.details.map((e, i) =>
                <Panel
                  header={
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Header level={5} >{e.standardNo}{' '}{e.standardName}</Header>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div onClick={(e) => { e.stopPropagation() }}><EditOutlined /></div>
                        {/* <Popconfirm
                    title="Are you sure to delete this course?"
                    onConfirm={(e) => { handleDeleteCourse(item); e.stopPropagation() }}
                    onCancel={(e) => e.stopPropagation()}
                  > */}
                        <div onClick={(e) => { e.stopPropagation() }}><DeleteOutlined /></div>
                        {/* </Popconfirm> */}
                      </div>
                    </div>}
                  key={i}
                >
                  <StandardTable standardNo={e.standardNo} standard={e.subStandard} />
                </Panel>

              )}</Collapse>
          </Panel>

        )}
      </Collapse>
      <Modal
        title="Create New Standard"
        visible={newStdVisible}
        okText="Create"
        onOk={() => {
         createStdForm
            .validateFields()
            .then((value) => {
              createStdForm.resetFields();
              handleCreateSubmit(value);
            })
            .catch((info) => {
              console.log("Validate Failed", info);
            });
        }}
        onCancel={handleCancel}
        okButtonProps={{ htmlType: "submit" }}
        maskClosable={false}
        width="700px"
      >
        <Form
          form={createStdForm}
          name="Standard"
          layout="vertical"
          autoComplete="off"
          requiredMark={"required"}
        >
          <Form.Item
            label="New Standard Name"
            name="standardTitle"
            rules={[
              { required: true, message: "Please input Standard Name!" },
            ]}
          >
            <Input placeholder="Standard name" />
          </Form.Item>
        </Form>

      </Modal>

      <Modal
        title="Add Standard"
        visible={addStdVisible}
        okText="Add"
        onOk={() => {
          addStdForm
            .validateFields()
            .then((value) => {
              addStdForm.resetFields();
              handleAddSubmit(value);
            })
            .catch((info) => {
              console.log("Validate Failed", info);
            });
        }}
        onCancel={handleCancel}
        okButtonProps={{ htmlType: "submit" }}
        maskClosable={false}
        width="700px"
      >
        <Form
          form={addStdForm}
          name="theStandard"
          layout="vertical"
          autoComplete="off"
          requiredMark={"required"}
        >
          <Form.Item
            label="Standard No."
            name="standardNo"
            rules={[
              { required: true, message: "Please input Standard No.!" },
              {
                validator: (rule, value, callback) => {
                  const alreadyExistNo = standard[editingStdId].details.map((e) => e.standardNo)
                  console.log(alreadyExistNo)
                    if (alreadyExistNo.includes(value)) {
                      return Promise.reject("Already exist!")
                    }
                    
                   
                  
                  return Promise.resolve()
                }
              }
            ]}
          >
            <InputNumber stringMode min={1} width={100} placeholder="ex. 1,2,3,..." />
          </Form.Item>
          <Form.Item
            label="Standard Name"
            name="standardName"
            rules={[
              { required: true, message: "Please input Standard No.!" },
            ]}
          >
            <Input placeholder=" standard name" />
          </Form.Item>
        </Form>

      </Modal>
    </div>
  )
}
