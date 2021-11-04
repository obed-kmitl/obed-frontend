import { useState } from "react";
import { Form } from 'antd'
import httpClient from "../../../utils/httpClient";

export const useSubStandard = (standard, groupSubStdId, stdId) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(standard);
    const [editingKey, setEditingKey] = useState("");
    const [isNewAdded, setIsNewAdded] = useState(false);
    const handleAddSubStd = () => {
        //console.log(data)
        setIsNewAdded(true)
        const newData = {
            groupSubStdId: groupSubStdId,
            subStandardId: null,
            subStandardNo: '',
            subStandardName: ''
        };
        setData([...data, newData]);
        form.setFieldsValue({
            subStandardNo: "",
            subStandardName: "",
        });
        setEditingKey(newData.subStandardNo);
    };

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.subStandardNo);
    };

    const cancel = () => {
        setEditingKey("");
        if (isNewAdded) {
            setData(data.slice(0, data.length - 1))
            setIsNewAdded(false)
        }
    };

    async function save(subStandardNo,subStdId) {

        try {
            const row = await form.validateFields()
            const newData = [...data];
            const index = newData.findIndex((item) => subStandardNo === item.subStandardNo);
            if (isNewAdded) {
                return await httpClient.post('/standard/createSubStandard', {
                    standard_id: stdId,
                    group_sub_std_id: parseInt(groupSubStdId),
                    order_number: parseInt(row.subStandardNo),
                    title: row.subStandardName
                }).then((res) => {
                    const newSubStandard = {
                        groupSubStdId: res.data.data.group_sub_std_id,
                        subStandardId: res.data.data.sub_std_id,
                        subStandardNo: res.data.data.order_number,
                        subStandardName: res.data.data.title,
                    }
                    //console.log(newSubStandard)
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...newSubStandard });
                    setData(newData);
                    setEditingKey("");
                    setIsNewAdded(false);
                }).catch((err) => console.log(err))
            } else {
                return await httpClient.put(`/standard/updateSubStandard/${subStdId}`, {
                    order_number: parseInt(row.subStandardNo),
                    title: row.subStandardName
                }).then(() => {
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...row });
                    setData(newData);
                    setEditingKey("");
                })
            }
            // if (index > -1) {
            //     const item = newData[index];
            //     newData.splice(index, 1, { ...item, ...row });
            //     setData(newData);
            //     setEditingKey("");
            //     console.log("a")
            // } 
            // else {
            //     newData.push(row);
            //     setData(newData);
            //     setEditingKey("");
            //     console.log("b")
            // }

        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    }

    async function deleteSection (record) {
        return await httpClient
        .delete(`/standard/removeSubStandard/${record.subStandardId}`)
        .then(()=>{
            setData(data.filter((standard) => standard.subStandardNo !== record.subStandardNo));
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    return [form, data, editingKey, isNewAdded, handleAddSubStd, save, cancel, edit, deleteSection]

}
