import styles from "./LearningOutcome.module.scss";
import { Helmet } from "react-helmet";
import { Header, Button, Input, TextArea } from "../../components";
import {
  Divider,
  Table,
  Modal,
  Form,
  Select,
  Tooltip,
  Popconfirm,
  notification,
  Tag,
  Space,
  InputNumber,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import httpClient from "../../utils/httpClient";
import { useParams } from "react-router-dom";

const mock = [
  {
    id: 1,
    title: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 10 ทั้งคิดและไม่คิดเครื่องหมาย",
    activity: ["Homework 1 ข้อ 1", "Homework 1 ข้อ 2"],
    plo: [1.1, 1.2],
    tqf: [1.1, 1.2, 1.3, 2.1, 6.1],
  },
  {
    id: 2,
    title: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 16 ทั้งคิดและไม่คิดเครื่องหมาย",
    activity: ["Homework 1 ข้อ 3", "Homework 1 ข้อ 4"],
    plo: [1.1, 1.2, 1.5],
    tqf: [1.1, 1.2, 1.3, 2.1, 6.1],
  },
];

const mockPLO = [
  {
    id: 1.1,
    desc: "1.1",
  },
  {
    id: 1.2,
    desc: "1.2",
  },
  {
    id: 1.3,
    desc: "1.3",
  },
  {
    id: 1.4,
    desc: "2.1",
  },
  {
    id: 1.5,
    desc: "2.2",
  },
  {
    id: 1.6,
    desc: "2.3",
  },
  {
    id: 1.7,
    desc: "2.4",
  },
];

export const LearningOutcome = () => {
  const { Option } = Select;
  const { Column } = Table;
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [clo, setClo] = useState()
  const [plo, setPlo] = useState()
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  let { sectionId } = useParams();

  async function fetchClo() {
    return await httpClient
      .get(`/clo/getAllBySection/${sectionId}`)
      .then((res) => {
        console.log(res.data.data)
        setClo(res.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchPlo() {
    return await httpClient
      .get(`/mapStandard/getRelativeStandardBySection/${sectionId}`)
      .then((res) => {
        setPlo(res.data.data)
        //console.log(res.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function openNotificationWithIcon(type, message, desc) {
    notification[type]({
      message: message,
      description: desc,
      duration: type === "error" ? 15 : 5,
    });
  }

  async function handleAdd(values) {
    // console.log("Recieved values of form: ", values);
    return await httpClient
      .post(`/clo/create`,
        {
          section_id: parseInt(sectionId),
          detail: values.detail,
          order_number: values.order_number
        }
      )
      .then((res) => {
        setClo([...clo, res.data.data])
        setAddVisible(false)
        //console.log(res.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleEdit(values) {
    //console.log("Recieved values of form: ", values);
    return await httpClient
      .put(`/clo/update/${values.clo_id}`,
        {
          detail: values.detail,
          order_number: values.order_number,
          relative_standards: values.relative_sub_standards
        }
      )
      .then((res) => {
        const index = clo.findIndex((e)=>e.clo_id === values.clo_id)
        let editClo = [...clo]
        editClo[index] = res.data.data
        setClo(editClo)
        setEditVisible(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCancel() {
    editForm.resetFields();
    setSelectedData(null);
    setEditVisible(false);
    setAddVisible(false);
    // setMessage("");
  }

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  async function deleteLO(values) {
    return await httpClient
    .delete(`/clo/remove/${values.clo_id}`)
    .then((res) => {
      setClo(clo.filter((e)=>e.clo_id !==values.clo_id))
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchClo();
    fetchPlo();
  }, []);


  return (
    <div>
      <Helmet>
        <title>Learning Outcome - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Course Learning Outcome</Header>
        <div>
          <Button onClick={() => setAddVisible(true)}>Add</Button>
        </div>
      </div>
      <Divider />
      <Table
        dataSource={clo}
        rowKey="id"
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
        bordered
      >
        <Column
          title="No."
          dataIndex="index"
          key="index"
          width="60px"
          render={(value, item, index) => (page - 1) * 10 + index + 1}
        />
        <Column
          title="Learning Outcomes"
          dataIndex="detail"
          key="title"
          width="100%"
        />
        <Column
          title="PLO"
          dataIndex="relative_sub_standards"
          key="relative_sub_standards"
          width="100px"
          render={(plo) => {
            const moreList = plo?.map((ele, i) => {
              if (i >= 3) return <Tag key={ele.sub_std_id}>{ele.group_sub_order_number + "." + ele.sub_order_number}</Tag>;
            });
            return (
              <>
                {plo?.map((ele, i) => {
                  if (i < 3) return <Tag key={ele.sub_std_id}>{ele.group_sub_order_number + "." + ele.sub_order_number}</Tag>;
                  return null;
                })}
                {plo?.length > 3 && (
                  <Tooltip title={moreList} placement="right">
                    <Tag>+{plo.length - 3} more</Tag>
                  </Tooltip>
                )}
              </>
            );
          }}
        />
        <Column
          title="มคอ.2"
          dataIndex="main_sub_standards"
          key="main_sub_standards"
          width="100px"
          render={(tqf) => {
            const moreList = tqf.map((ele, i) => {
              if (i >= 3) return <Tag key={ele.sub_std_id}>{ele.group_sub_order_number + "." + ele.sub_order_number}</Tag>;
            });
            return (
              <>
                {tqf.map((ele, i) => {
                  if (i < 3) return <Tag key={ele.sub_std_id}>{ele.group_sub_order_number + "." + ele.sub_order_number}</Tag>;
                  return null;
                })}
                {tqf.length > 3 && (
                  <Tooltip title={moreList} placement="right">
                    <Tag>+{tqf.length - 3} more</Tag>
                  </Tooltip>
                )}
              </>
            );
          }}
        />
        <Column
          title="Action"
          key="action"
          width="30px"
          render={(ele, record) => (
            <Space size="small">
              <Tooltip title="Edit">
                <a
                  href="#"
                  onClick={() => {
                    editForm.setFieldsValue({
                      clo_id: record.clo_id,
                      detail: record.detail,
                      order_number: record.order_number,
                      relative_sub_standards: record?.relative_sub_standards.map((e) => e.sub_std_id) || null
                    });
                    setEditVisible(true);
                    console.log(record?.relative_sub_standards.map((e) => e.sub_std_id) || null)
                  }}
                  style={{
                    fontSize: "18px",
                    color: "#009FC7",
                  }}
                >
                  <EditOutlined />
                </a>
              </Tooltip>
              <Tooltip title="Delete">
                <Popconfirm
                  title="Sure to delete this learning outcome?"
                  onConfirm={() => deleteLO(record)}
                >
                  <a
                    href="#"
                    style={{
                      fontSize: "18px",
                      color: "#C73535",
                    }}
                  >
                    <DeleteOutlined />
                  </a>
                </Popconfirm>
              </Tooltip>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Add Learning Outcome"
        visible={addVisible}
        okText="Add"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleAdd(values);
            })
            .catch((info) => {
              console.log("Validate Failed", info);
            });
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ htmlType: "submit" }}
        maskClosable={false}
        centered
      >
        <Form
          form={form}
          name="lo"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={"required"}
        >
          <Form.Item
            label="No."
            name="order_number"
            rules={[
              { required: true, message: "Please input No." },
            ]}
          >
            <InputNumber min={0} placeholder="No." />
          </Form.Item>
          <Form.Item
            label="Learning Outcome"
            name="detail"
            rules={[
              { required: true, message: "Please input learning outcome!" },
            ]}
          >
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>
          <Form.Item label="PLOs" name="plo">
            <Select mode="multiple" placeholder="PLO">
              {plo?.map((e) => (
                <Option value={e.sub_std_id} key={e.sub_std_id}>
                  {e.group_sub_order_number + "." + e.sub_order_number + " " + e.group_sub_title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Learning Outcome"
        visible={editVisible}
        okText="Save"
        onOk={() => {
          editForm
            .validateFields()
            .then((values) => {
              handleEdit(values);
            })
            .catch((info) => {
              console.log("Validate Failed", info);
            });
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ htmlType: "submit" }}
        maskClosable={false}
        centered
      >
        {/* {message !== "" && (
          <Alert
            style={{ marginBottom: "1rem" }}
            message={message}
            type="error"
            showIcon
          />
        )} */}
        <Form
          form={editForm}
          name="lo"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={"required"}
        >
          <Form.Item name="clo_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="No."
            name="order_number"
            rules={[
              { required: true, message: "Please input No." },
            ]}
          >
            <InputNumber min={0} placeholder="No." />
          </Form.Item>
          <Form.Item
            label="Learning Outcome"
            name="detail"
            rules={[
              { required: true, message: "Please input learning outcome!" },
            ]}
          >
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>
          <Form.Item label="PLOs" name="relative_sub_standards">
            <Select mode="multiple" placeholder="PLO">
              {plo?.map((e) => (
                <Option value={e.sub_std_id} key={e.sub_std_id}>
                  {e.group_sub_order_number + "." + e.sub_order_number + " " + e.group_sub_title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div >
  );
};
