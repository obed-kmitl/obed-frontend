import { useState } from "react";
import { Form } from 'antd'
export const useSubStandard = (standard) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(standard);
    const [editingKey, setEditingKey] = useState("");
    const [isNewAdded, setIsNewAdded] = useState(false);
    // 
    const handleAddSubStd = () => {
        //console.log(data)
        setIsNewAdded(true)
        const newData = { subStandardNo: '', subStandardName: '' };
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

    const save = async (subStandardNo) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => subStandardNo === item.subStandardNo);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
            if (isNewAdded) {
                setIsNewAdded(false);
            }

        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    }

    const deleteSection = (record) => {
        setData(data.filter((standard) => standard.subStandardNo !== record.subStandardNo));
    }

    return [form, data, editingKey, isNewAdded, handleAddSubStd, save, cancel, edit, deleteSection]

}
