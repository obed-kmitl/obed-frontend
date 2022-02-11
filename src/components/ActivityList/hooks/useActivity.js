import { useEffect, useState } from "react"
import { Form } from 'antd';
import errorTranslate from "../../../utils/errorTranslate";
import httpClient from '../../../utils/httpClient';
import { useParams } from "react-router-dom";

const categories = [
    {
        id: 1,
        category: "Homework",
        weight: 20
    },
    {
        id: 2,
        category: "Assignment",
        weight: 20
    },
    {
        id: 3,
        category: "Examination",
        weight: 50
    },
    {
        id: 4,
        category: "Attendance",
        weight: 5
    },
    {
        id: 5,
        category: "Quiz",
        weight: 5
    },
]

const activities = [
    {
        id: 1,
        title: "Homework #1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        category_id: 1,
        type: "Individual",
        sub_activity: "Single",
        total_score: 10,
    },
    {
        id: 2,
        title: "Homework #2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        category_id: 1,
        type: "Group",
        sub_activity: "Multiple",
        total_score: 10,
    },
    {
        id: 3,
        title: "Assignment #1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        category_id: 2,
        type: "Group",
        sub_activity: "Single",
        total_score: 20,
    },
    {
        id: 4,
        title: "Quiz #1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        category_id: 5,
        type: "Individual",
        sub_activity: "Multiple",
        total_score: 10,
    },
    {
        id: 5,
        title: "Final Exam",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        category_id: 3,
        type: "Individual",
        sub_activity: "Multiple",
        total_score: 40,
    },
    {
        id: 6,
        title: "Adttendance",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        category_id: 4,
        type: "Individual",
        sub_activity: "Single",
        total_score: 100,
    }
]

const archrive_activities = [
    {
        id: 1,
        title: "Homework #4",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        category_id: 1,
        type: "Individual",
        sub_activity: "Single",
        total_score: 10,
    },
    {
        id: 2,
        title: "Homework #5",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        category_id: 1,
        type: "Individual",
        sub_activity: "Multiple",
        total_score: 10,
    },
    {
        id: 3,
        title: "Assignment #7",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        category_id: 2,
        type: "Group",
        sub_activity: "Single",
        total_score: 20,
    },

]

const google_activities = [
    {
        id: 1,
        title: "Homework #10",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",

    },
    {
        id: 2,
        title: "Homework #11",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",

    },
    {
        id: 3,
        title: "Assignment #12",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
    },

]

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity])

    useEffect(() => {
        fetchActivity()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        category, filteredActivity, changeGroup,
        handleAddActivity, addModalVisible, handleSubmit, form, handleCancel,deleteActivity
    }
}
