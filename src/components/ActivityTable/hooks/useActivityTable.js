import { useState, useEffect } from 'react'
import { Form } from 'antd'
import httpClient from "../../../utils/httpClient";
import { useSectionContext } from '../../../contexts/SectionContext';
import { useActivityContext } from '../../../contexts/ActivityContext';

export const useActivityTable = (subActivity) => {
    const [cloList, setCloList] = useState([])
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [data, setData] = useState([]);
    const [isNewAdded, setIsNewAdded] = useState(false);
    const {section} = useSectionContext()
    const {activityId} = useActivityContext()

    const edit = (record) => {
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
            if (isNewAdded) { //add
                return await httpClient
                    .post(`/activity/createSubActivity`,
                        {
                            activity_id: parseInt(activityId),
                            detail: row.detail,
                            max_score: parseInt(row.max_score),
                            clos: row.clos
                        }
                    )
                    .then((response) => {
                        let allclos = []
                        response.data.data.clos.forEach(e => allclos.push(e.clo_id))
                        const newSubActivity = {
                            activity_id: response.data.data.activityId,
                            clos: allclos,
                            detail: response.data.data.detail,
                            max_score: response.data.data.max_score,
                            sub_activity_id: response.data.data.sub_activity_id,
                        }
                        if (index > -1) {
                            newData.splice(index, 1, newSubActivity );
                            setData(newData);
                            setEditingKey('');
                        } else {
                            newData.push(newSubActivity);
                            setData(newData);
                            setEditingKey('');
                        }
                        setIsNewAdded(false);
                        return Promise.resolve(response.data.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else { //edit
                return await httpClient
                .put(`activity/updateSubActivity/${id}`,
                    {
                        detail: row.detail,
                        max_score: parseInt(row.max_score),
                        clos: row.clos
                    }
                )
                .then((response) => {
                    let allclos = []
                    response.data.data.clos.forEach(e => allclos.push(e.clo_id))
                    const newSubActivity = {
                        activity_id: response.data.data.activityId,
                        clos: allclos,
                        detail: response.data.data.detail,
                        max_score: response.data.data.max_score,
                        sub_activity_id: response.data.data.sub_activity_id,
                    }
                    if (index > -1) {
                        newData.splice(index, 1, newSubActivity );
                        setData(newData);
                        setEditingKey('');
                    } else {
                        newData.push(newSubActivity);
                        setData(newData);
                        setEditingKey('');
                    }
                    setIsNewAdded(false);
                    return Promise.resolve(response.data.data);
                })
                .catch((error) => {
                    console.log(error)
                });
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteSubActivity = async (id) => {
        return await httpClient
        .delete(`/activity/removeSubActivity/${id}`)
        .then((response) => {
            setData(data.filter(item => item.sub_activity_id !== id))
            return Promise.resolve(response.data.data);
        })
        .catch((error) => {
            console.log(error)
        });
      
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
            .get(`/clo/getAllBySection/${section}`)
            .then((res) => {
                setCloList(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if(section){
            fetchClo()
        }
        // eslint-disable-next-line
    }, [section]);

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
