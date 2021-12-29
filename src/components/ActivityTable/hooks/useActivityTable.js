import { useState } from 'react'

const mockSubActivity = [
    {
        id: 1,
        title: "ข้อ 1",
        detail: "จงแปลงเลขฐาน 2 จาก 1010 1111 0010 เป็นเลขฐาน 10 และเลขฐาน 16",
        clo: [1,2],
        point: 2
    },
    {
        id: 2,
        title: "ข้อ 2",
        detail: "จงแปลงเลขฐาน 2 จาก 1000 1101 0110 เป็นเลขฐาน 10 และเลขฐาน 16",
        clo: [1,2],
        point: 2
    },
    {
        id: 3,
        title: "ข้อ 3",
        detail: "จงแปลงเลขฐาน 10 จาก 178 เป็นเลขฐาน 2 และเลขฐาน 16",
        clo: [1,3],
        point: 2
    },
    {
        id: 4,
        title: "ข้อ 4",
        detail: "จงแปลงเลขฐาน 16 จาก 57FA เป็นเลขฐาน 10 และเลขฐาน 2",
        clo: [2,3],
        point: 2
    }
]

const mockCLO = [
    {
        id: 1,
        number:"1.1",
        title: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 10 ทั้งคิดและไม่คิดเครื่องหมาย"
    },
    {
        id: 2,
        number:"1.2",
        title: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 16 ทั้งคิดและไม่คิดเครื่องหมาย"
    },
    {
        id: 3,
        number:"1.3",
        title: "สามารถแปลงเลขระหว่างฐาน 10 และฐาน 16 ทั้งคิดและไม่คิดเครื่องหมาย"
    },
    {
        id: 4,
        number:"2.1",
        title: "อธิบายความหมายของไฟฟ้าพื้นฐาน ได้แก่ ประจุ แรงดัน กระแส กำลัง ความต้านทาน กำลัง พลังงาน"
    },
    {
        id: 5,
        number:"2.2",
        title: "ทำโจทย์โดยใช้หลักการ KCL, KVL "
    },
    {
        id: 6,
        number:"3.1",
        title: "สามารถต่อวงจรบน Protoboard ได้อย่างถูกต้อง"
    }

]
export const useActivityTable = () => {
    const [subActivity, setSubActivity] = useState(mockSubActivity)
    const [cloList, setCloList] = useState(mockCLO)

    return { subActivity,cloList }
}
