import { useState } from "react"

const Activity = {
    
        id: 1,
        title: "Activity-1: Number base conversion - base 2 to base 10",
        description: "แปลงเลขต่อไปนี้จากเลขฐาน 2 ไปยัง เลขฐาน 10 แบบไม่คิดเครื่องหมาย Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam accusantium a non. Doloribus libero minus optio fugit perferendis natus voluptate, quaerat ut nemo laboriosam delectus ea nisi, saepe fuga enim! Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam accusantium a non. Doloribus libero minus optio fugit perferendis natus voluptate, quaerat ut nemo laboriosam delectus ea nisi, saepe fuga enim!"  ,
        catagory_id: 1,
        type: "Group",
        total_score: 100,
    
}

const catagories = [
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


export const useActivityDetail = () => {
    const [activity,setActivity] = useState(Activity)
    const [catagory,setCatagory] = useState(catagories)
    

    return {activity,setActivity,catagory}
}
