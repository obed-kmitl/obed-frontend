import { useState, useEffect } from "react"
import httpClient from "../../../utils/httpClient"

import { useSectionContext } from "../../../contexts/SectionContext";
import { useActivityContext } from "../../../contexts/ActivityContext";

export const useActivityDetail = () => {
    const [activity, setActivity] = useState()
    const [category, setCategory] = useState()
    const [totalScore, setTotalScore] = useState()
    const { section } = useSectionContext();
    const { activityId } = useActivityContext();
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
            .get(`/category/getAllBySection/${section}`)
            .then((response) => {
                setCategory(response.data.data)
                return Promise.resolve(response.data.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        if (section) {
            fetchCategory();
            fetchActivity();
        }
        // eslint-disable-next-line
    }, [section]);

    useEffect(() => {
        let total = 0;
        activity?.subActivities?.forEach(element => {
            total += element.max_score
        });
        setTotalScore(total)
    }, [activity])

    return { activity, setActivity, category, totalScore, setTotalScore }
}
