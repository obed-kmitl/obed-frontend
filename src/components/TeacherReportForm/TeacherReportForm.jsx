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
} from "antd";
import { useState, useEffect } from "react";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Column } = Table;
const { Panel } = Collapse;

const data = {
  A: 9,
  BP: 27,
  B: 22,
  CP: 11,
  C: 8,
  DP: 3,
  D: 2,
  F: 0,
};

function TeacherReportForm() {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [gradeForm] = Form.useForm();
  const [improvedList, setImprovedList] = useState([
    "เพิ่มเนื้อหา",
    "ลดเนื้อหา",
  ]);
  const [methodList, setMethodList] = useState(["เพิ่มเนื้อหา", "ลดเนื้อหา"]);
  const [sumList, setSumList] = useState(["เพิ่มเนื้อหา", "ลดเนื้อหา"]);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [suggest, setSuggest] = useState();
  const [improveInput, setImproveInput] = useState("");
  const [reasonInput, setReasonInput] = useState("");
  const [solutionInput, setSolutionInput] = useState("");
  const [evaluationInput, setEvaluationInput] = useState("");
  const [methodInput, setMethodInput] = useState("");
  const [sumInput, setSumInput] = useState("");
  const [newSuggest, setNewSuggest] = useState({
    reason: [],
    solution: [],
    evaluation: [],
  });
  const [grade, setGrade] = useState();

  const improvement = [
    {
      title: "ปรับปรุง Learning Outcome",
      reason: [
        "เนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LOเนื่องจาก LO",
        "ในปีการศึกษานี้ A",
      ],
      solution: ["เนื่องจาก LO", "ในปีการศึกษานี้ B"],
      evaluation: ["เนื่องจาก LO", "ในปีการศึกษานี้ C"],
    },
    {
      title: "ปรับปรุงเนื้อหาบทเรียน",
      reason: ["เนื่องจากบทเรียน", "ในปีการศึกษานี้ D"],
      solution: ["เนื่องจากบทเรียน", "ในปีการศึกษานี้ E"],
      evaluation: ["เนื่องจากบทเรียน", "ในปีการศึกษานี้ F"],
    },
  ];

  function popIndex(arr, index) {
    let newArr = [...arr.slice(0, index), ...arr.slice(index + 1)];
    return newArr;
  }

  function onAddImprove() {
    if (improveInput.trim() !== "")
      setImprovedList([...improvedList, improveInput]);
    setImproveInput("");
  }

  function onDeleteImprove(index) {
    setImprovedList([
      ...improvedList.slice(0, index),
      ...improvedList.slice(index + 1),
    ]);
  }

  function onAddReason() {
    if (reasonInput.trim() !== "") {
      setSelectedData({
        reason: selectedData?.reason.push(reasonInput),
        ...selectedData,
      });
    }
    setReasonInput("");
  }

  function onDeleteReason(index) {
    setSelectedData({
      ...selectedData,
      reason: popIndex(selectedData?.reason, index),
    });
  }

  function onAddSolution() {
    if (solutionInput.trim() !== "") {
      setSelectedData({
        solution: selectedData?.solution.push(solutionInput),
        ...selectedData,
      });
    }
    setSolutionInput("");
  }

  function onDeleteSolution(index) {
    setSelectedData({
      ...selectedData,
      solution: popIndex(selectedData?.solution, index),
    });
  }
  function onAddEvaluation() {
    if (evaluationInput.trim() !== "") {
      setSelectedData({
        evaluation: selectedData?.evaluation.push(evaluationInput),
        ...selectedData,
      });
    }
    setEvaluationInput("");
  }

  function onDeleteEvaluation(index) {
    setSelectedData({
      ...selectedData,
      evaluation: popIndex(selectedData?.evaluation, index),
    });
  }

  function onAddNewReason() {
    if (reasonInput.trim() !== "") {
      setNewSuggest({
        reason: newSuggest?.reason.push(reasonInput),
        ...newSuggest,
      });
    }
    setReasonInput("");
  }

  function onDeleteNewReason(index) {
    setNewSuggest({
      ...newSuggest,
      reason: popIndex(newSuggest?.reason, index),
    });
  }

  function onAddNewSolution() {
    if (solutionInput.trim() !== "") {
      setNewSuggest({
        solution: newSuggest?.solution.push(solutionInput),
        ...newSuggest,
      });
    }
    setSolutionInput("");
  }

  function onDeleteNewSolution(index) {
    setNewSuggest({
      ...newSuggest,
      solution: popIndex(newSuggest?.solution, index),
    });
  }
  function onAddNewEvaluation() {
    if (evaluationInput.trim() !== "") {
      setNewSuggest({
        evaluation: newSuggest?.evaluation.push(evaluationInput),
        ...newSuggest,
      });
    }
    setEvaluationInput("");
  }

  function onDeleteNewEvaluation(index) {
    setNewSuggest({
      ...newSuggest,
      evaluation: popIndex(newSuggest?.evaluation, index),
    });
  }

  function onAddMethod() {
    if (methodInput.trim() !== "") setMethodList([...methodList, methodInput]);
    setMethodInput("");
  }

  function onDeleteMethod(index) {
    setMethodList(popIndex(methodList, index));
  }

  function onAddSum() {
    if (sumInput.trim() !== "") setSumList([...sumList, sumInput]);
    setSumInput("");
  }

  function onDeleteSum(index) {
    setSumList(popIndex(sumList, index));
  }

  function handleSubmit(values) {
    let newItem = {
      ...values,
      ...newSuggest,
    };
    // setConfirmLoading(true);
    console.log("Recieved values of form: ", newItem);
    // addSuggest(values)
    //   .then(() => {
    //     openNotificationWithIcon(
    //       "success",
    //       "Teacher edited",
    //       "User " + values.username + " has been saved."
    //     );
    setAddVisible(false);
    setConfirmLoading(false);
    //     form.resetFields();
    //   })
    //   .catch(() => {
    //     setConfirmLoading(false);
    //     openNotificationWithIcon(
    //       "error",
    //       "Cannot edit user",
    //       "Unexpected error occured, Please try again."
    //     );
    //   });
    setSuggest([...suggest, newItem]);
    setNewSuggest({ reason: [], solution: [], evaluation: [] });
  }

  function handleEdit(values) {
    let newItem = {
      ...values,
      ...selectedData,
    };
    console.log("Recieved values of form: ", newItem);
    // setConfirmLoading(true);
  }

  function handleCancel() {
    form.resetFields();
    editForm.resetFields();
    setSelectedData(null);
    setEditVisible(false);
    setAddVisible(false);
    clearEdit();
  }

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  function onDeleteNextImprove(id) {
    alert("Delete " + id);
  }

  function initEdit(i) {
    let values = {
      title: suggest[i].title,
      reason: suggest[i].reason,
      solution: suggest[i].solution,
      evaluation: suggest[i].evaluation,
    };
    setSelectedData(values);
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

  function onSave() {
    let data = {
      grade: gradeForm.getFieldsValue(),
      improvement: improvedList,
      suggest: suggest,
      method: methodList,
      sum: sumList,
    };
    console.log("Save :", data);
  }

  function genExtra(i) {
    return (
      <>
        <Tooltip title="Edit">
          <EditOutlined
            style={{ marginRight: "1rem", color: "#009FC7" }}
            onClick={(e) => {
              // If you don't want click extra trigger collapse, you can prevent this:
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
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
              }}
            />
          </Popconfirm>
        </Tooltip>
      </>
    );
  }

  useEffect(() => {
    //  Set fetched data
    setSuggest(improvement);
    setGrade(data);
    // eslint-disable-next-line
  }, []);

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
            dataSource={[data]}
            pagination={{ position: ["none", "none"] }}
            bordered
          >
            <Column
              title="A"
              dataIndex="A"
              key="a"
              render={() => (
                <Form.Item name="A">
                  <InputNumber min={0} />
                </Form.Item>
              )}
            />
            <Column
              title="B+"
              dataIndex="BP"
              key="b+"
              render={() => (
                <Form.Item name="BP">
                  <InputNumber min={0} />
                </Form.Item>
              )}
            />
            <Column
              title="B"
              dataIndex="B"
              key="b"
              render={() => (
                <Form.Item name="B">
                  <InputNumber min={0} />
                </Form.Item>
              )}
            />
            <Column
              title="C+"
              dataIndex="CP"
              key="c+"
              render={() => (
                <Form.Item name="CP">
                  <InputNumber min={0} />
                </Form.Item>
              )}
            />
            <Column
              title="C"
              dataIndex="C"
              key="c"
              render={() => (
                <Form.Item name="C">
                  <InputNumber min={0} />
                </Form.Item>
              )}
            />
            <Column
              title="D+"
              dataIndex="DP"
              key="d+"
              render={() => (
                <Form.Item name="DP">
                  <InputNumber min={0} />
                </Form.Item>
              )}
            />
            <Column
              title="D"
              dataIndex="D"
              key="d"
              render={() => (
                <Form.Item name="D">
                  <InputNumber min={0} />
                </Form.Item>
              )}
            />
            <Column
              title="F"
              dataIndex="F"
              key="f"
              render={() => (
                <Form.Item name="F">
                  <InputNumber min={0} />
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
          {improvedList.map((ele, i) => (
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
          ))}
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
        <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
          {suggest?.map((ele, i) => (
            <Panel header={ele.title} key={i} extra={genExtra(i)}>
              <Header level={4}>ที่มา/เหตุผล</Header>
              <ul>
                {ele.reason.map((reason, j) => (
                  <li key={"reason-table-" + i + "-" + j}>{reason}</li>
                ))}
              </ul>
              <Header level={4}>การดำเนินการ</Header>
              <ul>
                {ele.solution.map((solution, j) => (
                  <li key={"solution-table-" + i + "-" + j}>{solution}</li>
                ))}
              </ul>
              <Header level={4}>การประเมิณผล</Header>
              <ul>
                {ele.evaluation.map((evaluation, j) => (
                  <li key={"evaluation-table-" + i + "-" + j}>{evaluation}</li>
                ))}
              </ul>
            </Panel>
          ))}
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
            {methodList.map((ele, i) => (
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
            ))}
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
            {sumList.map((ele, i) => (
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
            ))}
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
          <MyBtn className={styles.addBtn} onClick={() => alert("PDF")}>
            Export PDF
          </MyBtn>
          <MyBtn className={styles.addBtn} onClick={() => onSave()}>
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
              {newSuggest?.reason.map((ele, i) => (
                <li key={"reason" + i} className={styles.addLi}>
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
              {newSuggest?.solution.map((ele, i) => (
                <li key={"solution" + i} className={styles.addLi}>
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
              {selectedData?.reason.map((ele, i) => (
                <li key={"reason" + i} className={styles.addLi}>
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
              {selectedData?.solution.map((ele, i) => (
                <li key={"solution" + i} className={styles.addLi}>
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
    </div>
  );
}

export { TeacherReportForm };
