import styles from "./LearningOutcome.module.scss";
import { Helmet } from "react-helmet";
import { Header, Button, Input } from "../../components";
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
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
  RightOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const mock = [
  {
    id: 1,
    title: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 10 ทั้งคิดและไม่คิดเครื่องหมาย",
    activity: [1, 2],
    plo: [1.1, 1.2],
    tqf: [1.1, 1.2, 1.3],
  },
];

export const LearningOutcome = () => {
  const { Column } = Table;
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editVisible, setEditVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  function deleteLO(values) {
    // Do Something
  }

  return (
    <div>
      <Helmet>
        <title>Learning Outcome - OBED</title>
      </Helmet>
      <div className={styles.head}>
        <Header level={1}>Course Learning Outcome</Header>
        <div>
          <Button>Add</Button>
        </div>
      </div>
      <Divider />
      <Table
        dataSource={mock}
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
          dataIndex="title"
          key="lo"
          width="400px"
        />
        <Column
          title="Activity"
          dataIndex="activity"
          key="activity"
          width="300px"
        />
        <Column
          title="PLO"
          dataIndex="plo"
          key="plo"
          width="100px"
          render={(plo) =>
            plo.map((ele) => (
              <Tag key={ele} closable>
                {ele}
              </Tag>
            ))
          }
        />
        <Column
          title="มคอ.2"
          dataIndex="tqf"
          key="tqf"
          width="100px"
          render={(tqf) => tqf.map((ele) => <Tag key={ele}>{ele}</Tag>)}
        />
        <Column
          title="Action"
          key="action"
          width="30px"
          render={(ele, record) => (
            <Space size="large">
              <Tooltip title="Edit">
                <a
                  href="#"
                  onClick={() => {
                    editForm.setFieldsValue(record);
                    setSelectedData(record);
                    setEditVisible(true);
                  }}
                  style={{
                    fontSize: "20px",
                    color: "#009FC7",
                  }}
                >
                  <EditOutlined />
                </a>
              </Tooltip>
              <Tooltip title="Delete">
                <Popconfirm
                  title="Sure to delete this student?"
                  onConfirm={() => deleteLO(record)}
                >
                  <a
                    href="#"
                    style={{
                      fontSize: "20px",
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
    </div>
  );
};
