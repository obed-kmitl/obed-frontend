import { Header, Button, Input, Collapse, Panel, Body } from "..";
import { Form, Popconfirm, Typography, Modal, InputNumber, Upload, message, Divider, Empty } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { StandardTable } from './StandardTable';
import styles from "./Standard.module.scss";
import excelReader from "../../utils/excelReader"
import { useImportExcel } from './hooks/useImportExcel';
import { useStandard } from './hooks/useStandard';

export const Standard = ({ selectedCurriculum }) => {

  const [
    standard, setStandard, //standard state
    //create,remove,edit title
    handleCreateStdBtn, handleCancel, handleCreateSubmit, handleDeleteTitle, handleEditTitle, handleEditTitleSubmit,
    isEditing, setIsEditing,
    editingTitleIndex, setEditingTitleIndex,
    //add,remove,Edit groupStd
    handleAddStdBtn, handleAddSubmit, addingStandardId, handleDeleteStandard,
    handleEditName, handleEditNameSubmit,
    isEditingName, setIsEditingName,
    editingNameIndex, setEditingNameIndex, setEditingGroupStdId,
    //Forms
    createStdForm, editTitleForm, addStdForm, editNameForm,
    //ModalVisible
    newStdVisible, addStdVisible,
  ] = useStandard(selectedCurriculum)
  const [
    importModalVisible,
    handleImportBtnClick,
    importModalCancel,
    getDetailsfromExcel,
    confirmImport,
    importStandard
  ] = useImportExcel(setStandard)

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: { showRemoveIcon: false },
    maxCount: 1,
    accept: ".xlsx,.xls",
    async onChange(info) {
      if (info.file.status === 'done') {
        const datafromExcel = await excelReader(info.file.originFileObj)
        getDetailsfromExcel(datafromExcel)
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <div>
      <div className={styles.tabHead}>
        <Header level={2}>Education Standard</Header>
        <div>
          <Button onClick={() => handleCreateStdBtn()} disabled={isEditing}>Create New Standard</Button>
        </div>
      </div>
      <Collapse accordion collapsible={isEditing && "disabled"}>
        {standard.map((item, index) => {
          return <Panel
            key = {"standard "+index}
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
                        style={{ flex: "1 1 auto", marginBottom: 0, marginRight: "5px", alignItems: "center" }}
                        rules={[{ required: true, message: "Please input name!" }]}
                      >
                        <Input initialValue={item.standardTitle} />
                      </Form.Item>
                      <Button
                        type="secondary"
                        htmlType="submit"
                        style={{ marginRight: "5px" }}
                      >
                        Save
                      </Button>
                      <Button
                        danger
                        onClick={() => {
                          setEditingTitleIndex(null);
                          setIsEditing(false)
                          editTitleForm.resetFields();
                        }}
                      >
                        Cancel
                      </Button>
                    </Form>
                  </>
                  : <Header level={4} >{item.standardTitle}</Header>
                }
                {!((editingTitleIndex === index && isEditing) || isEditingName) &&
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Typography.Link
                      disabled={isEditing}
                      onClick={(e) => { e.stopPropagation(); handleEditTitle(index) }}
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
          >
            <div className={styles.topRightBtn} >
              <Button onClick={() => handleImportBtnClick(index)}>Import</Button>
              <Button onClick={() => handleAddStdBtn(index)}>Add</Button>
            </div>
            <Collapse accordion>
              {item.details.map((ele, i) => {
                return <Panel
                  key={"Groupsub "+i}
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
                                style={{ width: "60px", marginBottom: 0, marginRight: "5px", alignItems: "center" }}
                                rules={[
                                  { required: true, message: "Please input name!" },
                                  {
                                    validator: (rule, value, callback) => {
                                      const alreadyExistNo = standard[index].details.map((e) => e.standardNo).filter((e) => e !== ele.standardNo)
                                      if (alreadyExistNo.includes(value)) {
                                        return Promise.reject("Already exist!")
                                      }
                                      return Promise.resolve()
                                    }
                                  }
                                ]}
                              >
                                <InputNumber style={{ width: "60px", height: "35px" }} min={1} initialValue={ele.standardNo} />
                              </Form.Item>
                              <Form.Item
                                initialValue={ele.standardName}
                                name="standardName"
                                style={{ flex: "1 1 auto", marginBottom: 0, marginRight: 5 }}
                                rules={[{ required: true, message: "Please input name!" }]}
                              >
                                <Input initialValue={ele.standardName} />
                              </Form.Item>
                              <Button
                                type="secondary"
                                htmlType="submit"
                                style={{ marginRight: "5px" }}
                              >
                                Save
                              </Button>
                              <Button
                                danger
                                onClick={() => {
                                  setEditingTitleIndex(null);
                                  setIsEditingName(false)
                                  setEditingNameIndex(null);
                                  editNameForm.resetFields();
                                  setEditingGroupStdId(null);
                                }}
                              >
                                Cancel
                              </Button>
                            </Form>
                          </> :
                          <>
                            <Header level={5} >{ele.standardNo}{' '}</Header>
                            <Header level={5} >{ele.standardName}</Header>
                          </>
                        }
                      </div>
                      {!isEditingName &&
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Typography.Link
                            disabled={isEditingName || isEditing}
                            onClick={(e) => { e.stopPropagation(); handleEditName(index, i, ele.groupSubStdId) }}
                          >
                            <EditOutlined />
                          </Typography.Link>
                          <Popconfirm
                            title="Are you sure to delete ?"
                            onConfirm={(e) => { handleDeleteStandard(ele.standardNo, ele.groupSubStdId, item.id); e.stopPropagation() }}
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
                      }
                    </div>}
                 
                >
                  <StandardTable
                    standard={ele.subStandard}
                    standardNo={ele.standardNo}
                    groupSubStdId={ele.groupSubStdId}
                    stdId={item.id}
                    allStandard={standard}
                    setAllStandard={setStandard}
                    tableKey={"table "+ele.subStandardId}
                  />
                </Panel>
              }
              )}</Collapse>
          </Panel>
        })}
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
                  if (alreadyExistNo.includes(value)) {
                    return Promise.reject("Already exist!")
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <InputNumber min={1} width={100} placeholder="ex. 1,2,3,..." />
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
      <Modal
        title={<Header level={3}>Import Standard</Header>}
        visible={importModalVisible}
        okText="Add"
        onOk={() => confirmImport()}
        onCancel={() => importModalCancel()}
        okButtonProps={{ htmlType: "submit" }}
        maskClosable={false}
        width="700px"
      >
        <div className={styles.importModal}>
          <div className={styles.upload}>
            <Header level={4} >Upload File</Header>
            <Body level={4} style={{ marginBottom: "1rem" }}>Existing data will be override</Body>
            <div className={styles.uploadBtn}>
              <Upload {...uploadProps} >
                <Button icon={<UploadOutlined />} type="primary">Upload</Button>
              </Upload>
            </div>
          </div>
          <Divider type="vertical" style={{ height: "100%" }} />
          <div className={styles.download}>
            <Body level={3} >To Import Standard Data, You can download template and upload complete file to OBED. </Body>
            <Typography.Link>Download Template</Typography.Link>
          </div>
        </div>
        <Header level={4} >Preview</Header>
        {importStandard ?
          <div className={styles.preview}>
            <Collapse accordion >
              {importStandard.map((std, index) =>
                <Panel header={std.standardNo + " " + std.standardName} key={index}>
                  {std.subStandard.map((substd, index) =>
                    <>
                      <div style={{ display: "flex", fontSize: "14px" }}>
                        <div>{substd.subStandardNo}</div>
                        <Divider type="vertical" style={{ height: "100%" }} />
                        <div>{substd.subStandardName}</div>
                      </div>
                      <Divider style={{ margin: "0.5rem 0" }} />
                    </>
                  )}
                </Panel>)
              }
            </Collapse>
          </div>
          :
          <Empty
            style={{ margin: "50px", color: "#c3c3c4", fontSize: "16px", fontWeight: "500" }}
            imageStyle={{ height: 100 }}
            description="Please Upload File"
          />
        }
      </Modal>
    </div>
  )
}
