import { useState } from 'react'
import { message,Form } from 'antd'


// const weighting = [
//     {
//         id: 1,
//         catagory: "Homework",
//         weight: 20
//     },
//     {
//         id: 2,
//         catagory: "Assignment",
//         weight: 20
//     },
//     {
//         id: 3,
//         catagory: "Examination",
//         weight: 50
//     },
//     {
//         id: 4,
//         catagory: "Attendance",
//         weight: 5
//     },
//     {
//         id: 5,
//         catagory: "Quiz",
//         weight: 5
//     },
// ]

export const useWeighting = () => {
    const [weightingList, setWeightingList] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editingList, setEditingList] = useState()
    const [form] = Form.useForm()

    function handleEditBtn() {
        setIsEditing(true)
        setEditingList([...weightingList])
    }

    function handleAddWeighting() {
        console.log(editingList)
        setEditingList([
            ...editingList,
            {
                id: Date.now(),
                catagory: undefined,
                weight: undefined
            }
        ])
    }
    function removeWeighting(id) {
        console.log(editingList, id)
        console.log(editingList.filter((e) => e.id !== id))
        setEditingList(editingList.filter((e) => e.id !== id))
    }
    function save(values) {
        console.log(values)
        let newWeighting = []
        for (const [key, value] of Object.entries(values)) {
            console.log(`${key}: ${value.id} : ${value.catagory} : ${value.weight}`);
            newWeighting = [...newWeighting, {
                id: value.id,
                catagory: value.catagory,
                weight: value.weight
            }]
        }
        let allWeight = 0
        newWeighting.map((e) => e.weight).forEach((w) => {
            allWeight = allWeight + w
        })
        console.log(allWeight)
        if(allWeight === 100) {
            setWeightingList(newWeighting)      
            message.success("Score Weighting changed succesfully")  
            setIsEditing(false);    
        }else{
            message.error("Total Weight must be 100%")  
        }
    }
    function cancel(){
        setIsEditing(false);
        form.resetFields()
    }

    return [form, weightingList, isEditing, editingList, handleEditBtn, handleAddWeighting, removeWeighting, save, cancel]


}
