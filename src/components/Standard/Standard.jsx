import { useState } from 'react'
import {
  Header,
  Body,
  Button,
  Option,
  Select,
  Input,
  Collapse,
  Panel,
} from "..";
import { Form, Table, Popconfirm, Typography } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleTwoTone,
} from '@ant-design/icons';

import styles from "./Standard.module.scss";

const standard = [
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
            <Popconfirm title="Delete this section?" onConfirm={() => deleteSection(record)}>
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

  const handleAdd = () => {
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
      <div style={{ width: "100%", padding: "10px 0", display: 'flex', justifyContent: "flex-end", gap: '1rem' }}>
        <Button type="secondary" disabled={editingKey !== "" || isNewAdded === true} onClick={() => handleAdd()}>Add Section</Button>
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
  return (
    <div>
      <div className={styles.tabHead}>
        <Header level={2}>Education Standard</Header>
        <div>
          <Button>Create</Button>
        </div>
      </div>
      <Collapse accordtion>
        {standard.map((e, i) =>
          <Panel
            header={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Header level={4} >{i + 1}{' '}{e.standardTitle}</Header>
                <div style={{ display: "flex", alignItems: "center" }}>
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
            <Collapse>
              {e.details.map((e, i) =>

                <Panel
                  header={
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Header level={4} >{e.standardNo}{' '}{e.standardName}</Header>
                      <div style={{ display: "flex", alignItems: "center" }}>
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

    </div>
  )
}
