import { useState, useEffect } from "react";
import httpClient from "../../../utils/httpClient";
import { useParams } from "react-router-dom";
import { message } from "antd";
// const student = [
//     {
//       id: 61010001,
//       prefix: "นางสาว",
//       firstname: "กมลชนก",
//       lastname: "ศรีไทย",
//       email: "61010001@kmitl.ac.th",
//     },
//     {
//       id: 61010002,
//       prefix: "นาย",
//       firstname: "ธนวัฒน์",
//       lastname: "สมมุติ",
//       email: "61010002@kmitl.ac.th",
//     },
//     {
//       id: 61010003,
//       prefix: "นาย",
//       firstname: "สมปอง",
//       lastname: "สุขสบาย",
//       email: "61010003@kmitl.ac.th",
//     },
//     {
//       id: 61010004,
//       prefix: "นาย",
//       firstname: "สมปราชญ์",
//       lastname: "สดใส",
//       email: "61010004@kmitl.ac.th",
//     },
//     {
//       id: 61010005,
//       prefix: "นาย",
//       firstname: "สมหมาย",
//       lastname: "สายไทย",
//       email: "61010005@kmitl.ac.th",
//     },
//     {
//       id: 61010006,
//       prefix: "นาย",
//       firstname: "สมหมาย",
//       lastname: "รักไทย",
//       email: "61010006@kmitl.ac.th",
//     },
//     {
//       id: 61010007,
//       prefix: "นาย",
//       firstname: "สมศักดิ์",
//       lastname: "ใฝ่รู้",
//       email: "61010007@kmitl.ac.th",
//     },
//     {
//       id: 61010008,
//       prefix: "นาย",
//       firstname: "สมชาย",
//       lastname: "ใจดี",
//       email: "61010008@kmitl.ac.th",
//     },
//     {
//       id: 61010009,
//       prefix: "นาย",
//       firstname: "สมพงศ์",
//       lastname: "ชัยชนะ",
//       email: "61010009@kmitl.ac.th",
//     },
//     {
//       id: 61010010,
//       prefix: "นางสาว",
//       firstname: "สมสง่า",
//       lastname: "ราศี",
//       email: "61010010@kmitl.ac.th",
//     },
//     {
//       id: 61010011,
//       prefix: "นางสาว",
//       firstname: "สมหญิง",
//       lastname: "จริงใจ",
//       email: "61010011@kmitl.ac.th",
//     },
//   ];

// const groups = [
//     {
//         id: 1,
//         group_name: 'Group 1',
//         member: [61010001, 61010002, 61010003, 61010004],
//         score: [
//             {
//                 sub_activity_id: 1,
//                 max_score: 2,
//                 obtained_score: null

//             },
//             {
//                 sub_activity_id: 2,
//                 max_score: 2,
//                 obtained_score: null

//             },
//             {
//                 sub_activity_id: 3,
//                 max_score: 2,
//                 obtained_score: null

//             },
//             {
//                 sub_activity_id: 4,
//                 max_score: 2,
//                 obtained_score: null

//             }
//         ]
//     },
//     {
//         id: 2,
//         group_name: 'Group 2',
//         member: [61010005, 61010006, 61010007],
//         score: [
//             {
//                 sub_activity_id: 1,
//                 max_score: 2,
//                 obtained_score: null

//             },
//             {
//                 sub_activity_id: 2,
//                 max_score: 2,
//                 obtained_score: null

//             },
//             {
//                 sub_activity_id: 3,
//                 max_score: 2,
//                 obtained_score: null

//             },
//             {
//                 sub_activity_id: 4,
//                 max_score: 2,
//                 obtained_score: null

//             }
//         ]
//     },
//     {
//         id: 3,
//         group_name: 'Group 3',
//         member: [61010008, 61010009, 61010010],
//         score: [
//             {
//                 sub_activity_id: 1,
//                 max_score: 2,
//                 obtained_score: 1

//             },
//             {
//                 sub_activity_id: 2,
//                 max_score: 2,
//                 obtained_score: null

//             },
//             {
//                 sub_activity_id: 3,
//                 max_score: 2,
//                 obtained_score: null

//             },
//             {
//                 sub_activity_id: 4,
//                 max_score: 2,
//                 obtained_score: null

//             }
//         ]
//     },
//     {
//         id: 4,
//         group_name: 'Group 4',
//         member: [61010011, 61019999, 61019998],
//         score: [
//             {
//                 sub_activity_id: 1,
//                 max_score: 2,
//                 obtained_score: 1

//             },
//             {
//                 sub_activity_id: 2,
//                 max_score: 2,
//                 obtained_score: 1

//             },
//             {
//                 sub_activity_id: 3,
//                 max_score: 2,
//                 obtained_score: 2

//             },
//             {
//                 sub_activity_id: 4,
//                 max_score: 2,
//                 obtained_score: 2

//             }
//         ]
//     }
// ]

// const mockSubActivity = [
//     {
//         id: 1,
//         title: "ข้อ 1",
//         detail: "จงแปลงเลขฐาน 2 จาก 1010 1111 0010 เป็นเลขฐาน 10 และเลขฐาน 16",
//         clo: [1, 2],
//         point: 2
//     },
//     {
//         id: 2,
//         title: "ข้อ 2",
//         detail: "จงแปลงเลขฐาน 2 จาก 1000 1101 0110 เป็นเลขฐาน 10 และเลขฐาน 16",
//         clo: [1, 2],
//         point: 2
//     },
//     {
//         id: 3,
//         title: "ข้อ 3",
//         detail: "จงแปลงเลขฐาน 10 จาก 178 เป็นเลขฐาน 2 และเลขฐาน 16",
//         clo: [1, 3],
//         point: 2
//     },
//     {
//         id: 4,
//         title: "ข้อ 4",
//         detail: "จงแปลงเลขฐาน 16 จาก 57FA เป็นเลขฐาน 10 และเลขฐาน 2",
//         clo: [2, 3],
//         point: 2
//     }
// ]

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

export const useActivityGradingGroup = () => {
    let { activityId } = useParams();
    const [group, setGroup] = useState([])
    const [subActivity, setSubActivity] = useState()
    const [editingScore, setEditingScore] = useState([])
    const [scoreValue, setScoreValue] = useState()
    const [importData, setImportData] = useState()
    const [importModalVisible, setImportModalVisible] = useState(false);

    // const handleSelectRubric = (point, groupId, sub_activity_id) => {
    //     let updatedScoreGroup = [...group]
    //     const groupIndex =updatedScoreGroup.findIndex(
    //         (item) => item.id === groupId
    //       );
    //     const scoreIndex =updatedScoreGroup[groupIndex].score.findIndex(
    //         (item) => item.sub_activity_id === sub_activity_id
    //       );
    //     updatedScoreGroup[groupIndex].score[scoreIndex].obtained_score = point
    //     const updateStatusScore = updateStatus(updatedScoreGroup)
    //     setGroup(updateStatusScore)

    // }


    const updateStatus = (data) => {
        console.log(data)
        let retriveGroup = data
        const addedStatusGroup = []
        retriveGroup.forEach(g => {
            const allScore = g.scores.map((e) => (e.obtained_score))
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
            addedStatusGroup.push({
                group_id: g.group_id,
                title: g.title,
                member: g.member,
                scores: g.scores,
                score_status: status(),
            })
        })
        return addedStatusGroup
    }

    const onScoreChange = (value) => {
        setScoreValue(value)
    }

    const saveScore = async () => {
        // handleSelectRubric(scoreValue, editingScore[0], editingScore[1])
        let updatedScoreGroup = [...group]
        const groupIndex = updatedScoreGroup.findIndex(
            (item) => item.group_id === editingScore[0]
        );
        const scoreIndex = updatedScoreGroup[groupIndex].scores.findIndex(
            (item) => item.sub_activity_id === editingScore[1]
        );
        updatedScoreGroup[groupIndex].scores[scoreIndex].obtained_score = scoreValue

        return await httpClient
            .post(`/assessment/saveGroupAssessment`, {
                groupAssessments: updatedScoreGroup
            })
            .then(() => {
                const updateStatusScore = updateStatus(updatedScoreGroup)
                setGroup(updateStatusScore)
                setScoreValue(null)
                setEditingScore([])
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function fetchSubActivity() {
        return await httpClient
            .get(`/activity/get/${activityId}`)
            .then((response) => {
                setSubActivity(response.data.data.subActivities)
                return Promise.resolve(response.data.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const fetchGroup = async () => {
        return await httpClient
            .get(`/assessment/getAllGroupAssessmentByActivity/${activityId}`)
            .then((response) => {
                //console.log(updateStatus(response.data.data))
                setGroup(updateStatus(response.data.data))

            })
            .catch((error) => {
                console.log(error)
            });
    }

    function handleImportScore(data) {
        setImportData(data)
        console.log(importData)
    }

    async function confirmImport() {
        try {
            const nowData = group.map(item => ({ ...item }))
            const updateGroupWithScore = importData.map((group) => {
                let importGroup = nowData.find(g => g.title === group.group)

                importGroup.scores.sort((a, b) => a.sub_activity_id - b.sub_activity_id).forEach((item, i) => {
                    if (group[`ข้อ${i + 1}(${item.max_score})`] === 0) {
                        item.obtained_score = 0
                        return;
                    }
                    if (!group[`ข้อ${i + 1}(${item.max_score})`]) {
                        item.obtained_score = null
                        return;
                    }
                    const trimedScore = parseFloat(group[`ข้อ${i + 1}(${item.max_score})`].toString().trim())
                    if (trimedScore <= item.max_score && trimedScore >= 0) {
                        item.obtained_score = trimedScore
                        return;
                    }
                    item.obtained_score = null
                })
                return importGroup
            })
            return await httpClient
                .post(`/assessment/saveGroupAssessment`, {
                    groupAssessments: updateGroupWithScore
                })
                .then(() => {
                    const updateStatusScore = updateStatus(updateGroupWithScore)
                    setGroup(updateStatusScore)
                    setImportModalVisible(false)
                })
                .catch((error) => {
                    console.log(error)
                });
        } catch (errInfo) {
            message.error(`Invalid Template, file upload failed.`);
        }
    }


    useEffect(() => {
        fetchGroup();
        fetchSubActivity();
        // const addedStatusGroup = updateStatus(groups)
        // setGroup(addedStatusGroup)
    }, [])

    return {
        group,
        subActivity,
        // rubrics, 
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
