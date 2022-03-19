import { useActivityGrading } from "./hooks/useActivityGrading";
import { Tooltip, InputNumber, Table, Upload, message, Modal, Divider, Typography } from "antd";
import { Header, Body, Button } from "..";
import styles from './ActivityGrading.module.scss'
import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    CloseCircleFilled,
    UploadOutlined
} from "@ant-design/icons";
import downloadAsExcel from '../../utils/jsonToExcel'
import excelReader from "../../utils/excelReader";

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
        setScoreValue,
        handleImportScore,
        importModalVisible,
        setImportModalVisible,
        confirmImport
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
    // } handleImportScore(datafromExcel)

    const uploadProps = {
        name: "file",
        beforeUpload: () => false,
        maxCount: 1,
        accept: ".xlsx, .xls",
        async onChange({ file }) {
          if (file.status !== "removed") {
            const datafromExcel = await excelReader(file);
            handleImportScore(datafromExcel)
            message.success(`${file.name} file uploaded successfully`);
          }
        },
      };
    

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: "space-between", gap: "0.5rem", paddingBottom: "1rem", width: "100%" }}>
                <Header level={2}>Assessment</Header>
                <div style={{ display: 'flex', gap: "0.5rem" }}>
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
                    <Button onClick={() => setImportModalVisible(true)}>
                        Import
                    </Button>
                </div>
            </div>
            <Table
                dataSource={stdWithScore}
                rowKey="student_id"
                bordered
                scroll={{ x: 'max-content' }}
                pagination={false}
                id="table"
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
                            width={150}
                            render={(_, record) => {
                                if (editingScore[0] === record.student_id && editingScore[1] === subAct.sub_activity_id) {
                                    return (
                                        <InputNumber
                                            //min={0}
                                            //max={subAct.max_score}
                                            //step={0.5}
                                            style={{ width: "100%", margin: "-10px 0", borderBottom: "2px solid #009fc7" }}
                                            onChange={(e)=>onScoreChange(e,subAct.max_score)}
                                            defaultValue={record.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score}
                                            onBlur={() => saveScore(record.student_id, subAct.sub_activity_id)}
                                            onPressEnter={() => saveScore(record.student_id, subAct.sub_activity_id)}
                                            autoFocus
                                            bordered={false}

                                        />)
                                }
                                else
                                    return (
                                        <div
                                            onClick={() => {
                                                console.log(editingScore)
                                                setEditingScore([record.student_id, subAct.sub_activity_id]);
                                                setScoreValue(record.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score)
                                            }}
                                            style={{ cursor: "pointer",display:"flex",justifyContent:"flex-end" }}
                                        >
                                            {
                                                record.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score === 0 ? 0
                                                    : record.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score
                                                    || <Body>&nbsp;</Body>
                                            }

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

            <Modal
                title={<Header level={3}>Import Score</Header>}
                visible={importModalVisible}
                okText="Import"
                onOk={() => confirmImport()}
                onCancel={() => setImportModalVisible(false)}
                okButtonProps={{ htmlType: "submit" }}
                maskClosable={false}
                width="700px"
            >
                <div className={styles.importModal}>
                    <div className={styles.upload}>
                        <Header level={4}>Upload File</Header>
                        <Body level={4} style={{ marginBottom: "1rem" }}>
                            Existing data will be override
                        </Body>
                        <div className={styles.uploadBtn}>
                            <Upload {...uploadProps}>
                                <Button icon={<UploadOutlined />} type="primary">
                                    Upload
                                </Button>
                            </Upload>
                        </div>
                    </div>
                    <Divider type="vertical" style={{ height: "100%" }} />
                    <div className={styles.download}>
                        <Body level={3}>
                            To Import Score, You need to download template and upload
                            complete file to OBED.{" "}
                        </Body>
                        <Typography.Link
                            onClick={() => {
                                const modifyData = stdWithScore.map((student) => {
                                    const data = {
                                        student_number: student.student_number,
                                        prefix: student.prefix,
                                        firstname: student.firstname,
                                        lastname: student.lastname
                                    }
                                    student.scores.sort((a, b) => a.sub_activity_id - b.sub_activity_id).map((score, i) => {
                                        data[`ข้อ${i + 1}(${score.max_score})`] = score.obtained_score
                                    })
                                    return data
                                })
                                console.log(modifyData, activity.title);
                                downloadAsExcel(modifyData, activity.title)
                            }}>
                            Download Template
                        </Typography.Link>
                    </div>
                </div>
            </Modal>
        </div>
    )
}