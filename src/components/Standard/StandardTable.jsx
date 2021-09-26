import { useState } from 'react'
import {
  Button,
  Input,
} from "..";
import { Form, Table, Popconfirm, Typography, InputNumber } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleTwoTone,
} from '@ant-design/icons';

import styles from "./Standard.module.scss";


export const StandardTable = ({ standard = [], standardNo }) => {
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
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            {inputType === "number" ?
              <InputNumber min={1}/> :
              <Input />
            }
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