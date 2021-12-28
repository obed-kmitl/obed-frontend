import { useEffect, useState } from "react"

const Activity = {
    
        id: 1,
        title: "Activity-1: Number base conversion - base 2 to base 10",
        description: "แปลงเลขต่อไปนี้จากเลขฐาน 2 ไปยัง เลขฐาน 10 แบบไม่คิดเครื่องหมาย",
        catagory_id: 1,
        type: "Individual",
        sub_activity: "Single",
        total_score: 100,
    
}


export const useActivityDetail = () => {
    const [activity,setActivity] = useState(Activity)
    
    return {activity}
}
