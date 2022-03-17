import { useActivityGradingGroup } from "./hooks/useActivityGradingGroup";
import { Tooltip, InputNumber, Table, Upload, message, Modal, Divider, Typography } from "antd";
import { Button, Header, Body } from "..";
import styles from './ActivityGradingGroup.module.scss'
import { EyeOutlined, WarningOutlined, UploadOutlined } from "@ant-design/icons";
import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    CloseCircleFilled
} from "@ant-design/icons";
import downloadAsExcel from '../../utils/jsonToExcel'
import excelReader from "../../utils/excelReader";

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
        setScoreValue,
        handleImportScore,
        importModalVisible,
        setImportModalVisible,
        confirmImport
    } = useActivityGradingGroup()

    let totalMaxScore = 0
    subActivity?.forEach(element => {
        totalMaxScore = totalMaxScore + element.max_score || 0
    })

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
                <div style={{ display: 'flex', gap: "0.5rem" }}>
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
                    <Button onClick={() => setImportModalVisible(true)}>
                        Import
                    </Button>
                </div>
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
                                            style={{ width: "100%", margin: "-10px 0", borderBottom: "2px solid #009fc7" }}
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
                                        <div
                                            onClick={() => {
                                                console.log(editingScore)
                                                setEditingScore([record.group_id, subAct.sub_activity_id]);
                                                setScoreValue(record.scores.filter((e) => e.sub_activity_id === subAct.sub_activity_id)[0]?.obtained_score)
                                            }}
                                            style={{ cursor: "pointer", display: "flex", justifyContent: "flex-end" }}
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
                                const modifyData = group.map((g) => {
                                    console.log(g)
                                    const data = {
                                        group: g.title,
                                        member: g.member.map(s => s.student_number).toString()
                                    }
                                    g.scores.sort((a, b) => a.sub_activity_id - b.sub_activity_id).map((score, i) => {
                                        data[`ข้อ${i + 1}(${score.max_score})`] = score.obtained_score
                                    })
                                    return data
                                })
                                console.log(modifyData)
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
