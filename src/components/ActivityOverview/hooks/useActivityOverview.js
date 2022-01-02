import { useEffect, useState } from "react"
import { Form} from 'antd'
export const useActivityOverview = (activity) => {
    const [activityData, setActivityData] = useState()
    const [isEditing,setIsEditing] = useState(false)
    const [editDescValue,setEditDescValue] = useState()
    const [editCatagory,setEditCatagory] = useState()
    const [editGroupType,setEditGroupType] = useState()
    const form = Form.useForm()

    useEffect(() => {
        setActivityData(activity)
    }, [])

    function editOverview() {
        setEditDescValue(activityData.description)
        setEditCatagory(activityData.catagory_id)
        setEditGroupType(activityData.type)
        setIsEditing(true)
    }

    function saveOverview() {
        setIsEditing(false)
        const newData = activityData
        newData.description = editDescValue
        newData.catagory_id=editCatagory
        newData.type=editGroupType
        setActivityData(newData)
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



    return { activityData, isEditing, editOverview ,saveOverview,form,handleEditDescription,changeCatagory,changeType}
}
