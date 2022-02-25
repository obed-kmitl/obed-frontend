import { useActivityGrading } from "./hooks/useActivityGrading";
import { Tooltip, InputNumber, Table } from "antd";
import { Header, Body } from "..";
import styles from './ActivityGrading.module.scss'
import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    CloseCircleFilled
} from "@ant-design/icons";

export const ActivityGrading = ({ activity }) => {
    const { Column } = Table
    const {
        stdWithScore,
        subActivity,
        //rubrics,
        // handleSelectRubric,
        editingScore,
        setEditingScore,
        onScoreChange,
        saveScore,
        setScoreValue
    } = useActivityGrading()

    let totalMaxScore = 0
    subActivity?.forEach(element => {
        totalMaxScore = totalMaxScore + element.max_score || 0
    })

    // const Rubric = ({ studentId, sub_activity_id }) => {
    //     const [defRubric, setDefRubric] = useState();

    //     useEffect(() => {
    //         let arr = rubrics.sort((a, b) => a.point - b.point);
    //         setDefRubric(arr);
    //     }, []);

    //     return (
    //         <div className={styles.rubricWrap}>
    //             {defRubric?.map((ele, i) => (
    //                 <div className={styles.rubric} key={"def" + i} onClick={() => handleSelectRubric(ele.point, studentId, sub_activity_id)}>
    //                     <Header level={4} className={styles.level}>
    //                         Level {i + 1}
    //                     </Header>
    //                     <Body level={3} className={styles.desc}>
    //                         {ele.desc}
    //                     </Body>
    //                     <Header level={5} className={styles.point}>{ele.point} Points</Header>
    //                 </div>
    //             ))}
    //         </div>
    //     )
    // }

 

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "space-between", gap: "0.5rem", paddingBottom: "1rem",width:"100%" }}>
                <Header level={2}>Assessment</Header>
                <Tooltip title="กรอกครบแล้ว/ยังกรอกไม่ครบ/ยังไม่ได้กรอก" overlayStyle={{ maxWidth: '500px' }}>
                    <div style={{ color: "white", display: "flex", textAlign: "center", fontSize: "18px" }}>
                        <div style={{ backgroundColor: "#68A028", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {stdWithScore.filter((s) => s.score_status === "Finished").length}
                        </div>
                        <div style={{ backgroundColor: "#F7941D", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {stdWithScore.filter((s) => s.score_status === "Not Finished").length}
                        </div>
                        <div style={{ backgroundColor: "#C73535", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {stdWithScore.filter((s) => s.score_status === "Not Submitted").length}
                        </div>
                    </div>
                </Tooltip>
                {/* <Button >Import</Button> */}
            </div>
            <Table
                dataSource={stdWithScore}
                rowKey="student_id"
                bordered
                scroll={{ x: 'max-content' }}
                pagination={false}
            >
                <Column
                    title="Student ID"
                    dataIndex="student_number"
                    key="student_number"
                    width={120}
                    fixed="left"
                />
                <Column
                    title="Name"
                    dataIndex="firstname"
                    key="firstname"
                    fixed="left"
                    width={230}
                    render={(text, record) =>
                        record.prefix + text + " " + record.lastname
                    }
                />
                {
                    subActivity?.map((subAct, i) =>
                        <Column
                            title={<Tooltip width={300} title={subAct.detail}>{`ข้อที่ ${i + 1} (${subAct.max_score} pts)`}</Tooltip>}
                            editable={true}
                            key="student_number"
                            render={(_, record) => {
                                if (editingScore[0] === record.student_id && editingScore[1] === subAct.sub_activity_id) {
                                    return (
                                        <InputNumber
                                            min={0}
                                            max={subAct.max_score}
                                            step={0.5}
                                            style={{ width: "95px", margin: "-10px 0" }}
                                            onChange={onScoreChange}
                                            defaultValue={record.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score}
                                            onBlur={() => saveScore(record.student_id, subAct.sub_activity_id)}
                                            onPressEnter={() => saveScore(record.student_id, subAct.sub_activity_id)}
                                        />)
                                }
                                else
                                    return (
                                        <div onClick={() => {
                                            console.log(editingScore)
                                            setEditingScore([record.student_id, subAct.sub_activity_id]);

                                        }}
                                        >
                                            {record.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score || <Body>&nbsp;</Body>}

                                        </div>
                                    )
                            }
                            }
                        />
                    )
                }
                <Column
                    title={`Total (${totalMaxScore} pts)`}
                    key="scores"
                    fixed="right"
                    width={150}
                    render={(_, record) => {
                        let calculatedScore = 0
                        record.scores.forEach(element => {
                            calculatedScore = calculatedScore + element.obtained_score || 0
                        })
                        return (
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                {calculatedScore + " pts"}
                                <div style={{   }}>
                                    {
                                        record.score_status === "Finished" &&
                                        <div style={{ color: "#68A028" }}>
                                            <Tooltip title={record.score_status}>
                                                <CheckCircleFilled />
                                            </Tooltip>
                                        </div>
                                    }
                                    {
                                        record.score_status === "Not Finished" &&
                                        <div style={{ color: "#F7941D" }}>
                                            <Tooltip title={record.score_status}>
                                                <ExclamationCircleFilled />
                                            </Tooltip>
                                        </div>
                                    }
                                    {
                                        record.score_status === "Not Submitted" &&
                                        <div style={{ color: "#C73535" }}>
                                            <Tooltip title={record.score_status}>
                                                <CloseCircleFilled />
                                            </Tooltip>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    }}
                />
            </Table>
            {/*
             <Collapse accordion >
                {stdWithScore?.map((student, index) => {

                    let calculatedScore = 0
                    let totalMaxScore = 0
                    student.scores.forEach(element => {
                        calculatedScore = calculatedScore + element.obtained_score || 0
                        totalMaxScore = totalMaxScore + element.max_score || 0
                    })
                    return (
                        <Panel
                            header={
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Header level={5}>{student.student_number + "  " + student.prefix + student.firstname + " " + student.lastname}</Header>
                                    <div style={{ display: "flex", gap: "3rem", alignItems: "center", fontSize: "16px" }}>
                                        <div>
                                            <div>{calculatedScore} / {totalMaxScore}</div>
                                        </div>
                                        <div style={{ width: "120px", textAlign: "end" }}>
                                            {
                                                student.score_status === "Finished" &&
                                                <div style={{ color: "#68A028" }}>
                                                    {student.score_status}
                                                </div>
                                            }
                                            {
                                                student.score_status === "Not Finished" &&
                                                <div style={{ color: "#F7941D" }}>
                                                    {student.score_status}
                                                </div>
                                            }
                                            {
                                                student.score_status === "Not Submitted" &&
                                                <div style={{ color: "#C73535" }}>
                                                    {student.score_status}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                            }
                            key={index}
                        >
                            <div style={{ height: "150px",overflow: "hidden" }}>
                                <div>
                                    <Tabs defaultActiveKey="0" tabPosition={"top"} >
                                        {subActivity?.map((subAct, i) => (
                                            <Tabs.TabPane tab={'ข้อ ' + (i + 1)} key={i}>
                                                <div className={styles.subActivityHeader}>
                                                    <Body level={2}>{subAct.detail}</Body>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        {editingScore[0] === student.student_id && editingScore[1] === subAct.sub_activity_id ?
                                                            <>
                                                                <div style={{ width: '150px', display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>
                                                                    <InputNumber
                                                                        style={{ width: "60px" }}
                                                                        min={0}
                                                                        max={subAct.max_score}
                                                                        step={0.5}
                                                                        onChange={onScoreChange}
                                                                        defaultValue={student.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score}
                                                                    />

                                                                    <Body level={1}> &nbsp;{" / " + subAct.max_score}&nbsp;</Body>
                                                                </div>
                                                                <Button
                                                                    style={{ marginLeft: '1rem' }}
                                                                    onClick={() => saveScore(student.student_id, subAct.sub_activity_id)}
                                                                >
                                                                    Save Score
                                                                </Button>

                                                            </>

                                                            :
                                                            <>
                                                                <div style={{ width: '150px', display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>
                                                                    <Body level={1}>
                                                                        {student.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score}
                                                                    </Body>

                                                                    <Body level={1}> &nbsp;{" / " + subAct.max_score}&nbsp;</Body>
                                                                </div>
                                                                <Button
                                                                    style={{ marginLeft: '1rem' }}
                                                                    onClick={() => {
                                                                        setEditingScore([student.student_id, subAct.sub_activity_id]);
                                                                        setScoreValue(student.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0].obtained_score)
                                                                    }}
                                                                >
                                                                    Edit Score
                                                                </Button>

                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                                { <Rubric studentId={student.id} sub_activity_id={subAct.id} /> }
                                            </Tabs.TabPane>
                                        ))}

                                    </Tabs>
                                </div>
                            </div>
                        </Panel>
                    )
                })}
            </Collapse>
 */}

        </>
    )
}