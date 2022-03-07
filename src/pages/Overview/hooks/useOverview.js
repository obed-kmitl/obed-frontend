import { useState, useEffect } from 'react'
import httpClient from "../../../utils/httpClient"
import { useParams } from 'react-router-dom'

export const useOverview = () => {
    const [courseData, setCourseData] = useState()
    const {sectionId} = useParams()

    async function fetchData() {
        return await httpClient
            .get(`/semester/getSection/${sectionId}`)
            .then((response) => {
                console.log(response.data.data)
                setCourseData(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { courseData }
}
