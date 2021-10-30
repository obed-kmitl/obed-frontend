import { useState } from 'react'
import { message } from 'antd'

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
    const [editingList, setEditingList] = useState()

    function handleEditBtn() {
        setIsEditing(true)
        setEditingList([...weightingList])
    }

    function handleAddWeighting() {
        setEditingList([
            ...editingList,
            {
                id: 0,
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
    function save(value) {
        // const newWeighting = value.map((item)=>
        // ({
        //     id:1,
            
        // })
        // )
      
        console.log(Object.entries(value))
        
        

        // if(value.forEach((element) =>  {sum +=element.weight; return sum;})>100){
        //     message.error(sum)
        // }else{
        //     message.success(sum)
        // }
        // setIsEditing(false);
    }

    return [weightingList, isEditing, editingList, handleEditBtn, handleAddWeighting, removeWeighting, save]


}
