import { useState } from "react";
import { Select, Option } from "..";
import { Table, Input, Popconfirm, Form, Typography, Tag, Tooltip } from "antd";

export const CourseTable = ({ course = [{}] }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(course);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;
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
    const inputNode =
      inputType === "plo" ? (
        <Select
          mode="multiple"
          showSearch
          placeholder="Select Learning Outcome"
        >
          {mockPLO.map((ele, i) => (
            <Option key={i} value={ele.id}>
              {ele.id}
            </Option>
          ))}
        </Select>
      ) : inputType === "prereq" ? (
        <Select showSearch placeholder="Select Prerequisite Course">
          <Option value={null}>None</Option>
          {course.map((ele) => (
            <Option key={ele.course_id} value={ele.course_id}>
              {ele.course_id}&nbsp;{ele.course_name_en}
            </Option>
          ))}
        </Select>
      ) : (
        <Input />
      );
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
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

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

  const columns = [
    {
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
      width: "10%",
      editable: true,
      sorter: (a, b) => a.course_id - b.course_id,
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
        <Tooltip className="prereq-data" title={text}>
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
        <Tooltip className="prereq-data" title={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: "Prerequisite",
      dataIndex: "precourse_id",
      width: "20%",
      ellipsis: {
        showTitle: false,
      },
      editable: true,
      render: (text) => (
        <Tooltip
          className="prereq-data"
          title={
            text &&
            text +
              " " +
              course.find((ele) => text === ele.course_id)?.course_name_en
          }
        >
          {text
            ? text +
              " " +
              course.find((ele) => text === ele.course_id)?.course_name_en
            : "None"}
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
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
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
            : col.dataIndex === "precourse_id"
            ? "prereq"
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
