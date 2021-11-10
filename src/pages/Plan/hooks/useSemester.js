import { useState, useEffect } from "react"
import httpClient from "../../../utils/httpClient"

export const useSemester = () => {

    const [allCurriculum, setAllCurriculum] = useState()
    const [allSemester, setAllSemester] = useState()
    const [selectedCurriculum, setSelectedCurriculum] = useState();
    const [selectedSemester, setSelectedSemester] = useState()
    const [allCourse, setAllCourse] = useState()


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
    async function onChangeCurriculum(value) {
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
        return await httpClient
            .get(`/course/getAllByCurriculum/${value}`)
            .then((response) => {
                console.log(response.data.data)
                const receivedCourses = response?.data.data.map((course) => ({
                    key:course.course_id,
                    course_id: course.course_id,
                    curriculum_id: course.curriculum_id,
                    course_number: course.course_number,
                    course_name_en: course.course_name_en,
                    course_name_th: course.course_name_th,
                    section:[]
                }))
                setAllCourse(receivedCourses);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    function onChangeSemester(value) {
        setSelectedSemester(allSemester.filter((semester) => semester.semester_id === value)[0])
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
        allCourse,
        setAllCourse,
        selectedCurriculum,
        selectedSemester,
        onChangeCurriculum,
        onChangeSemester,


    ]
}
