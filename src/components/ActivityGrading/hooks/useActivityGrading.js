import { number } from "prop-types";
import { useState, useEffect } from "react";

const students_score = [
    {
        id: 61010001,
        prefix: "นางสาว",
        firstname: "กมลชนก",
        lastname: "ศรีไทย",
        email: "61010001@kmitl.ac.th",
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: 1.5

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: 2

            },
            {
                sub_activity_id: 3,
                max_score: 2,
                obtained_score: 0.5

            },
            {
                sub_activity_id: 4,
                max_score: 2,
                obtained_score: 2

            }
        ]
    },
    {
        id: 61010002,
        prefix: "นาย",
        firstname: "ธนวัฒน์",
        lastname: "สมมุติ",
        email: "61010002@kmitl.ac.th",
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: 1.5

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: 2

            },
            {
                sub_activity_id: 3,
                max_score: 2,
                obtained_score: 2

            },
            {
                sub_activity_id: 4,
                max_score: 2,
                obtained_score: 2

            }
        ]
    },
    {
        id: 61010003,
        prefix: "นาย",
        firstname: "สมปอง",
        lastname: "สุขสบาย",
        email: "61010003@kmitl.ac.th",
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: 1.5

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: 2

            },
            {
                sub_activity_id: 3,
                max_score: 2,
                obtained_score: 0.5

            },
            {
                sub_activity_id: 4,
                max_score: 2,
                obtained_score: 0

            }
        ]
    },
    {
        id: 61010004,
        prefix: "นาย",
        firstname: "สมปราชญ์",
        lastname: "สดใส",
        email: "61010004@kmitl.ac.th",
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: 1.5

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: 2

            },
            {
                sub_activity_id: 3,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 4,
                max_score: 2,
                obtained_score: 2

            }
        ]
    },
    {
        id: 61010005,
        prefix: "นาย",
        firstname: "สมหมาย",
        lastname: "สายไทย",
        email: "61010005@kmitl.ac.th",
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: 1

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: 2

            },
            {
                sub_activity_id: 3,
                max_score: 2,
                obtained_score: 0.5

            },
            {
                sub_activity_id: 4,
                max_score: 2,
                obtained_score: null

            }
        ]
    },
    {
        id: 61010006,
        prefix: "นาย",
        firstname: "สมหมาย",
        lastname: "รักไทย",
        email: "61010006@kmitl.ac.th",
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: 1.5

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: 2

            },
            {
                sub_activity_id: 3,
                max_score: 2,
                obtained_score: 0.5

            },
            {
                sub_activity_id: 4,
                max_score: 2,
                obtained_score: 1

            }
        ]
    },
    {
        id: 61010007,
        prefix: "นาย",
        firstname: "สมศักดิ์",
        lastname: "ใฝ่รู้",
        email: "61010007@kmitl.ac.th",
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: 1.5

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: 2

            },
            {
                sub_activity_id: 3,
                max_score: 2,
                obtained_score: 2

            },
            {
                sub_activity_id: 4,
                max_score: 2,
                obtained_score: 1.5

            }
        ]
    },
    {
        id: 61010008,
        prefix: "นาย",
        firstname: "สมชาย",
        lastname: "ใจดี",
        email: "61010008@kmitl.ac.th",
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 3,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 4,
                max_score: 2,
                obtained_score: null

            }
        ]
    },
    {
        id: 61010009,
        prefix: "นาย",
        firstname: "สมพงศ์",
        lastname: "ชัยชนะ",
        email: "61010009@kmitl.ac.th",
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 3,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 4,
                max_score: 2,
                obtained_score: null

            }
        ]
    },
    {
        id: 61010010,
        prefix: "นางสาว",
        firstname: "สมสง่า",
        lastname: "ราศี",
        email: "61010010@kmitl.ac.th",
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 3,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 4,
                max_score: 2,
                obtained_score: null

            }
        ]
    },
    {
        id: 61010011,
        prefix: "นางสาว",
        firstname: "สมหญิง",
        lastname: "จริงใจ",
        email: "61010011@kmitl.ac.th",
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 3,
                max_score: 2,
                obtained_score: null

            },
            {
                sub_activity_id: 4,
                max_score: 2,
                obtained_score: null

            }
        ]
    },
];

const mockSubActivity = [
    {
        id: 1,
        title: "ข้อ 1",
        detail: "จงแปลงเลขฐาน 2 จาก 1010 1111 0010 เป็นเลขฐาน 10 และเลขฐาน 16",
        clo: [1, 2],
        point: 2
    },
    {
        id: 2,
        title: "ข้อ 2",
        detail: "จงแปลงเลขฐาน 2 จาก 1000 1101 0110 เป็นเลขฐาน 10 และเลขฐาน 16",
        clo: [1, 2],
        point: 2
    },
    {
        id: 3,
        title: "ข้อ 3",
        detail: "จงแปลงเลขฐาน 10 จาก 178 เป็นเลขฐาน 2 และเลขฐาน 16",
        clo: [1, 3],
        point: 2
    },
    {
        id: 4,
        title: "ข้อ 4",
        detail: "จงแปลงเลขฐาน 16 จาก 57FA เป็นเลขฐาน 10 และเลขฐาน 2",
        clo: [2, 3],
        point: 2
    }
]

const rubrics = [
    {
        point: 0,
        desc: "ไม่ส่งงานในเวลาที่กำหนด",
    },
    {
        point: 0.5,
        desc: "ไม่ผ่านตามมาตรฐาน",
    },
    {
        point: 1,
        desc: "ผ่านตามมาตรฐานที่กำหนด",
    },
    {
        point: 1.5,
        desc: "ผ่านตามมาตรฐานที่กำหนดและถูกต้องสมบูรณ์",
    },
    {
        point: 2,
        desc: "ผ่านตามมาตรฐานที่กำหนดและถูกต้องสมบูรณ์ และมีความคิดสร้างสรรค์ Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
];


export const useActivityGrading = () => {
    const [students, setStudents] = useState([])
    const [subActivity, setSubActivity] = useState()
    const [editingScore, setEditingScore] = useState([])
    const [scoreValue,setScoreValue] = useState()

    const handleSelectRubric = (point, studentId, sub_activity_id) => {
        let updatedScoreStudent = [...students]
        const studentIndex = updatedScoreStudent.findIndex(
            (item) => item.id === studentId
        );
        const scoreIndex = updatedScoreStudent[studentIndex].score.findIndex(
            (item) => item.sub_activity_id === sub_activity_id
        );
        updatedScoreStudent[studentIndex].score[scoreIndex].obtained_score = point
        const updateStatusScore = updateStatus(updatedScoreStudent)
        setStudents(updateStatusScore)

    }

    const updateStatus = (data) =>{
        let retriveStudent = data
        const addedStatusStudent = []
        retriveStudent.forEach(student => {
            const allScore = student.score.map((e) => (e.obtained_score))
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
                id: student.id,
                prefix: student.prefix,
                firstname: student.firstname,
                lastname: student.lastname,
                email: student.email,
                score: student.score,
                score_status: status(),
            })
        });
        return addedStatusStudent
    }

    const onScoreChange = (value) =>{
       setScoreValue(value)
    }

    const saveScore = () => {
        handleSelectRubric(scoreValue, editingScore[0], editingScore[1])
        setScoreValue(null)
        setEditingScore([])
    }

    useEffect(() => {
        const addedStatusStudent = updateStatus(students_score)
        setStudents(addedStatusStudent)

    }, [])
    useEffect(() => {
        setSubActivity(mockSubActivity)
    }, [])

    // useEffect(() => {
    //     console.log(students);
    // }, [students])


    return { students, subActivity, rubrics, handleSelectRubric, editingScore, setEditingScore, onScoreChange, saveScore }
}
