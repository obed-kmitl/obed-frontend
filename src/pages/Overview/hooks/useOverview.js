import { useState, useEffect,useContext } from 'react'
import httpClient from "../../../utils/httpClient"
import { useSectionContext } from "../../../contexts/SectionContext";

export const useOverview = () => {
    const [courseData, setCourseData] = useState()
    const { section } = useSectionContext()

    async function fetchData() {
        return await httpClient
            .get(`/semester/getSection/${section}`)
            .then((response) => {
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
