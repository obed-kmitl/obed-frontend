//import { GradingTable } from "./GradingTable"
import { useState, useEffect } from "react";
import { useActivityGrading } from "./hooks/useActivityGrading";
import { Tooltip, Tabs, Input, InputNumber } from "antd";
import { Button, Collapse, Panel, Header, Body } from "..";
import styles from './ActivityGrading.module.scss'
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

export const ActivityGrading = ({ activity }) => {
    const { students, subActivity, rubrics, handleSelectRubric,editingScore, setEditingScore ,onScoreChange,saveScore } = useActivityGrading()
    
    const Rubric = ({ studentId, sub_activity_id }) => {
        const [defRubric, setDefRubric] = useState();

        useEffect(() => {
            let arr = rubrics.sort((a, b) => a.point - b.point);
            setDefRubric(arr);
        }, []);

        return (
            <div className={styles.rubricWrap}>
                {defRubric?.map((ele, i) => (
                    <div className={styles.rubric} key={"def" + i} onClick={() => handleSelectRubric(ele.point, studentId, sub_activity_id)}>
                        <Header level={4} className={styles.level}>
                            Level {i + 1}
                        </Header>
                        <Body level={3} className={styles.desc}>
                            {ele.desc}
                        </Body>
                        <Header level={5} className={styles.point}>{ele.point} Points</Header>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "flex-end", gap: "0.5rem", paddingBottom: "1rem" }}>
                <Tooltip title="กรอกครบแล้ว/ยังกรอกไม่ครบ/ยังไม่ได้กรอก" overlayStyle={{ maxWidth: '500px' }}>
                    <div style={{ color: "white", display: "flex", textAlign: "center", fontSize: "18px" }}>
                        <div style={{ backgroundColor: "#68A028", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {students.filter((s) => s.score_status === "Finished").length}
                        </div>
                        <div style={{ backgroundColor: "#F7941D", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {students.filter((s) => s.score_status === "Not Finished").length}
                        </div>
                        <div style={{ backgroundColor: "#C73535", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {students.filter((s) => s.score_status === "Not Submitted").length}
                        </div>
                    </div>
                </Tooltip>
                <Button >Import</Button>
            </div>
            <Collapse accordion >
                {students?.map((student, index) => {

                    let calculatedScore = 0
                    let totalMaxScore = 0
                    student.score.forEach(element => {
                        calculatedScore = calculatedScore + element.obtained_score || 0
                        totalMaxScore = totalMaxScore + element.max_score || 0
                    })
                    return (
                        <Panel
                            header={
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Header level={5}>{student.id + "  " + student.prefix + " " + student.firstname + " " + student.lastname}</Header>
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
                            <div style={{ height: "250px", overflow: "auto" }}>
                                <div>
                                    <Tabs defaultActiveKey="0" tabPosition={"left"} >
                                        {subActivity?.map((subAct, i) => (
                                            <Tabs.TabPane tab={subAct.title} key={i}>
                                                <div className={styles.subActivityHeader}>
                                                    <Header level={4}>{subAct.title + " " + subAct.detail}</Header>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        {editingScore[0] === student.id && editingScore[1] === subAct.id ?
                                                            <>
                                                                <InputNumber
                                                                    style={{ width: "60px" }}
                                                                    min={0}
                                                                    max={subAct.point}
                                                                    onChange={onScoreChange}
                                                                    defaultValue={student.score.filter((e) => e.sub_activity_id === subAct.id)[0].obtained_score}
                                                                />
                                                                <Body level={2}> &nbsp;{" / " + subAct.point}&nbsp;</Body>
                                                                <SaveOutlined
                                                                    style={{ color: "#009fc7", cursor: "pointer" }}
                                                                    onClick={() => saveScore()}
                                                                />
                                                            </>

                                                            :
                                                            <>
                                                                <Body level={2}>
                                                                    {student.score.filter((e) => e.sub_activity_id === subAct.id)[0].obtained_score}
                                                                </Body>
                                                                <Body level={2}> &nbsp;{" / " + subAct.point}&nbsp;</Body>
                                                                <EditOutlined
                                                                    style={{ color: "#009fc7", cursor: "pointer" }}
                                                                    onClick={() => setEditingScore([student.id, subAct.id])}
                                                                />
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                                <Rubric studentId={student.id} sub_activity_id={subAct.id} />
                                            </Tabs.TabPane>
                                        ))}

                                    </Tabs>
                                </div>
                            </div>
                        </Panel>
                    )
                })}
            </Collapse>
        </>
    )
}




// <GradingTable students={students} setStudents={setStudents} activity={activity}/>