import { useState, useEffect } from 'react'
import { message, Form } from 'antd'
import errorTranslate from "../../../utils/errorTranslate";
import httpClient from '../../../utils/httpClient';

export const useCategory = (sectionId) => {
    const [weightingList, setWeightingList] = useState()
    const [editingKey, setEditingKey] = useState('');

    const [errMsg, setErrMsg] = useState()
    const [form] = Form.useForm()

    const [count, setCount] = useState(0)

    function handleAddWeighting() {
        setWeightingList([...weightingList, {
            category_id: "NEW_" + count,
            section_id: sectionId,
            title: undefined,
            weight: undefined
        }])
        setEditingKey("NEW_" + count);
        form.resetFields();
        setCount(count + 1)
    }
    async function removeWeighting(record) {

        return await httpClient.post(`/category/save`, {
            section_id: parseInt(sectionId),
            categories: weightingList.filter(e => e !== record)
        }).then((res) => {
            console.log(res.data)
            setWeightingList(res.data.data)
            setEditingKey('');
        }).catch((err) => console.log(err))
    }

    const isEditing = (record) => record.category_id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.category_id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (category_id) => {
        try {
            const row = await form.validateFields();
            const newData = [...weightingList];
            const index = newData.findIndex(item => category_id === item.category_id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                return await httpClient.post(`/category/save`, {
                    section_id: parseInt(sectionId),
                    categories: newData
                }).then((res) => {
                    console.log(res.data)
                    setWeightingList(res.data.data)
                    setEditingKey('');
                }).catch((err) => console.log(err))
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    async function fetchCategory() {
        return await httpClient
            .get(`/category/getAllBySection/${sectionId}`)
            .then((response) => {
                setWeightingList(response.data.data)
                return Promise.resolve(response.data.data);
            })
            .catch((error) => {
                errorTranslate(error, setErrMsg);
                return Promise.reject(errMsg);
            });
    }

    useEffect(() => {
        fetchCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        form,
        weightingList,
        handleAddWeighting,
        removeWeighting,
        edit,
        cancel,
        save,
        isEditing,
        editingKey,
    }


}
