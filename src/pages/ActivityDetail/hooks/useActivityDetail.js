import { useState, useEffect } from "react"
import httpClient from "../../../utils/httpClient"

export const useActivityDetail = (activityId, sectionId) => {
    const [activity, setActivity] = useState()
    const [category, setCategory] = useState()
    const [totalScore, setTotalScore] = useState()

    async function fetchActivity() {
        return await httpClient
            .get(`/activity/get/${activityId}`)
            .then((response) => {
                setActivity(response.data.data)
                return Promise.resolve(response.data.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function fetchCategory() {
        return await httpClient
            .get(`/category/getAllBySection/${sectionId}`)
            .then((response) => {
                setCategory(response.data.data)
                return Promise.resolve(response.data.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        fetchCategory();
        fetchActivity();
    }, []);

    useEffect(() => {
        let total = 0;
        activity?.subActivities?.forEach(element => {
            total += element.max_score
        });
        setTotalScore(total)
        console.log(total)

    }, [activity])

    return { activity, setActivity, category ,totalScore,setTotalScore}
}
