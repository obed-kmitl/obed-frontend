import { useState } from 'react'
import {
  Header,
  Button,
  Input,
  Collapse,
  Panel,
} from "..";
import { Form, Table, Popconfirm, Typography, Modal, InputNumber, Upload, message } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleTwoTone,
  UploadOutlined,
  DownloadOutlined
} from '@ant-design/icons';

import styles from "./Standard.module.scss";
import excelReader from "../../utils/excelReader"

const standardList = [
  {
    id: 1,
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
          {
            subStandardNo: '6',
            subStandardName: "อธิบายหลักการพื้นฐานของความปลอดภัยของข้อมูล การเข้ารหัสข้อมูล",
          },
          {
            subStandardNo: '7',
            subStandardName: "อธิบายโครงสร้างและการทำงานของระบบปฏิบัติการ การจัดการทรัพยากรในระบบคอมพิวเตอร์ การทำงานระหว่างโพรเซส ระบบไฟล์ การทำงานแบบเครื่องจักรเสมือน (Virtualization) และการประมวลผลแบบคลาวด์ (Cloud Computing)",
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

            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              onClick={() => save(record.subStandardNo)}
              style={{
                marginRight: 14,
              }}
            >
              <SaveOutlined />
            </a>
            <Popconfirm title="Discard Changes?" onConfirm={() => cancel()} >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
              >
                <CloseCircleTwoTone twoToneColor="#FE0000" />
              </a>
            </Popconfirm>
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
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingTitleIndex, setEditingTitleIndex] = useState();
  const [editingNameIndex, setEditingNameIndex] = useState();
  const [addingStandardId, setAddingStandardId] = useState();
  const [fileUpLoadStdId, setFileUpLoadStdId] = useState();
  const [createStdForm] = Form.useForm();
  const [addStdForm] = Form.useForm();
  const [editTitleForm] = Form.useForm();
  const [editNameForm] = Form.useForm();

  function handleCreateSubmit(value) {
    console.log("Recieved values of form: ", value);
    setNewStdVisible(false);
    const genId = () => {
      var i = 1;
      const existId = standard.map((e) => e.id)
      console.log(existId);
      while (true) {
        if (existId.includes(i)) {
          i++;
        } else return i
      }
    }
    setStandard([...standard, { id: genId(), standardTitle: value.standardTitle, details: [] }])
    console.log(standard);
  }

  function handleCancel() {
    setNewStdVisible(false);
    setAddStdVisible(false);
    createStdForm.resetFields();
    addStdForm.resetFields();
  }

  const handleCreateStdBtn = () => {
    setNewStdVisible(true)
  }

  const handleAddStdBtn = (i) => {
    setAddStdVisible(true)
    setAddingStandardId(i)
  }

  function handleAddSubmit(value) {
    const i = addingStandardId;
    console.log("Recieved values of form: ", value, i);
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
    // setStandard(standard => {
    //   const sortedStandard = standard[].details.sort((a,b) => (a.standardNo> b.standardNo) ? 1 : ((b.standardNo > a.standardNo) ? -1 : 0))
    //   console.log(sortedStandard)
    // })
    console.log(standard)
    setAddingStandardId(null)
    setAddStdVisible(false);
    //setStandard([...standard, { standardTitle: value.standardTitle, details: [] }])
  }

  function handleDeleteTitle(id) {
    setStandard(standard.filter(item => item.id !== id))
  }
  function handleDeleteStandard(stdNo, id) {
    const index = standard.findIndex((item) => {
      return item.id === id
    })
    setStandard(prev => {
      return [
        ...prev.slice(0, index),
        {
          ...prev[index], details: prev[index].details.filter(item => item.standardNo !== stdNo)
        },
        ...prev.slice(index + 1)]
    });
  }

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    maxCount: 1,
    accept: ".xlsx,.xls",
    async onChange(info) {
      if (info.file.status === 'done') {
        const datafromExcel = await excelReader(info.file.originFileObj)
        getDetailsfromExcel(datafromExcel)
        console.log(datafromExcel)
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const getDetailsfromExcel = (data) => {
    //clear details to prevent confict
    setStandard(prev => {
      return [
        ...prev.slice(0, fileUpLoadStdId),
        {
          ...prev[fileUpLoadStdId], details: []
        },
        ...prev.slice(fileUpLoadStdId + 1)]
    });

    const getMainStandard = () => {
      const newArray = []
      const duplicate = []
      data.forEach(std => {
        if (!duplicate.includes(std.standardNo)) {
          newArray.push({ standardNo: std.standardNo.toString(), standardName: std.description, subStandard: [] })
          duplicate.push(std.standardNo)
          //console.log(newArray)
        }
      })
      return newArray;
    }
    const mainStandard = getMainStandard()

    const getSubStandard = () => {
      const newArray = []
      data.forEach(std => {
        newArray.push({ standardNo: std.standardNo.toString(), subStandardNo: std.subStdNo.toString(), subStandardName: std.subDescription })
      })
      return newArray;
    }
    const subStandards = getSubStandard()

    mainStandard.forEach(element => {
      const subStdList = subStandards.filter((item) => item.standardNo === element.standardNo)
      console.log(subStdList)
      subStdList.forEach(subStd => {
        element.subStandard.push({
          subStandardNo: subStd.subStandardNo,
          subStandardName: subStd.subStandardName,
        })
      })
      console.log(element)
    });
    console.log(mainStandard, subStandards)
    setStandard(prev => {
      return [
        ...prev.slice(0, fileUpLoadStdId),
        {
          ...prev[fileUpLoadStdId], details: mainStandard
        },
        ...prev.slice(fileUpLoadStdId + 1)]
    });
    console.log(standard)

  }

  const handleEditTitle = (title, i) => {
    setIsEditing(true)
    setEditingTitleIndex(i)
    console.log(title, i)
  }

  const handleEditTitleSubmit = (value) => {
    console.log(value)
    const i = editingTitleIndex
    setStandard(prev => {
      return [
        ...prev.slice(0, i),
        {
          ...prev[i], standardTitle: value.standardTitle
        },
        ...prev.slice(i + 1)]
    });
    setEditingTitleIndex(null);
    setIsEditing(false)
    editTitleForm.resetFields();
  }

  const handleEditName = (index, id) => {
    setIsEditingName(true)
    setEditingTitleIndex(index)
    setEditingNameIndex(id)
  }

  const handleEditNameSubmit = (values) => {
    // console.log(values)
    // const index = editingTitleIndex
    // const id = parseInt(standard[index].details.findIndex((item) => {
    //   return item.standardNo = editingNameIndex
    // }))
    // console.log(id)
    // // setStandard(prev => {
    // //   return [
    // //     ...prev.slice(0, index),
    // //     {
    // //       ...prev[index], details: [
    // //         ...prev[id].details.slice(0, id), {
    // //           standardNo: '1',
    // //           standardName: "ความรู้ทางด้านวิศวกรรม และพื้นฐานทางวิทยาศาสตร์",
    // //           subStandard: []
    // //         }
    // //         ,
    // //         ...prev.details.slice(0, id),
    // //       ]
    // //     },
    // //     ...prev.slice(index + 1)]
    // // });
    setEditingTitleIndex(null);
    setIsEditingName(false)
    setEditingNameIndex(null);
    editNameForm.resetFields();
    // console.log(standard)
  }


  return (
    <div>
      <div className={styles.tabHead}>
        <Header level={2}>Education Standard</Header>
        <div>
          <Button onClick={() => handleCreateStdBtn()} disabled={isEditing}>Create New Standard</Button>
        </div>
      </div>
      <Collapse accordion collapsible={isEditing && "disabled"}>
        {standard.map((item, index) =>
          <Panel
            header={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {editingTitleIndex === index && isEditing ?
                  <>
                    <Form
                      form={editTitleForm}
                      name="editTitle"
                      autoComplete="off"
                      requiredMark="optional"
                      layout="inline"
                      style={{ width: "100%", marginRight: "0.5rem", alignItems: "center" }}
                      onFinish={handleEditTitleSubmit}
                      onClick={(e) => { e.stopPropagation() }}

                    >
                      <Form.Item
                        initialValue={item.standardTitle}
                        name="standardTitle"
                        style={{ width: "80%", marginBottom: 0, marginRight: "5px", alignItems: "center" }}
                        rules={[{ required: true, message: "Please input name!" }]}
                      >
                        <Input defaultValue={item.standardTitle} />
                      </Form.Item>
                      <Button
                        type="secondary"
                        htmlType="submit"
                        style={{ marginRight: "5px" }}
                      >
                        save
                      </Button>
                      <Button
                        danger
                        onClick={() => {
                          setEditingTitleIndex(null);
                          setIsEditing(false)
                          editTitleForm.resetFields();
                        }}
                      >
                        cancel
                      </Button>
                    </Form>
                  </>
                  : <Header level={4} >{item.standardTitle}</Header>
                }
                {!(editingTitleIndex === index && isEditing) &&
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>

                    <Typography.Link
                      disabled={isEditing}
                      onClick={(e) => { e.stopPropagation(); handleEditTitle(item.standardTitle, index) }}
                    >
                      <EditOutlined />
                    </Typography.Link>

                    <Popconfirm
                      title="Are you sure to delete ?"
                      onConfirm={(e) => { handleDeleteTitle(item.id); e.stopPropagation() }}
                      onCancel={(e) => e.stopPropagation()}
                    >
                      <Typography.Link
                        onClick={(e) => { e.stopPropagation() }}
                        disabled={isEditing}
                        type="danger"
                      >
                        <DeleteOutlined />
                      </Typography.Link>
                    </Popconfirm>
                  </div>
                }
              </div>
            }
            key={index}
          >
            <div className={styles.topRightBtn} >
              <Button icon={<DownloadOutlined />} onClick={() => message.error(`ยังไม่มีให้โหลดนะจ๊ะ`)}>Download Template</Button>
              <Upload {...uploadProps} >
                <Button icon={<UploadOutlined />} onClick={() => setFileUpLoadStdId(index)} >Upload Data</Button>
              </Upload>
              <Button onClick={() => handleAddStdBtn(index)}>Add</Button>
            </div>
            <Collapse accordion>
              {item.details.map((ele, i) =>
                <Panel
                  header={
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
                        {editingTitleIndex === index && editingNameIndex === i && isEditingName ?
                          <>
                            <Form
                              form={editNameForm}
                              name="editName"
                              autoComplete="off"
                              requiredMark="optional"
                              layout="inline"
                              style={{ width: "100%", marginRight: "0.5rem" }}
                              onFinish={handleEditNameSubmit}
                              onClick={(e) => { e.stopPropagation() }}

                            >
                              <Form.Item
                                initialValue={ele.standardNo}
                                name="standardNo"
                                style={{ width: "60px", marginBottom: 0, marginRight: "5px" }}
                                rules={[{ required: true, message: "Please input name!" }]}
                              >
                                <Input defaultValue={ele.standardNo} />
                              </Form.Item>
                              <Form.Item
                                initialValue={ele.standardName}
                                name="standardName"
                                style={{ width: "75%", marginBottom: 0 }}
                                rules={[{ required: true, message: "Please input name!" }]}
                              >
                                <Input defaultValue={ele.standardName} />
                              </Form.Item>
                              <Form.Item >
                                <Button
                                  type="secondary"
                                  htmlType="submit"
                                >
                                  save
                                </Button>
                              </Form.Item>
                            </Form>
                          </>
                          :
                          <>
                            <Header level={5} >{ele.standardNo}{' '}</Header>
                            <Header level={5} >{ele.standardName}</Header>
                          </>
                        }

                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Typography.Link
                          disabled={isEditingName || isEditing}
                          onClick={(e) => { e.stopPropagation(); handleEditName(index, i) }}
                        >
                          <EditOutlined />
                        </Typography.Link>
                        <Popconfirm
                          title="Are you sure to delete ?"
                          onConfirm={(e) => { handleDeleteStandard(ele.standardNo, item.id); e.stopPropagation() }}
                          onCancel={(e) => e.stopPropagation()}
                        >
                          <Typography.Link
                            onClick={(e) => { e.stopPropagation() }}
                            disabled={isEditing || isEditingName}
                            type="danger"
                          >
                            <DeleteOutlined />
                          </Typography.Link>
                        </Popconfirm>
                      </div>
                    </div>}
                  key={i}
                >
                  <StandardTable standardNo={ele.standardNo} standard={ele.subStandard} />
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
                  const alreadyExistNo = standard[addingStandardId].details.map((e) => e.standardNo)
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
