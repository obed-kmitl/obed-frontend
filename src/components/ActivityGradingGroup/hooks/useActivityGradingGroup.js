import { number } from "prop-types";
import { useState, useEffect } from "react";

const student = [
    {
      id: 61010001,
      prefix: "นางสาว",
      firstname: "กมลชนก",
      lastname: "ศรีไทย",
      email: "61010001@kmitl.ac.th",
    },
    {
      id: 61010002,
      prefix: "นาย",
      firstname: "ธนวัฒน์",
      lastname: "สมมุติ",
      email: "61010002@kmitl.ac.th",
    },
    {
      id: 61010003,
      prefix: "นาย",
      firstname: "สมปอง",
      lastname: "สุขสบาย",
      email: "61010003@kmitl.ac.th",
    },
    {
      id: 61010004,
      prefix: "นาย",
      firstname: "สมปราชญ์",
      lastname: "สดใส",
      email: "61010004@kmitl.ac.th",
    },
    {
      id: 61010005,
      prefix: "นาย",
      firstname: "สมหมาย",
      lastname: "สายไทย",
      email: "61010005@kmitl.ac.th",
    },
    {
      id: 61010006,
      prefix: "นาย",
      firstname: "สมหมาย",
      lastname: "รักไทย",
      email: "61010006@kmitl.ac.th",
    },
    {
      id: 61010007,
      prefix: "นาย",
      firstname: "สมศักดิ์",
      lastname: "ใฝ่รู้",
      email: "61010007@kmitl.ac.th",
    },
    {
      id: 61010008,
      prefix: "นาย",
      firstname: "สมชาย",
      lastname: "ใจดี",
      email: "61010008@kmitl.ac.th",
    },
    {
      id: 61010009,
      prefix: "นาย",
      firstname: "สมพงศ์",
      lastname: "ชัยชนะ",
      email: "61010009@kmitl.ac.th",
    },
    {
      id: 61010010,
      prefix: "นางสาว",
      firstname: "สมสง่า",
      lastname: "ราศี",
      email: "61010010@kmitl.ac.th",
    },
    {
      id: 61010011,
      prefix: "นางสาว",
      firstname: "สมหญิง",
      lastname: "จริงใจ",
      email: "61010011@kmitl.ac.th",
    },
  ];

const groups = [
    {
        id: 1,
        group_name: 'Group 1',
        member: [61010001, 61010002, 61010003, 61010004],
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
        id: 2,
        group_name: 'Group 2',
        member: [61010005, 61010006, 61010007],
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
        id: 3,
        group_name: 'Group 3',
        member: [61010008, 61010009, 61010010],
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: 1

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
        id: 4,
        group_name: 'Group 4',
        member: [61010011, 61019999, 61019998],
        score: [
            {
                sub_activity_id: 1,
                max_score: 2,
                obtained_score: 1

            },
            {
                sub_activity_id: 2,
                max_score: 2,
                obtained_score: 1

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
    }
]

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


export const useActivityGradingGroup = () => {
    const [students, setStudents] = useState([])
    const [group,setGroup]=useState([])
    const [subActivity, setSubActivity] = useState()


    const handleSelectRubric = (point, groupId, sub_activity_id) => {
        let updatedScoreGroup = [...group]
        const groupIndex =updatedScoreGroup.findIndex(
            (item) => item.id === groupId
          );
        const scoreIndex =updatedScoreGroup[groupIndex].score.findIndex(
            (item) => item.sub_activity_id === sub_activity_id
          );
        updatedScoreGroup[groupIndex].score[scoreIndex].obtained_score = point
        setStudents(updatedScoreGroup)

    }
    useEffect(() => {
        setStudents(student)
    }, [])
    useEffect(() => {
        setSubActivity(mockSubActivity)
    }, [])
    useEffect(() => {
        let retriveGroup = groups
        const addedStatusGroup = []
        retriveGroup.forEach(g => {
            const allScore = g.score.map((e) => (e.obtained_score))
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
                id: g.id,
                group_name: g.group_name,
                member: g.member,
                score: g.score,
                score_status: status(),
            })
        })
        setGroup(addedStatusGroup)
    }, [])

    useEffect(() => {
        console.log(group);
    }, [group])


    return { students, group, subActivity, rubrics, handleSelectRubric }
}
