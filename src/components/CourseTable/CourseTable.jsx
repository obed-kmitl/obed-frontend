import { useState } from "react";
import { Select, Option } from "..";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Typography,
  Tag,
  Tooltip,
  Space,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { useCourse } from "../../hooks/useCourse";

export const CourseTable = ({ course = [{}], setFilteredCourse }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(course);
  const [editingKey, setEditingKey] = useState("");
  const { updateCourse, removeCourse } = useCourse();

  const isEditing = (record) => record.course_id === editingKey;
  const mockPLO = [
    {
      id: 1.1,
      desc: "PLO 1.1",
    },
    {
      id: 1.2,
      desc: "PLO 1.2",
    },
    {
      id: 1.3,
      desc: "PLO 1.3",
    },
    {
      id: 2.1,
      desc: "PLO 2.1",
    },
    {
      id: 2.2,
      desc: "PLO 2.1",
    },
    {
      id: 2.3,
      desc: "PLO 2.1",
    },
    {
      id: 2.4,
      desc: "PLO 2.1",
    },
  ];
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
    let inputNode;
    switch (inputType) {
      case "plo":
        inputNode = (
          <Select mode="multiple" showSearch placeholder="Select PLO">
            {mockPLO.map((ele, i) => (
              <Option key={i} value={ele.id}>
                {ele.id}
              </Option>
            ))}
          </Select>
        );
        break;
      case "prereq":
        inputNode = (
          <Select showSearch placeholder="Select Prerequisite Course">
            <Option value={null}>None</Option>
            {data.map((ele) => {
              if (ele.course_id !== editingKey)
                return (
                  <Option key={ele.course_id} value={ele.course_id}>
                    {ele.course_id}&nbsp;{ele.course_name_en}
                  </Option>
                );
              return null;
            })}
          </Select>
        );
        break;
      default:
        inputNode = <Input />;
        break;
    }
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: false,
                message: `Please Input ${title}!`,
              },
              {
                validator: (rule, value, callback) => {
                  const alreadyExistNo = data
                    .map((e) => e.course_id)
                    .filter((e) => e !== record.course_id);
                  if (inputType === "course_id") {
                    if (alreadyExistNo.includes(value)) {
                      return Promise.reject("Already exist!");
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.course_id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.course_id);
      updateCourse(editingKey, row);
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
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const remove = (record) => {
    let newData = [...data];
    newData = newData
      .filter((ele) => ele.course_id !== record.course_id)
      .filter((ele) => ele.pre_course_id !== record.course_id);
    removeCourse(record.course_id).then(() => {
      setData(newData);
      setFilteredCourse(newData);
    });
  };

  const columns = [
    {
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
      width: "12%",
      editable: true,
      sorter: (a, b) => a.course_id - b.course_id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Course Name (EN)",
      dataIndex: "course_name_en",
      width: "20%",
      ellipsis: {
        showTitle: false,
      },
      editable: true,
      render: (text) => (
        <Tooltip className="prereq-data" title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "Course Name (TH)",
      dataIndex: "course_name_th",
      width: "20%",
      ellipsis: {
        showTitle: false,
      },
      editable: true,
      render: (text) => (
        <Tooltip className="prereq-data" title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "Prerequisite",
      dataIndex: "pre_course_id",
      width: "20%",
      ellipsis: {
        showTitle: false,
      },
      editable: true,
      render: (text) => (
        <Tooltip
          placement="topLeft"
          className="prereq-data"
          title={
            text &&
            text +
              " " +
              data.find((ele) => text === ele.course_id)?.course_name_en
          }
        >
          {text
            ? text +
              " " +
              data.find((ele) => text === ele.course_id)?.course_name_en
            : "-"}
        </Tooltip>
      ),
    },
    {
      title: "PLO",
      dataIndex: "plo",
      width: "15%",
      editable: true,
      render: (plo) => (
        <>
          {plo?.map((ele) => {
            return <Tag key={ele}>{ele}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Tooltip title="Save">
              <Typography.Link href="#" onClick={() => save(record.course_id)}>
                <SaveOutlined style={{ fontSize: "20px" }} />
              </Typography.Link>
            </Tooltip>
            <Popconfirm title="Discard changes?" onConfirm={cancel}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Tooltip title="Cancel">
                <Typography.Link>
                  <CloseCircleTwoTone
                    twoToneColor="#C73535"
                    style={{ fontSize: "20px" }}
                  />
                </Typography.Link>
              </Tooltip>
            </Popconfirm>
          </Space>
        ) : (
          <Space size="middle">
            <Tooltip title="Edit">
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
                style={{ color: "#009FC7", fontSize: "20px" }}
              >
                <EditOutlined />
              </Typography.Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Sure to delete? This may also delete course that prerequire this course."
                onConfirm={() => remove(record)}
              >
                <Typography.Link
                  disabled={editingKey !== ""}
                  style={{ color: "#C73535", fontSize: "20px" }}
                >
                  <DeleteOutlined />
                </Typography.Link>
              </Popconfirm>
            </Tooltip>
          </Space>
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
        inputType:
          col.dataIndex === "plo"
            ? "plo"
            : col.dataIndex === "pre_course_id"
            ? "prereq"
            : col.dataIndex === "course_id"
            ? "course_id"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
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
        pagination={{
          onChange: cancel,
        }}
        rowKey="course_id"
      />
    </Form>
  );
};
