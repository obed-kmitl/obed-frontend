import { useState,useEffect } from "react"
import httpClient from "../../../utils/httpClient"

export const useSemester = () => {
    
    const [allCurriculum, setAllCurriculum ] = useState()
    const [allSemester, setAllSemester] = useState()
    const [selectedCurriculum, setSelectedCurriculum] = useState();
    const [selectedSemester,setSelectedSemester] = useState()
    

    async function fetchAllCurriculum() {
        return await httpClient
        .get(`/curriculum/getAll`)
        .then((response) => {
            setAllCurriculum(response.data.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }
    function onChangeCurriculum(value) {
        //console.log(value)
        setSelectedCurriculum(value)
        setAllSemester([
            {
                semester_id: 1,
                year_number: 2021,
                semester_number: 1,
            },
            {
                semester_id: 2,
                year_number: 2021,
                semester_number: 2,
            },
            {
                semester_id: 3,
                year_number: 2021,
                semester_number: 3,
            },
            {
                semester_id: 4,
                year_number: 2022,
                semester_number: 1,
            },
            {
                semester_id: 5,
                year_number: 2022,
                semester_number: 2,
            },
            {
                semester_id: 6,
                year_number: 2022,
                semester_number: 3,
            }
        ])
    }
    function onChangeSemester(value) {
        setSelectedSemester(allSemester.filter((semester)=>semester.semester_id === value)[0])
    }


    useEffect(() => {
        fetchAllCurriculum();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //console.log(selectedSemester);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSemester]);

    return [
        allSemester,
        allCurriculum,
        selectedCurriculum,
        selectedSemester,
        onChangeCurriculum,
        onChangeSemester,
        
    ]
}
