import {
  Body,
  Button,
  Input,
} from "..";
import { Form, Table, Popconfirm, Typography } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleTwoTone,
} from '@ant-design/icons';

import styles from "./Standard.module.scss";
import { useSubStandard } from './hooks/useSubStandard'

export const StandardTable = ({ standard = [], standardNo, groupSubStdId, stdId ,allStandard,setAllStandard,key}) => {

  const [form, data, editingKey, isNewAdded, handleAddSubStd, save, cancel, edit, deleteSection] = useSubStandard(standard, groupSubStdId, stdId,allStandard,setAllStandard)

 // console.log(data)
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
            //hasFeedback
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
                    if ((isNaN(value) || value.toString().includes("."))) {
                      return Promise.reject("Enter number!")
                    }

                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            {inputType === "number" ?
              <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <Body>{standardNo}.</Body>
                <Input
                  min={1}
                  style={{ width: "80% " }}
                  defaultValue={record.subStandardNo}
                // formatter={(val) => val.replace(/[^0-9]/g, '')}
                // parser={(val) => val.replace(/[^0-9]/g, '')}
                />
              </div> :
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
              onClick={() => save(record.subStandardNo,record.subStandardId)}
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

  return (
    <div key={key}>
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
          rowKey="subStandardId"
          onRow={() => ({ className: styles.editableCell })}
        />
      </Form>
    </div>
  )

}