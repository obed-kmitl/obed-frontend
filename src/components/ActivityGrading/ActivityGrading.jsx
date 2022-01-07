import { GradingTable } from "./GradingTable"

const students = [
    {
        id: 61010001,
        prefix: "นางสาว",
        firstname: "กมลชนก",
        lastname: "ศรีไทย",
        email: "61010001@kmitl.ac.th",
        score: 76,
        score_status:"Finished"
    },
    {
        id: 61010002,
        prefix: "นาย",
        firstname: "ธนวัฒน์",
        lastname: "สมมุติ",
        email: "61010002@kmitl.ac.th",
        score: 86,
        score_status:"Finished"
    },
    {
        id: 61010003,
        prefix: "นาย",
        firstname: "สมปอง",
        lastname: "สุขสบาย",
        email: "61010003@kmitl.ac.th",
        score: 76,
        score_status:"Finished"
    },
    {
        id: 61010004,
        prefix: "นาย",
        firstname: "สมปราชญ์",
        lastname: "สดใส",
        email: "61010004@kmitl.ac.th",
        score: 45,
        score_status:"Not Finished"
    },
    {
        id: 61010005,
        prefix: "นาย",
        firstname: "สมหมาย",
        lastname: "สายไทย",
        email: "61010005@kmitl.ac.th",
        score: 25,
        score_status:"Not Finished"
    },
    {
        id: 61010006,
        prefix: "นาย",
        firstname: "สมหมาย",
        lastname: "รักไทย",
        email: "61010006@kmitl.ac.th",
        score: 90,
        score_status:"Finished"
    },
    {
        id: 61010007,
        prefix: "นาย",
        firstname: "สมศักดิ์",
        lastname: "ใฝ่รู้",
        email: "61010007@kmitl.ac.th",
        score: 69,
        score_status:"Finished"
    },
    {
        id: 61010008,
        prefix: "นาย",
        firstname: "สมชาย",
        lastname: "ใจดี",
        email: "61010008@kmitl.ac.th",
        score: null,
        score_status:"Not Submitted"
    },
    {
        id: 61010009,
        prefix: "นาย",
        firstname: "สมพงศ์",
        lastname: "ชัยชนะ",
        email: "61010009@kmitl.ac.th",
        score: null,
        score_status:"Not Submitted"
    },
    {
        id: 61010010,
        prefix: "นางสาว",
        firstname: "สมสง่า",
        lastname: "ราศี",
        email: "61010010@kmitl.ac.th",
        score: null,
        score_status:"Not Submitted"
    },
    {
        id: 61010011,
        prefix: "นางสาว",
        firstname: "สมหญิง",
        lastname: "จริงใจ",
        email: "61010011@kmitl.ac.th",
        score: null,
        score_status:"Not Submitted"
    },
];

export const ActivityGrading = ({activity}) => {
    return (
        <GradingTable students={students} activity={activity}/>
    )
}
