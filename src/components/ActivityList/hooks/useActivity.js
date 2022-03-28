import { useEffect, useState } from "react"
import { Form } from 'antd';
import errorTranslate from "../../../utils/errorTranslate";
import httpClient from '../../../utils/httpClient';

import { useSectionContext } from "../../../contexts/SectionContext";
import { useActivityContext } from "../../../contexts/ActivityContext";

export const useActivity = () => {
    const [category, setcategory] = useState([])
    const [activity, setActivity] = useState([])
    // const [googleActivity, setGoogleActivity] = useState(google_activities)

    const [filteredActivity, setFilteredActivity] = useState()
    const [filterOption, setFilterOption] = useState(["All"]) // group

    const [form] = Form.useForm()
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [categoryModalVisible, setCategoryModalVisible] = useState(false)

    const [errMsg, setErrMsg] = useState()

    const  { section } = useSectionContext();
    const {setActivityId} = useActivityContext() 

    function handleAddActivity() {
        setAddModalVisible(true)
    }

    async function handleSubmit(value) {
        return await httpClient
            .post(`/activity/create`,
                {
                    section_id: parseInt(section),
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
        setCategoryModalVisible(false)
        form.resetFields()
        fetchActivity()
    }

    async function deleteActivity(id) {
        return await httpClient
            .delete(`/activity/remove/${id}`)
            .then(() => {
                setActivity(activity.filter((act) => act.activity_id !== id))
            }).catch(err => console.log(err))
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
            .get(`/activity/getAllBySection/${section}`)
            .then((response) => {
                function addedTotalScorePerCategoryData(data) {
                    data.forEach(category => {
                        let sum = 0
                        category.activities.forEach(atv => {
                            sum += atv.total_max_score
                        })
                        category.total_score = sum
                    })
                    return data
                }
                setcategory(addedTotalScorePerCategoryData(response.data.data))
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
    function handleEditCategory() {
        setCategoryModalVisible(true)
    }

    useEffect(() => {
        setFilteredActivity(activity);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity])

    useEffect(() => {
        if (section) {
            fetchActivity()
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section])

    return {
        category,
        filteredActivity,
        changeGroup,
        handleAddActivity,
        addModalVisible,
        handleSubmit,
        form,
        handleCancel,
        deleteActivity,
        handleEditCategory,
        categoryModalVisible,
        setActivityId
    }
}
