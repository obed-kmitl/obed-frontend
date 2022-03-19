import { useState, useEffect } from 'react'
import { message, Form } from 'antd'
import errorTranslate from "../../../utils/errorTranslate";
import httpClient from '../../../utils/httpClient';

export const useWeighting = (sectionId) => {
    const [weightingList, setWeightingList] = useState()
    const [isAllEditing, setIsAllEditing] = useState(false)
    const [tempWeighting, setTempWeighting] = useState()
    const [editingKey, setEditingKey] = useState('');
    const [errMsg, setErrMsg] = useState()
    const [form] = Form.useForm()
    const [count, setCount] = useState(0)
    const [isAdding,setIsAdding] = useState(false)


    function handleEditBtn() {
        setIsAllEditing(true)
        setTempWeighting([...weightingList])
    }

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
        setIsAdding(true)
    }
    function removeWeighting(record) {
        setWeightingList(weightingList.filter(e => e !== record))

    }

    async function saveAll() {
        let allWeight = 0
        weightingList.map((e) => e.weight).forEach((w) => {
            allWeight = allWeight + w
        })
        if (allWeight === 100) {
            return await httpClient.post(`/category/save`, {
                section_id: parseInt(sectionId),
                categories: weightingList
            }).then((res) => {
                console.log(res.data)
               setWeightingList(res.data.data)
               message.success("Score Weighting changed succesfully",1)
               setIsAllEditing(false);

            }).catch((err) => console.log(err))

          
        } else {
            message.error("Total Weight must be 100%",1)
        }
    }
    function cancelAll() {
        setIsAllEditing(false);
        setWeightingList(tempWeighting);

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
        if(isAdding){
           setWeightingList([...weightingList].slice(0,weightingList.length-1))
           setIsAdding(false)
        }
    };

    const save = async (category_id) => {
        try {
            const row = await form.validateFields();
            const newData = [...weightingList];
            const index = newData.findIndex(item => category_id === item.category_id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setWeightingList(newData);
                setEditingKey('');
                if(isAdding){
                    setIsAdding(false)
                 }
            } else {
                newData.push(row);
                setWeightingList(newData);
                setEditingKey('');
                if(isAdding){
                    setIsAdding(false)
                 }
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
        isAllEditing,
        handleEditBtn,
        handleAddWeighting,
        removeWeighting,
        cancelAll,
        saveAll,
        edit,
        cancel,
        save,
        isEditing,
        editingKey,
    }


}
