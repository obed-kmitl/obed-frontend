import { createContext, useContext, useState, useEffect } from "react";

const ActivityContext = createContext();
export const ACTIVITY_CONTEXT_KEY = "aidkey"

export const ActivityContextProvider = ({ children }) => {
    const [activityId, setActivityId] = useState();

    useEffect(() => {
        const aid = JSON.parse(localStorage.getItem(ACTIVITY_CONTEXT_KEY))
        setActivityId(aid)
    }, [])

    const handleSetActivity = (activity_id) => {
        setActivityId(activity_id)
        localStorage.setItem(ACTIVITY_CONTEXT_KEY, JSON.stringify(activity_id))
    }
    return <ActivityContext.Provider value={{ activityId, setActivityId: handleSetActivity }}>{children}</ActivityContext.Provider>
}

export const useActivityContext = () => {
    return useContext(ActivityContext)
}