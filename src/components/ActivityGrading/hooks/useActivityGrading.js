import { useState, useEffect } from "react";
import httpClient from "../../../utils/httpClient";
import { useParams } from "react-router-dom";

// const rubrics = [
//     {
//         point: 0,
//         desc: "ไม่ส่งงานในเวลาที่กำหนด",
//     },
//     {
//         point: 0.5,
//         desc: "ไม่ผ่านตามมาตรฐาน",
//     },
//     {
//         point: 1,
//         desc: "ผ่านตามมาตรฐานที่กำหนด",
//     },
//     {
//         point: 1.5,
//         desc: "ผ่านตามมาตรฐานที่กำหนดและถูกต้องสมบูรณ์",
//     },
//     {
//         point: 2,
//         desc: "ผ่านตามมาตรฐานที่กำหนดและถูกต้องสมบูรณ์ และมีความคิดสร้างสรรค์ Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     },
// ];

export const useActivityGrading = () => {
    //const [students, setStudents] = useState([])
    const [stdWithScore, setStdWithScore] = useState([])
    const [subActivity, setSubActivity] = useState()
    const [editingScore, setEditingScore] = useState([])
    const [scoreValue, setScoreValue] = useState()

    let { activityId, sectionId } = useParams();

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
        setScoreValue
    }
}
