import { useEffect, useState } from "react"
import { Form } from 'antd';
import errorTranslate from "../../../utils/errorTranslate";
import httpClient from '../../../utils/httpClient';
import { useParams } from "react-router-dom";

export const useActivity = () => {
    const [category, setcategory] = useState([])
    const [activity, setActivity] = useState([])
    // const [googleActivity, setGoogleActivity] = useState(google_activities)

    const [filteredActivity, setFilteredActivity] = useState()
    const [filterOption, setFilterOption] = useState(["All"]) // group

    //add Activity/////////////////// 
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [form] = Form.useForm()
    const [errMsg, setErrMsg] = useState()

    let { sectionId } = useParams();

    function handleAddActivity() {
        setAddModalVisible(true)
    }

    async function handleSubmit(value) {
        return await httpClient
            .post(`/activity/create`,
                {
                    section_id: parseInt(sectionId),
                    category_id: value.category_id,
                    title: value.title,
                    detail: value.description,
                    type: value.group.toUpperCase()
                })
            .then((response) => {
                setActivity([...activity, response.data.data])
                form.resetFields()
                setAddModalVisible(false)
            })
            .catch((error) => {
                errorTranslate(error, setErrMsg);
                return Promise.reject(errMsg);
            });

    }
    function handleCancel() {
        setAddModalVisible(false)
        form.resetFields()
    }

    async function deleteActivity(id) {
        return await httpClient
            .delete(`/activity/remove/${id}`)
            .then((res)=>{
                console.log(res)
            }).catch(err=>console.log(err))
    }
    /////////////////////////////////////

    function changeGroup(value) {
            let newFilter = [...filterOption]
            newFilter[0] = value
            setFilterOption(newFilter)
    }

    useEffect(() => {
        setFilteredActivity(
            activity.filter((act) => {
                if (filterOption[0] === "All") {
                    return act
                } else {
                    return act.type === filterOption[0].toUpperCase()
                }
            })
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterOption])

    async function fetchActivity() {
        return await httpClient
            .get(`/activity/getAllBySection/${sectionId}`)
            .then((response) => {
                console.log(response.data.data)
                setcategory(response.data.data)
                const retrivedData = response.data.data
                const activity = []
                retrivedData.forEach(element => {
                    element.activities.forEach(act => {
                        activity.push(act)
                    })

                });
                setActivity(activity)
                return Promise.resolve(response.data.data);
            })
            .catch((error) => {
                errorTranslate(error, setErrMsg);
                return Promise.reject(errMsg);
            });
    }

    useEffect(() => {
        setFilteredActivity(activity);
        console.log(activity)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity])

    useEffect(() => {
        
        console.log(category)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    useEffect(() => {
        console.log(filteredActivity)
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredActivity])
    useEffect(() => {
        fetchActivity()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        category, filteredActivity, changeGroup,
        handleAddActivity, addModalVisible, handleSubmit, form, handleCancel,deleteActivity
    }
}
