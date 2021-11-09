import { useState, useEffect } from "react";
import { } from "..";
import { Form, Table, Popconfirm, Typography, TreeSelect, Tag } from "antd";
import {
  EditOutlined,
  SaveOutlined,
  CloseCircleTwoTone,
} from "@ant-design/icons";

import styles from "./MappingStandard.module.scss";

const { TreeNode } = TreeSelect;

export const MappingTable = ({
  standard = [],
  standardNo,
  relativeStandard,
  isEdit,
  mapping,
  allStandard,
  setIsEditingTable
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(standard);
  const [editingKey, setEditingKey] = useState("");
  const [editing, setEditing] = useState(isEdit);
  const [mappingList, setMappingList] = useState(mapping)
  console.log(mapping)

  const isEditing = (record) => record.subStandardNo === editingKey;
  const EditableCell = ({
    editing,
    dataIndex,
    title,
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
                required: false,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <TreeSelect
              showSearch
              style={{ width: "380px" }}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Please select relative standard"
              allowClear
              treeCheckable={true}
              showCheckedStrategy="SHOW_CHILD"
            >
              {relativeStandard.details.map((option) => (
                <TreeNode
                  key={option.groupSubStdId}
                  value={option.groupSubStdId}
                  title={option.standardNo + " " + option.standardName}
                  selectable={false}
                  disabled={option.subStandard.length <=0}
                >
                  {option.subStandard.map((item) => (
                    <TreeNode
                      key={option.groupSubStdId + "." + item.subStandardId}
                      value={option.groupSubStdId + "." + item.subStandardId}
                      title={
                        option.standardNo +
                        "." +
                        item.subStandardNo +
                        " " +
                        item.subStandardName
                      }
                    />
                  ))}
                </TreeNode>
              ))}
            </TreeSelect>
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
      width: 50,
      editable: false,
      render: (subStandardNo) => {
        return standardNo + "." + subStandardNo;
      },
    },
    {
      title: "Description",
      dataIndex: "subStandardName",
      editable: false,
    },
    {
      title: "Mapping with Relative Standard",
      dataIndex: "mapping",
      width: "400px",
      editable: true,
      render: (mapping) => {
        return mapping.map((element) => {
          //console.log(relativeStandard.details.filter((item) => item.groupSubStdId === parseInt(element.split(".")[0])).length > 0)
          let renderTagNo = ""
          if (relativeStandard.details.filter((item) => item.groupSubStdId === parseInt(element.split(".")[0])).length > 0) {
            const stdNo =
              relativeStandard.details
                .filter((item) => item.groupSubStdId === parseInt(element.split(".")[0]))[0]
                .standardNo
            const subStdNo =
              relativeStandard.details
                .filter((item) => item.groupSubStdId === parseInt(element.split(".")[0]))[0]
                .subStandard.filter((item) => item.subStandardId === parseInt(element.split(".")[1]))[0]
                .subStandardNo
            renderTagNo = stdNo + "." + subStdNo
          } else {
            renderTagNo = element
          }
          return (
            <Tag
              style={{
                height: "36px",
                lineHeight: "2.5",
                fontSize: "14px",
                margin: ".25rem",
              }}
            >
              {renderTagNo}
            </Tag>
          )
        }
        );
      },
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
            <Popconfirm title="Discard Changes?" onConfirm={() => cancel()}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <CloseCircleTwoTone twoToneColor="#FE0000" />
              </a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== "" || !editing}
            onClick={() => edit(record)}
            style={{
              fontSize: "14px",
            }}
          >
            <EditOutlined />
            &nbsp;Edit
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
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.subStandardNo);
    setIsEditingTable(true)
  };

  const cancel = () => {
    setEditingKey("");
    setIsEditingTable(false)
  };

  function mapMappingtoJson(data, index) {

    const mainSubStandard = data[index].subStandardId
    const relativeSubStandard = data[index].mapping

    const mapping = relativeSubStandard.map((rss) => {
      return {
        main_sub_std_id: mainSubStandard,
        relative_sub_std_id: parseInt(rss.split(".")[1])
      }
    })
    console.log(mapping)
    let allMapping = mappingList
    console.log(allMapping)
    const removedPrevMapping = allMapping.map_sub_standards.filter((mapping) => mapping.main_sub_std_id !== mainSubStandard)
    const addedNewMapping = [...removedPrevMapping, ...mapping]

    allMapping.map_sub_standards = addedNewMapping

    setMappingList(allMapping)
    console.log(mappingList)

    return allMapping
  }

  const save = async (subStandardNo) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(
        (item) => subStandardNo === item.subStandardNo
      );

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
        mapMappingtoJson(newData, index, allStandard);
        //console.log(mapping)
        setIsEditingTable(false)
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  useEffect(() => {
    setData(standard);

  }, [standard]);

  // useEffect(() => {
  //   const mapping = mappingList
  //   const clearedMapping = mapping.map_sub_standards = []
  //   setMappingList(clearedMapping)
  //   console.log('swap')
  // }, [mappingList.main_std_id])

  useEffect(() => {
    setEditing(isEdit);
  }, [isEdit]);


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
        pagination={false}
        rowKey="subStandardNo"
        onRow={() => ({ className: styles.editableCell })}
      />
    </Form>
  );
};
