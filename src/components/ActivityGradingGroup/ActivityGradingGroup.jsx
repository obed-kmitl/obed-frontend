import { useActivityGradingGroup } from "./hooks/useActivityGradingGroup";
import { Tooltip, Tabs, InputNumber, Table } from "antd";
import { Button, Collapse, Panel, Header, Body } from "..";
import styles from './ActivityGradingGroup.module.scss'
import { EyeOutlined, WarningOutlined } from "@ant-design/icons";

import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    CloseCircleFilled
} from "@ant-design/icons";

export const ActivityGradingGroup = ({ activity }) => {
    const { Column } = Table
    const {
        group,
        subActivity,
        /* rubrics, 
        handleSelectRubric,*/
        editingScore,
        setEditingScore,
        onScoreChange,
        saveScore,
        setScoreValue
    } = useActivityGradingGroup()

    let totalMaxScore = 0
    subActivity?.forEach(element => {
        totalMaxScore = totalMaxScore + element.max_score || 0
    })

    // const Rubric = ({ groupId, sub_activity_id }) => {
    //     const [defRubric, setDefRubric] = useState();

    //     useEffect(() => {
    //         let arr = rubrics.sort((a, b) => a.point - b.point);
    //         setDefRubric(arr);
    //     }, []);

    //     return (
    //         <div className={styles.rubricWrap}>
    //             {defRubric?.map((ele, i) => (
    //                 <div className={styles.rubric} key={"def" + i} onClick={() => handleSelectRubric(ele.point, groupId, sub_activity_id)}>
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
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: "space-between", gap: "0.5rem", paddingBottom: "1rem", width: "100%" }}>
                <Header level={2}>Assessment</Header>
                <Tooltip title="กรอกครบแล้ว/ยังกรอกไม่ครบ/ยังไม่ได้กรอก" overlayStyle={{ maxWidth: '500px' }}>
                    <div style={{ color: "white", display: "flex", textAlign: "center", fontSize: "18px" }}>
                        <div style={{ backgroundColor: "#68A028", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {group.filter((s) => s.score_status === "Finished").length}
                        </div>
                        <div style={{ backgroundColor: "#F7941D", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {group.filter((s) => s.score_status === "Not Finished").length}
                        </div>
                        <div style={{ backgroundColor: "#C73535", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {group.filter((s) => s.score_status === "Not Submitted").length}
                        </div>
                    </div>
                </Tooltip>
                {/* <Button >Import</Button> */}
            </div>
            <Table
                dataSource={group}
                rowKey="group_id"
                bordered
                scroll={{ x: 'max-content' }}
                pagination={false}
            >
                <Column
                    title="Group"
                    dataIndex="title"
                    key="title"
                    fixed="left"
                    render={(title, record) =>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            {title + " "}
                            {record.member[0].student_id !== null ?
                                <Tooltip title={record.member.map((student) => {
                                    return (
                                        <>
                                            {student.student_number + " " + student.prefix + student.firstname + " " + student.lastname}
                                            <br />
                                        </>)
                                }

                                )}
                                >
                                    <EyeOutlined />
                                </Tooltip>
                                :
                                <Tooltip title="There is NO Student in this group">
                                    <Body style={{ color: "#C73535" }}>
                                        <WarningOutlined />
                                    </Body>
                                </Tooltip>
                            }
                        </div>
                    }
                />
                {
                    subActivity?.map((subAct, i) =>
                        <Column
                            title={<Tooltip width={300} title={subAct.detail}>{`ข้อที่ ${i + 1} (${subAct.max_score} pts)`}</Tooltip>}
                            editable={true}
                            key="student_number"
                            width={150}
                            render={(_, record) => {
                                if (editingScore[0] === record.group_id && editingScore[1] === subAct.sub_activity_id) {
                                    return (
                                        <InputNumber
                                            min={0}
                                            max={subAct.max_score}
                                            step={0.5}
                                            style={{ width: "100%", margin: "-10px 0",borderBottom:"2px solid #009fc7" }}
                                            onChange={onScoreChange}
                                            defaultValue={record.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score}
                                            onBlur={() => saveScore(record.group_id, subAct.sub_activity_id)}
                                            onPressEnter={() => saveScore(record.group_id, subAct.sub_activity_id)}
                                            autoFocus
                                            bordered={false}
                                        />)
                                }
                                else
                                    return (
                                        <div onClick={() => {
                                            console.log(editingScore)
                                            setEditingScore([record.group_id, subAct.sub_activity_id]);
                                            setScoreValue(record.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score)
                                        }}
                                        >
                                            {record.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score === 0 ? 0
                                                : record.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score
                                                || <Body>&nbsp;</Body>}

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
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                {calculatedScore + " pts"}
                                <div style={{}}>
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

            {/* <Collapse accordion >
                {group?.map((g, index) => {

                    let calculatedScore = 0
                    let totalMaxScore = 0
                    g.scores.forEach(element => {
                        calculatedScore = calculatedScore + element.obtained_score || 0
                        totalMaxScore = totalMaxScore + element.max_score || 0
                    })
                    return (
                        <Panel
                            header={
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Header level={5}>
                                        {g.title + " "}
                                        <Tooltip title={g.member.map((student) =>
                                            <>
                                                {student.student_number + " " + student.prefix + student.firstname + " " + student.lastname}
                                                <br />
                                            </>
                                        )}
                                        >
                                            <EyeOutlined />
                                        </Tooltip>
                                    </Header>
                                    <div style={{ display: "flex", gap: "3rem", alignItems: "center", fontSize: "16px" }}>
                                        {g.member[0].student_id === null ?
                                            <Body style={{ color: "#C73535" }}>
                                                There is no student in this group&nbsp;
                                                <WarningOutlined />
                                            </Body>
                                            :
                                            <>
                                                <div>
                                                    <div>{calculatedScore} / {totalMaxScore}</div>
                                                </div>
                                                <div style={{ width: "120px", textAlign: "end" }}>
                                                    {
                                                        g.score_status === "Finished" &&
                                                        <div style={{ color: "#68A028" }}>
                                                            {g.score_status}
                                                        </div>
                                                    }
                                                    {
                                                        g.score_status === "Not Finished" &&
                                                        <div style={{ color: "#F7941D" }}>
                                                            {g.score_status}
                                                        </div>
                                                    }
                                                    {
                                                        g.score_status === "Not Submitted" &&
                                                        <div style={{ color: "#C73535" }}>
                                                            {g.score_status}
                                                        </div>
                                                    }
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>

                            }
                            key={index}
                            collapsible={g.member[0].student_id === null && "disabled"}
                        >
                            <div style={{ overflow: "auto" }}>
                                <div>
                                    <Tabs defaultActiveKey="0" tabPosition={"top"} >
                                        {subActivity?.map((subAct, i) => (
                                            <Tabs.TabPane tab={'ข้อ ' + (i + 1)} key={i}>
                                                <div className={styles.subActivityHeader}>
                                                    <Body level={2}>{subAct.detail}</Body>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        {editingScore[0] === g.group_id && editingScore[1] === subAct.sub_activity_id ?
                                                            <>
                                                                <div style={{ width: '150px', display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>
                                                                    <InputNumber
                                                                        style={{ width: "60px" }}
                                                                        min={0}
                                                                        max={subAct.max_score}
                                                                        onChange={onScoreChange}
                                                                        defaultValue={g.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score}
                                                                    />

                                                                    <Body level={1}> &nbsp;{" / " + subAct.max_score}&nbsp;</Body>
                                                                </div>
                                                                <Button
                                                                    style={{ marginLeft: '1rem' }}
                                                                    onClick={() => saveScore()}
                                                                >
                                                                    Save Score
                                                                </Button>
                                                            </>

                                                            :
                                                            <>
                                                                <div style={{ width: '150px', display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>
                                                                    <Body level={1}>
                                                                        {g.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score}
                                                                    </Body>
                                                                    <Body level={1}> &nbsp;{" / " + subAct.max_score}&nbsp;</Body>
                                                                </div>
                                                                <Button
                                                                    style={{ marginLeft: '1rem' }}
                                                                    onClick={() => setEditingScore([g.group_id, subAct.sub_activity_id])}
                                                                >
                                                                    Edit Score
                                                                </Button>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                                {/* <Rubric groupId={g.id} sub_activity_id={subAct.id} /> }
                                            </Tabs.TabPane>
                                        ))}

                                    </Tabs>
                                </div>
                            </div>
                        </Panel>
                    )
                })}
            </Collapse> */}
        </div>
    )
}




// <GradingTable students={students} setStudents={setStudents} activity={activity}/>