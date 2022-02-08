import { useState, useEffect } from 'react'
import { Form } from 'antd'
import httpClient from "../../../utils/httpClient";
import { useParams } from "react-router-dom";

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
        clo_id: 1,
        order_number: "1.1",
        detail: "test",

    },
    {
        clo_id: 2,
        order_number: "1.2",
        detail: "test",

    },
    {
        clo_id: 3,
        order_number: "2.1",
        detail: "test 3",

    },
    {
        clo_id: 4,
        order_number: "2.2",
        detail: "test 4",

    },

]

export const useActivityTable = (subActivity) => {
    const [cloList, setCloList] = useState(mockCLO)
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [data, setData] = useState(mockSubActivity);
    const [isNewAdded, setIsNewAdded] = useState(false);
    let { sectionId } = useParams();

    const edit = (record) => {
        console.log(record)
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.sub_activity_id);
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
            const index = newData.findIndex((item) => id === item.sub_activity_id);
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
            clos: [],
            max_score: null
        };
        setData([...data, newData]);
        form.setFieldsValue({
            title: "",
            detail: "",
            clos: [],
            max_score: null
        })
        setEditingKey(newData.sub_activity_id);
        setTimeout(() => {
            var table = document.getElementById("activitytable").getElementsByClassName("ant-table-container")[0].getElementsByClassName("ant-table-body")[0]
            table.scrollTop = table.scrollHeight

        }, 50);
    }

    async function fetchClo() {
        return await httpClient
            .get(`/clo/getAllBySection/${sectionId}`)
            .then((res) => {
                console.log(res.data.data)
                setCloList(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchClo()
    }, []);

    useEffect(() => {
        let simplifySubActivty = subActivity
        simplifySubActivty?.forEach(subAct => {
            let simplifyclos = []
            subAct.clos.forEach(e => simplifyclos.push(e.clo_id))
            subAct.clos = simplifyclos
        });
        setData(simplifySubActivty)

    }, [subActivity]);




    return { data, form, editingKey, cloList, edit, cancel, save, deleteSubActivity, isNewAdded, add }
}
