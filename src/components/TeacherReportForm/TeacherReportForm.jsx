import styles from "./TeacherReportForm.module.scss";
import { Header, Button as MyBtn } from "..";
import {
  Table,
  Input,
  Button,
  Tooltip,
  InputNumber,
  Collapse,
  Modal,
  Form,
  Popconfirm,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useTeacherReportForm } from "./hooks/useTeacherReportForm";
import { useSectionContext } from "../../contexts/SectionContext";

const { Column } = Table;
const { Panel } = Collapse;

const mockTableScheme = {
  A: 0,
  BP: 0,
  B: 0,
  CP: 0,
  C: 0,
  DP: 0,
  D: 0,
  F: 0,
};

function TeacherReportForm() {
  const { section } = useSectionContext();
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [gradeForm] = Form.useForm();
  const [improvedList, setImprovedList] = useState([]);
  const [methodList, setMethodList] = useState([]);
  const [sumList, setSumList] = useState([]);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [suggest, setSuggest] = useState([]);
  const [improveInput, setImproveInput] = useState("");
  const [reasonInput, setReasonInput] = useState("");
  const [solutionInput, setSolutionInput] = useState("");
  const [evaluationInput, setEvaluationInput] = useState("");
  const [methodInput, setMethodInput] = useState("");
  const [sumInput, setSumInput] = useState("");
  const [newSuggest, setNewSuggest] = useState({
    cause: [],
    work: [],
    evaluation: [],
  });
  const [grade, setGrade] = useState();
  const [dirty, setDirty] = useState(false);
  const { getReport, saveReport, exportPDF } = useTeacherReportForm();

  function popIndex(arr, index) {
    let newArr = [...arr.slice(0, index), ...arr.slice(index + 1)];
    return newArr;
  }

  // เพิ่ม การปรับปรุงการเรียนการสอนจากครั้งที่ผ่านมา ใน list
  function onAddImprove() {
    if (improveInput.trim() !== "") {
      setImprovedList([...improvedList, improveInput]);
      setDirty(true);
    }
    setImproveInput("");
  }

  // ลบ การปรับปรุงการเรียนการสอนจากครั้งที่ผ่านมา ใน list
  function onDeleteImprove(index) {
    setImprovedList([
      ...improvedList.slice(0, index),
      ...improvedList.slice(index + 1),
    ]);
    setDirty(true);
  }

  // เพิ่ม ที่มา/เหตุผล ใน Modal แก้ไขข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onAddReason() {
    if (reasonInput.trim() !== "") {
      setSelectedData({
        cause: selectedData?.cause.push(reasonInput),
        ...selectedData,
      });
      setDirty(true);
    }
    setReasonInput("");
  }

  // ลบ ที่มา/เหตุผล ใน Modal แก้ไขข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onDeleteReason(index) {
    setSelectedData({
      ...selectedData,
      cause: popIndex(selectedData?.cause, index),
    });
    setDirty(true);
  }

  // เพิ่ม การดำเนินการ ใน Modal แก้ไขข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onAddSolution() {
    if (solutionInput.trim() !== "") {
      setSelectedData({
        work: selectedData?.work.push(solutionInput),
        ...selectedData,
      });
      setDirty(true);
    }
    setSolutionInput("");
  }

  // ลบ การดำเนินการ ใน Modal แก้ไขข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onDeleteSolution(index) {
    setSelectedData({
      ...selectedData,
      work: popIndex(selectedData?.work, index),
    });
    setDirty(true);
  }

  // เพิ่ม การประเมิณผล ใน Modal แก้ไขข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onAddEvaluation() {
    if (evaluationInput.trim() !== "") {
      setSelectedData({
        evaluation: selectedData?.evaluation.push(evaluationInput),
        ...selectedData,
      });
      setDirty(true);
    }
    setEvaluationInput("");
  }

  // ลบ การประเมิณผล ใน Modal แก้ไขข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onDeleteEvaluation(index) {
    setSelectedData({
      ...selectedData,
      evaluation: popIndex(selectedData?.evaluation, index),
    });
    setDirty(true);
  }

  // เพิ่ม ที่มา/เหตุผล ใน Modal เพิ่มข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onAddNewReason() {
    if (reasonInput.trim() !== "") {
      setNewSuggest({
        cause: newSuggest?.cause.push(reasonInput),
        ...newSuggest,
      });
      setDirty(true);
    }
    setReasonInput("");
  }

  // ลบ ที่มา/เหตุผล ใน Modal เพิ่มข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onDeleteNewReason(index) {
    setNewSuggest({
      ...newSuggest,
      cause: popIndex(newSuggest?.cause, index),
    });
    setDirty(true);
  }

  // เพิ่ม การดำเนินการ ใน Modal เพิ่มข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onAddNewSolution() {
    if (solutionInput.trim() !== "") {
      setNewSuggest({
        work: newSuggest?.work.push(solutionInput),
        ...newSuggest,
      });
      setDirty(true);
    }
    setSolutionInput("");
  }

  // ลบ การดำเนินการ ใน Modal เพิ่มข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onDeleteNewSolution(index) {
    setNewSuggest({
      ...newSuggest,
      work: popIndex(newSuggest?.work, index),
    });
    setDirty(true);
  }

  // เพิ่ม การประเมิณผล ใน Modal เพิ่มข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onAddNewEvaluation() {
    if (evaluationInput.trim() !== "") {
      setNewSuggest({
        evaluation: newSuggest?.evaluation.push(evaluationInput),
        ...newSuggest,
      });
      setDirty(true);
    }
    setEvaluationInput("");
  }

  // ลบ การประเมิณผล ใน Modal เพิ่มข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function onDeleteNewEvaluation(index) {
    setNewSuggest({
      ...newSuggest,
      evaluation: popIndex(newSuggest?.evaluation, index),
    });
    setDirty(true);
  }

  // ลบ ข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป จาก list
  function onDeleteNextImprove(index) {
    setSuggest(popIndex(suggest, index));
    setDirty(true);
  }

  // เพิ่ม วิธีการทวนสอบ ใน list
  function onAddMethod() {
    if (methodInput.trim() !== "") {
      setMethodList([...methodList, methodInput]);
      setDirty(true);
    }
    setMethodInput("");
  }

  // ลบ วิธีการทวนสอบ ใน list
  function onDeleteMethod(index) {
    setMethodList(popIndex(methodList, index));
    setDirty(true);
  }

  // เพิ่ม สรุปผล ใน list
  function onAddSum() {
    if (sumInput.trim() !== "") {
      setSumList([...sumList, sumInput]);
      setDirty(true);
    }
    setSumInput("");
  }

  // ลบ สรุปผล ใน list
  function onDeleteSum(index) {
    setSumList(popIndex(sumList, index));
    setDirty(true);
  }

  // สร้าง ข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป ใหม่จาก Modal เพิ่มข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function handleSubmit(values) {
    let newItem = {
      ...values,
      ...newSuggest,
    };
    console.log("Recieved values of form: ", newItem);
    setAddVisible(false);
    setConfirmLoading(false);
    setSuggest([...suggest, newItem]);
    setNewSuggest({ cause: [], work: [], evaluation: [] });
    setDirty(true);
  }

  // บันทึกการแก้ไข ข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป ใหม่จาก Modal แก้ไขข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
  function handleEdit(values) {
    let newItem = {
      ...selectedData,
      title: values.title,
    };
    let newSuggest = [...suggest];
    newSuggest[selectedData.index] = newItem;
    setSuggest(newSuggest);
    setEditVisible(false);
    setDirty(true);
  }

  function handleCancel() {
    form.resetFields();
    editForm.resetFields();
    setSelectedData(null);
    setEditVisible(false);
    setAddVisible(false);
    clearEdit();
  }

  function openNotificationWithIcon(type, message, desc) {
    notification[type]({
      message: message,
      description: desc,
      duration: 5,
    });
  }

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  function initEdit(i) {
    const _suggest = JSON.parse(JSON.stringify(suggest));
    const values = {
      title: _suggest[i].title,
      cause: _suggest[i].cause,
      work: _suggest[i].work,
      evaluation: _suggest[i].evaluation,
    };
    console.log("SELECTED_DATA ", { ...values, index: i });
    setSelectedData({ ...values, index: i });
    editForm.setFieldsValue(values);
    setEditVisible(true);
  }

  function clearEdit() {
    setSelectedData(null);
    editForm.resetFields();
    setReasonInput("");
    setSolutionInput("");
    setEvaluationInput("");
  }

  function onSave(silent = true) {
    const grades = gradeForm.getFieldsValue();
    const data = {
      section_id: parseInt(section),
      grade: [
        grades.A || 0,
        grades.BP || 0,
        grades.B || 0,
        grades.CP || 0,
        grades.C || 0,
        grades.DP || 0,
        grades.D || 0,
        grades.F || 0,
      ],
      prev_improvement: improvedList,
      next_improvements: suggest,
      verify_method: methodList,
      summary: sumList,
    };
    saveReport(data)
      .then(() => {
        if (!silent) openNotificationWithIcon("success", "Report saved");
        setDirty(false);
      })
      .catch((message) => {
        openNotificationWithIcon("error", "Save failed", message);
      })
      .finally(() => {
        fetchReportData();
      });
  }

  function discardChange() {
    setNewSuggest({
      cause: [],
      work: [],
      evaluation: [],
    });
    setSumList([]);
    setImprovedList([]);
    setSuggest([]);
    setMethodList([]);
    setDirty(false);
    fetchReportData();
  }

  function genExtra(i) {
    return (
      <>
        <Tooltip title="Edit">
          <EditOutlined
            style={{ marginRight: "1rem", color: "#009FC7" }}
            onClick={(e) => {
              e.stopPropagation();
              initEdit(i);
            }}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Popconfirm
            title="Are you sure to delete this?"
            onConfirm={() => onDeleteNextImprove(i)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ color: "#C73535" }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          </Popconfirm>
        </Tooltip>
      </>
    );
  }

  function fetchReportData() {
    getReport(section).then((data) => {
      let grades = {
        A: data?.grade[0] || 0,
        BP: data?.grade[1] || 0,
        B: data?.grade[2] || 0,
        CP: data?.grade[3] || 0,
        C: data?.grade[4] || 0,
        DP: data?.grade[5] || 0,
        D: data?.grade[6] || 0,
        F: data?.grade[7] || 0,
      };
      setGrade(grades);
      setSuggest(data?.next_improvements || []);
      setSumList(data?.summary || []);
      setImprovedList(data?.prev_improvement || []);
      setMethodList(data?.verify_method || []);
    });
  }

  useEffect(() => {
    if (section) {
      fetchReportData();
    }
    // eslint-disable-next-line
  }, [section]);

  useEffect(() => {
    gradeForm.setFieldsValue(grade);
    // eslint-disable-next-line
  }, [grade]);

  return (
    <div className={styles.report}>
      <Header level={3}>มคอ.5 รายงานผลการดำเนินงานของรายวิชา</Header>
      <div className={styles.reportWrap}>
        <div className={styles.topicWrap}>
          <Header level={3} className={styles.topics}>
            การกระจายระดับคะแนน
          </Header>
          <div className={styles.topicLine} />
        </div>
        <Form
          form={gradeForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          name="grade"
          initialValues={grade}
        >
          <Table
            dataSource={[mockTableScheme]}
            pagination={{ position: ["none", "none"] }}
            bordered
          >
            <Column
              title="A"
              dataIndex="A"
              key="a"
              render={() => (
                <Form.Item name="A">
                  <InputNumber min={0} onChange={() => setDirty(true)} />
                </Form.Item>
              )}
            />
            <Column
              title="B+"
              dataIndex="BP"
              key="b+"
              render={() => (
                <Form.Item name="BP">
                  <InputNumber min={0} onChange={() => setDirty(true)} />
                </Form.Item>
              )}
            />
            <Column
              title="B"
              dataIndex="B"
              key="b"
              render={() => (
                <Form.Item name="B">
                  <InputNumber min={0} onChange={() => setDirty(true)} />
                </Form.Item>
              )}
            />
            <Column
              title="C+"
              dataIndex="CP"
              key="c+"
              render={() => (
                <Form.Item name="CP">
                  <InputNumber min={0} onChange={() => setDirty(true)} />
                </Form.Item>
              )}
            />
            <Column
              title="C"
              dataIndex="C"
              key="c"
              render={() => (
                <Form.Item name="C">
                  <InputNumber min={0} onChange={() => setDirty(true)} />
                </Form.Item>
              )}
            />
            <Column
              title="D+"
              dataIndex="DP"
              key="d+"
              render={() => (
                <Form.Item name="DP">
                  <InputNumber min={0} onChange={() => setDirty(true)} />
                </Form.Item>
              )}
            />
            <Column
              title="D"
              dataIndex="D"
              key="d"
              render={() => (
                <Form.Item name="D">
                  <InputNumber min={0} onChange={() => setDirty(true)} />
                </Form.Item>
              )}
            />
            <Column
              title="F"
              dataIndex="F"
              key="f"
              render={() => (
                <Form.Item name="F">
                  <InputNumber min={0} onChange={() => setDirty(true)} />
                </Form.Item>
              )}
            />
          </Table>
        </Form>
        <div className={styles.topicWrap}>
          <Header level={3} className={styles.topics}>
            การปรับปรุงการเรียนการสอนจากครั้งที่ผ่านมา
          </Header>
          <div className={styles.topicLine} />
        </div>
        <ul className={styles.addUl}>
          {improvedList?.length !== 0 ? (
            improvedList?.map((ele, i) => (
              <li key={"improved" + i} className={styles.addLi}>
                {"- " + ele}
                <Tooltip title="Delete">
                  <button
                    className={styles.liRmBtn}
                    onClick={() => onDeleteImprove(i)}
                  >
                    <MinusCircleOutlined />
                  </button>
                </Tooltip>
              </li>
            ))
          ) : (
            <li className={styles.emptyLi}>ยังไม่มีรายการ</li>
          )}
        </ul>
        <Input.Group compact>
          <Input
            style={{ width: "calc(100% - 45px)" }}
            placeholder="ข้อความ"
            value={improveInput}
            onChange={(e) => setImproveInput(e.target.value)}
          />
          <Button type="primary" onClick={onAddImprove}>
            <PlusCircleOutlined />
          </Button>
        </Input.Group>
        <div className={styles.topicWrap}>
          <Header level={3} className={styles.topics}>
            ข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป
          </Header>
          <div className={styles.topicLine} />
        </div>
        <Collapse defaultActiveKey={[0]} expandIconPosition="right">
          {suggest && suggest?.length !== 0 ? (
            suggest?.map((ele, i) => (
              <Panel header={ele.title} key={i} extra={genExtra(i)}>
                <Header level={4}>ที่มา/เหตุผล</Header>
                <ul>
                  {ele.cause.map((cause, j) => (
                    <li key={"cause-table-" + i + "-" + j}>{cause}</li>
                  ))}
                </ul>
                <Header level={4}>การดำเนินการ</Header>
                <ul>
                  {ele.work.map((work, j) => (
                    <li key={"work-table-" + i + "-" + j}>{work}</li>
                  ))}
                </ul>
                <Header level={4}>การประเมิณผล</Header>
                <ul>
                  {ele.evaluation.map((evaluation, j) => (
                    <li key={"evaluation-table-" + i + "-" + j}>
                      {evaluation}
                    </li>
                  ))}
                </ul>
              </Panel>
            ))
          ) : (
            <li className={styles.emptyLi}>ยังไม่มีรายการ</li>
          )}
        </Collapse>
        <MyBtn className={styles.addBtn} onClick={() => setAddVisible(true)}>
          Add
        </MyBtn>
        <div className={styles.topicWrap}>
          <Header level={3} className={styles.topics}>
            การทวนสอบการประเมินผลการเรียนรู้
          </Header>
          <div className={styles.topicLine} />
        </div>
        <div className={styles.lastWrap}>
          <Header level={4}>วิธีการทวนสอบ</Header>
          <ul className={styles.addUl}>
            {methodList && methodList?.length !== 0 ? (
              methodList?.map((ele, i) => (
                <li key={"method" + i} className={styles.addLi}>
                  {"- " + ele}
                  <Tooltip title="Delete">
                    <button
                      className={styles.liRmBtn}
                      onClick={() => onDeleteMethod(i)}
                    >
                      <MinusCircleOutlined />
                    </button>
                  </Tooltip>
                </li>
              ))
            ) : (
              <li className={styles.emptyLi}>ยังไม่มีรายการ</li>
            )}
          </ul>
          <Input.Group compact>
            <Input
              style={{ width: "calc(100% - 45px)" }}
              placeholder="ข้อความ"
              value={methodInput}
              onChange={(e) => setMethodInput(e.target.value)}
            />
            <Button type="primary" onClick={onAddMethod}>
              <PlusCircleOutlined />
            </Button>
          </Input.Group>
          <Header level={4}>สรุปผล</Header>
          <ul className={styles.addUl}>
            {sumList && sumList?.length !== 0 ? (
              sumList?.map((ele, i) => (
                <li key={"sum" + i} className={styles.addLi}>
                  {"- " + ele}
                  <Tooltip title="Delete">
                    <button
                      className={styles.liRmBtn}
                      onClick={() => onDeleteSum(i)}
                    >
                      <MinusCircleOutlined />
                    </button>
                  </Tooltip>
                </li>
              ))
            ) : (
              <li className={styles.emptyLi}>ยังไม่มีรายการ</li>
            )}
          </ul>
          <Input.Group compact>
            <Input
              style={{ width: "calc(100% - 45px)" }}
              placeholder="ข้อความ"
              value={sumInput}
              onChange={(e) => setSumInput(e.target.value)}
            />
            <Button type="primary" onClick={onAddSum}>
              <PlusCircleOutlined />
            </Button>
          </Input.Group>
        </div>
        <div className={styles.btnWrap}>
          <MyBtn className={styles.addBtn} onClick={() => exportPDF(section)}>
            Export PDF
          </MyBtn>
          <div className={styles.divider} />
          <Popconfirm
            title="Are you sure to discard all changes?"
            onConfirm={() => discardChange()}
            okText="Yes"
            cancelText="No"
          >
            <MyBtn
              className={styles.addBtn}
              disabled={!dirty}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              Discard
            </MyBtn>
          </Popconfirm>

          <MyBtn
            className={styles.addBtn}
            disabled={!dirty}
            onClick={() => onSave(false)}
            type="primary"
          >
            Save
          </MyBtn>
        </div>
      </div>
      {/* ADD ********************************************************************************* */}
      <Modal
        title="เพิ่มข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป"
        visible={addVisible}
        okText="Add"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleSubmit(values);
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
          name="addReport"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={"required"}
        >
          <Form.Item
            label="หัวข้อ"
            name="title"
            rules={[{ required: true, message: "Please fill this form!" }]}
          >
            <Input placeholder="กรอกหัวข้อ" />
          </Form.Item>
          <Form.Item label="ที่มา/เหตุผล">
            <ul className={styles.addUl}>
              {newSuggest?.cause.map((ele, i) => (
                <li key={"cause" + i} className={styles.addLi}>
                  {"- " + ele}
                  <Tooltip title="Delete">
                    <button
                      className={styles.liRmBtn}
                      onClick={() => onDeleteNewReason(i)}
                      type="button"
                    >
                      <MinusCircleOutlined />
                    </button>
                  </Tooltip>
                </li>
              ))}
            </ul>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 45px)" }}
                placeholder="ข้อความ"
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
              />
              <Button type="primary" onClick={onAddNewReason}>
                <PlusCircleOutlined />
              </Button>
            </Input.Group>
          </Form.Item>
          <Form.Item label="การดำเนินการ">
            <ul className={styles.addUl}>
              {newSuggest?.work.map((ele, i) => (
                <li key={"work" + i} className={styles.addLi}>
                  {"- " + ele}
                  <Tooltip title="Delete">
                    <button
                      className={styles.liRmBtn}
                      onClick={() => onDeleteNewSolution(i)}
                      type="button"
                    >
                      <MinusCircleOutlined />
                    </button>
                  </Tooltip>
                </li>
              ))}
            </ul>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 45px)" }}
                placeholder="ข้อความ"
                value={solutionInput}
                onChange={(e) => setSolutionInput(e.target.value)}
              />
              <Button type="primary" onClick={onAddNewSolution}>
                <PlusCircleOutlined />
              </Button>
            </Input.Group>
          </Form.Item>
          <Form.Item label="การประเมิณผล">
            <ul className={styles.addUl}>
              {newSuggest?.evaluation.map((ele, i) => (
                <li key={"evalutation" + i} className={styles.addLi}>
                  {"- " + ele}
                  <Tooltip title="Delete">
                    <button
                      className={styles.liRmBtn}
                      onClick={() => onDeleteNewEvaluation(i)}
                      type="button"
                    >
                      <MinusCircleOutlined />
                    </button>
                  </Tooltip>
                </li>
              ))}
            </ul>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 45px)" }}
                placeholder="ข้อความ"
                value={evaluationInput}
                onChange={(e) => setEvaluationInput(e.target.value)}
              />
              <Button type="primary" onClick={onAddNewEvaluation}>
                <PlusCircleOutlined />
              </Button>
            </Input.Group>
          </Form.Item>
        </Form>
      </Modal>
      {/* EDIT ********************************************************************************* */}
      <Modal
        title="แก้ไขข้อควรปรับปรุงสำหรับการสอนครั้งต่อไป"
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
        <Form
          form={editForm}
          name="editReport"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={"required"}
          initialValues={selectedData}
        >
          <Form.Item
            label="หัวข้อ"
            name="title"
            rules={[{ required: true, message: "Please fill this form!" }]}
          >
            <Input placeholder="กรอกหัวข้อ" />
          </Form.Item>
          <Form.Item label="ที่มา/เหตุผล">
            <ul className={styles.addUl}>
              {selectedData?.cause.map((ele, i) => (
                <li key={"cause" + i} className={styles.addLi}>
                  {"- " + ele}
                  <Tooltip title="Delete">
                    <button
                      className={styles.liRmBtn}
                      onClick={() => onDeleteReason(i)}
                      type="button"
                    >
                      <MinusCircleOutlined />
                    </button>
                  </Tooltip>
                </li>
              ))}
            </ul>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 45px)" }}
                placeholder="ข้อความ"
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
              />
              <Button type="primary" onClick={onAddReason}>
                <PlusCircleOutlined />
              </Button>
            </Input.Group>
          </Form.Item>
          <Form.Item label="การดำเนินการ">
            <ul className={styles.addUl}>
              {selectedData?.work.map((ele, i) => (
                <li key={"work" + i} className={styles.addLi}>
                  {"- " + ele}
                  <Tooltip title="Delete">
                    <button
                      className={styles.liRmBtn}
                      onClick={() => onDeleteSolution(i)}
                      type="button"
                    >
                      <MinusCircleOutlined />
                    </button>
                  </Tooltip>
                </li>
              ))}
            </ul>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 45px)" }}
                placeholder="ข้อความ"
                value={solutionInput}
                onChange={(e) => setSolutionInput(e.target.value)}
              />
              <Button type="primary" onClick={onAddSolution}>
                <PlusCircleOutlined />
              </Button>
            </Input.Group>
          </Form.Item>
          <Form.Item label="การประเมิณผล">
            <ul className={styles.addUl}>
              {selectedData?.evaluation.map((ele, i) => (
                <li key={"evalutation" + i} className={styles.addLi}>
                  {"- " + ele}
                  <Tooltip title="Delete">
                    <button
                      className={styles.liRmBtn}
                      onClick={() => onDeleteEvaluation(i)}
                      type="button"
                    >
                      <MinusCircleOutlined />
                    </button>
                  </Tooltip>
                </li>
              ))}
            </ul>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 45px)" }}
                placeholder="ข้อความ"
                value={evaluationInput}
                onChange={(e) => setEvaluationInput(e.target.value)}
              />
              <Button type="primary" onClick={onAddEvaluation}>
                <PlusCircleOutlined />
              </Button>
            </Input.Group>
          </Form.Item>
        </Form>
      </Modal>
      <Prompt
        when={dirty}
        message="ระบบยังไม่ได้บันทึกการเปลี่ยนแปลง คุณต้องการออกจากหน้านี้หรือไม่?"
      />
    </div>
  );
}

export { TeacherReportForm };
