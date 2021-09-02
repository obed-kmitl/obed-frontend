import { useState } from "react";
import { Select, Option } from "../../components";
import { Table, Input, Popconfirm, Form, Typography, Tag, Tooltip } from "antd";

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
const mockCourseList = [
  {
    id: "01076001",
    course_name_en: "Introduction to Computer Engineering",
  },
  {
    id: "01076002",
    course_name_en: "Programming Fundamental",
  },
  {
    id: "01076003",
    course_name_en: "Circuits and Electronics",
  },
];

const course = [];

for (let i = 1; i <= 40; i++) {
  course.push({
    key: i.toString(),
    course_id: "0" + (1076000 + i),
    course_name_th: `วิชาวิศวกรรมคอมพิวเตอร์ ${i}`,
    course_name_en: `Computer Engineering Course ${i}`,
    precourse_id: `01076001`,
    plo: [1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4],
  });
}

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
      <Select mode="multiple" showSearch placeholder="Select Learning Outcome">
        {mockPLO.map((ele, i) => (
          <Option key={i} value={ele.id}>
            {ele.id}
          </Option>
        ))}
      </Select>
    ) : inputType === "prereq" ? (
      <Select showSearch placeholder="Select Prerequisite Course">
        {mockCourseList.map((ele, i) => (
          <Option key={i} value={ele.id}>
            {ele.id}&nbsp;{ele.course_name_en}
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
              required: (inputType === "prereq" ? false : true),
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

export const TestTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(course);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

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
            text
              ? text +
                " " +
                course.find((ele) => text === ele.id)?.course_name_en
              : "-"
          }
        >
          {text
            ? text + " " + course.find((ele) => text === ele.id)?.course_name_en
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
