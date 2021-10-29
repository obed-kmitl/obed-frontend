import {useState} from 'react'

const weighting = [
    {
        id: 1,
        catagory: "Homework",
        weight: 20
    },
    {
        id: 2,
        catagory: "Assignment",
        weight: 20
    },
    {
        id: 3,
        catagory: "Examination",
        weight: 50
    },
    {
        id: 4,
        catagory: "Attendance",
        weight: 5
    },
    {
        id: 5,
        catagory: "Quiz",
        weight: 5
    },


]

export const useWeighting = () => {
    const [weightingList, setWeightingList] = useState(weighting)
    const [isEditing, setIsEditing] = useState(false)

    function handleEditBtn(){
        setIsEditing(true)
    }

    function handleAddWeighting(){
        
    }

    return [weightingList, isEditing, handleEditBtn, handleAddWeighting]


}
