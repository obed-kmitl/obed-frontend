import { useState } from "react"
import { Form } from 'antd'
export const useActivityOverview = (activity, setActivity) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editDescValue, setEditDescValue] = useState()
    const [editCatagory, setEditCatagory] = useState()
    const [editGroupType, setEditGroupType] = useState()
    const [editTitle, setEditTitle] = useState()
    const [editScore, setEditScore] = useState()
    const form = Form.useForm()

    function editOverview() {
        setEditDescValue(activity.description)
        setEditCatagory(activity.catagory_id)
        setEditGroupType(activity.type)
        setEditTitle(activity.title)
        setEditScore(activity.total_score)
        setIsEditing(true)
    }

    function saveOverview() {
        setIsEditing(false)
        setActivity({
            id: activity.id,
            title: editTitle,
            description: editDescValue,
            catagory_id: editCatagory,
            type: editGroupType,
            total_score: editScore,
        })

    }
    function handleEditDescription(value) {
        setEditDescValue(value)
    }
    function changeCatagory(value) {
        setEditCatagory(value)
    }
    function changeType(value) {
        setEditGroupType(value)
    }
    function handleEditTitle(value) {
        setEditTitle(value)
    }
    function handleEditScore(value) {
        setEditScore(value)
    }

    return { isEditing, editOverview, saveOverview, form, handleEditDescription, changeCatagory, changeType,handleEditTitle,handleEditScore }
}
