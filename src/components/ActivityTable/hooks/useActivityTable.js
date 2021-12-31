import { useState } from 'react'
import { Form } from 'antd'
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

const mockCLO = [
    {
        id: 1,
        number: "1.1",
        title: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 10 ทั้งคิดและไม่คิดเครื่องหมาย"
    },
    {
        id: 2,
        number: "1.2",
        title: "สามารถแปลงเลขระหว่างฐาน 2 และฐาน 16 ทั้งคิดและไม่คิดเครื่องหมาย"
    },
    {
        id: 3,
        number: "1.3",
        title: "สามารถแปลงเลขระหว่างฐาน 10 และฐาน 16 ทั้งคิดและไม่คิดเครื่องหมาย"
    },
    {
        id: 4,
        number: "2.1",
        title: "อธิบายความหมายของไฟฟ้าพื้นฐาน ได้แก่ ประจุ แรงดัน กระแส กำลัง ความต้านทาน กำลัง พลังงาน"
    },
    {
        id: 5,
        number: "2.2",
        title: "ทำโจทย์โดยใช้หลักการ KCL, KVL "
    },
    {
        id: 6,
        number: "3.1",
        title: "สามารถต่อวงจรบน Protoboard ได้อย่างถูกต้อง"
    }

]
export const useActivityTable = () => {
    const [cloList, setCloList] = useState(mockCLO)

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [data, setData] = useState(mockSubActivity);
    const [isNewAdded, setIsNewAdded] = useState(false);


    const edit = (record) => {
        console.log(record)
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
        if (isNewAdded) {
            setData(data.slice(0, data.length - 1))
            setIsNewAdded(false)
        }
    };

    const save = async (id) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);
            if (isNewAdded) {
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...row });
                    setData(newData);
                    setEditingKey('');
                } else {
                    newData.push(row);
                    setData(newData);
                    setEditingKey('');
                }
                setIsNewAdded(false);
            } else {
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...row });
                    setData(newData);
                    setEditingKey('');
                } else {
                    newData.push(row);
                    setData(newData);
                    setEditingKey('');
                }
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteSubActivity = (record) => {
        setData(data.filter(item => item.id !== record.id))
    }
    const add = () => {
        setIsNewAdded(true)
        const newData = {
            id: Date.now(), //random id for mock - wait id generate from backend to set value
            title: "",
            detail: "",
            clo: [],
            point: null
        };
        setData([...data,newData]);
        form.setFieldsValue({
            title: "",
            detail: "",
            clo: [],
            point: null
        })
        setEditingKey(newData.id);
      setTimeout(() => {
          var table = document.getElementById("activitytable").getElementsByClassName("ant-table-container")[0].getElementsByClassName("ant-table-body")[0]
          table.scrollTop = table.scrollHeight
        
        }, 50);
    }


    return { data, form, editingKey, cloList, edit, cancel, save, deleteSubActivity, isNewAdded, add }
}
