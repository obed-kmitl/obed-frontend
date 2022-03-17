import { useState, useEffect } from "react";
import httpClient from "../../../utils/httpClient";
import { useParams } from "react-router-dom";
import { message, Modal } from "antd";

export const useActivityGrading = () => {
    let { activityId, sectionId } = useParams()

    const [stdWithScore, setStdWithScore] = useState([])
    const [subActivity, setSubActivity] = useState()
    const [editingScore, setEditingScore] = useState([])
    const [scoreValue, setScoreValue] = useState()
    const [importData, setImportData] = useState()
    const [importModalVisible, setImportModalVisible] = useState(false)
    // const handleSelectRubric = (point, studentId, sub_activity_id) => {
    //     // let updatedScoreStudent = [...students]
    //     // const studentIndex = updatedScoreStudent.findIndex(
    //     //     (item) => item.id === studentId
    //     // );
    //     // const scoreIndex = updatedScoreStudent[studentIndex].score.findIndex(
    //     //     (item) => item.sub_activity_id === sub_activity_id
    //     // );
    //     // updatedScoreStudent[studentIndex].score[scoreIndex].obtained_score = point
    //     // const updateStatusScore = updateStatus(updatedScoreStudent)
    //     // setStudents(updateStatusScore)

    // }

    const updateStatus = (data) => {
        let retriveStudent = data
        const addedStatusStudent = []
        retriveStudent.forEach(student => {
            const allScore = student.scores?.map((e) => (e.obtained_score)) || []
            const status = () => {
                if (!allScore.includes(null)) {
                    return "Finished"
                }
                else if (allScore.includes(null) && allScore.some((i) => i !== null)) {
                    return "Not Finished"
                }
                else {
                    return "Not Submitted"
                }
            }
            addedStatusStudent.push({
                ...student,
                score_status: status(),
            })
        });
        return addedStatusStudent
    }

    const onScoreChange = (value) => {
        setScoreValue(value)
    }

    const saveScore = async (studentId, sub_activity_id) => {
        console.log(scoreValue)
        let updatedScoreStudent = [...stdWithScore]
        const studentIndex = updatedScoreStudent.findIndex(
            (item) => item.student_id === studentId
        );
        const scoreIndex = updatedScoreStudent[studentIndex]?.scores.findIndex(
            (item) => item.sub_activity_id === sub_activity_id
        );
        updatedScoreStudent[studentIndex].scores[scoreIndex].obtained_score = scoreValue

        return await httpClient
            .post(`/assessment/saveIndividual`, {
                individualAssessments: updatedScoreStudent
            })
            .then(() => {
                const updateStatusScore = updateStatus(updatedScoreStudent)
                setStdWithScore(updateStatusScore)
                setEditingScore([])
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const fetchStudentScore = async () => {
        return await httpClient
            .get(`/assessment/getAllIndividualByActivity/${sectionId}/${activityId}`)
            .then((response) => {
                console.log(updateStatus(response.data.data))
                setStdWithScore(updateStatus(response.data.data))

            })
            .catch((error) => {
                console.log(error)
                return Promise.reject(error);
            });
    }

    async function fetchSubActivity() {
        return await httpClient
            .get(`/activity/get/${activityId}`)
            .then((response) => {
                setSubActivity(response.data.data.subActivities)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    function handleImportScore(data) {
        setImportData(data)
        console.log(data)
    }

    async function confirmImport() {
        try {
            const nowData = stdWithScore.map(item => ({ ...item }))
            const invalidData = []
            const updateStdWithScore = importData.map((std) => {
                let student = nowData.find(s => s.student_number === std.student_number)
                student.scores.sort((a, b) => a.sub_activity_id - b.sub_activity_id).forEach((item, i) => {
                    if (std[`ข้อ${i + 1}(${item.max_score})`] === 0) {
                        item.obtained_score = 0
                        return;
                    }
                    if (!std[`ข้อ${i + 1}(${item.max_score})`]) {
                        item.obtained_score = null
                        return;
                    }
                    if (typeof (std[`ข้อ${i + 1}(${item.max_score})`]) !== "number") {
                        invalidData.push(std[`ข้อ${i + 1}(${item.max_score})`] + ` at "ข้อ${i + 1}(${item.max_score})" of "${std.student_number}" is not a number`)
                        item.obtained_score = null
                        return;
                    }
                    const trimedScore = parseFloat(std[`ข้อ${i + 1}(${item.max_score})`].toString().trim())
                    if (trimedScore <= item.max_score && trimedScore >= 0) {
                        item.obtained_score = trimedScore
                        return;
                    }
                    item.obtained_score = null
                    invalidData.push(std[`ข้อ${i + 1}(${item.max_score})`] + ` at "ข้อ${i + 1}(${item.max_score})" of "${std.student_number}" is exceeds the max value (${item.max_score})`)

                })
                return student
            })
            return await httpClient
                .post(`/assessment/saveIndividual`, {
                    individualAssessments: updateStdWithScore
                })
                .then(() => {
                    const updateStatusScore = updateStatus(updateStdWithScore)
                    setStdWithScore(updateStatusScore)
                    setImportModalVisible(false)
                    if (invalidData.length === 0) {
                        Modal.success({
                            title: 'All scores were successfully imported.',
                           
                        });
                    }
                    else {
                        Modal.warning({
                            width:500,
                            title: 'There are invalid data from imported file',
                            content: <ul>{invalidData.map(data=><li>{data}</li>)}</ul>,
                        });
                    }

                })
                .catch((error) => {
                    console.log(error)
                });
        } catch (errInfo) {
            message.error(`Import failed, Invalid Template.`);
        }


    }

    //fetch initial data
    useEffect(() => {
        fetchStudentScore()
        fetchSubActivity()
    }, [])

    return {
        /*students,*/
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
    }
}
