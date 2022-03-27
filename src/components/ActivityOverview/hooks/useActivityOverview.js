import { useState } from "react"
import { Form } from 'antd'
import httpClient from "../../../utils/httpClient"

export const useActivityOverview = (activity, setActivity, activityId) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editDescValue, setEditDescValue] = useState()
    const [editcategory, setEditcategory] = useState()
    const [editGroupType, setEditGroupType] = useState()
    const [editTitle, setEditTitle] = useState()
    //const [editScore, setEditScore] = useState()
    const form = Form.useForm()

    function editOverview() {
        setEditDescValue(activity.detail)
        setEditcategory(activity.category_id)
        setEditGroupType(activity.type)
        setEditTitle(activity.title)
        // setEditScore(activity.total_score)
        setIsEditing(true)
    }

    async function saveOverview() {
        return await httpClient
            .put(`/activity/update/${activityId}`,
                {
                    title: editTitle,
                    detail: editDescValue,
                    category_id: editcategory,
                    type: editGroupType,
                }
            )
            .then((response) => {
                setIsEditing(false)
                setActivity({...response.data.data,subActivities: activity.subActivities})
                
            })
            .catch((error) => {
                console.log(error)
            });
    }
    function handleEditDescription(value) {
        setEditDescValue(value)
    }
    function changecategory(value) {
        setEditcategory(value)
    }
    function changeType(value) {
        setEditGroupType(value)
    }
    function handleEditTitle(value) {
        setEditTitle(value)
    }

    return { isEditing, editOverview, saveOverview, form, handleEditDescription, changecategory, changeType, handleEditTitle }
}
