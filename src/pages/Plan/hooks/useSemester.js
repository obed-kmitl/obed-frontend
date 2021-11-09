import { useState } from "react"

export const useSemester = () => {
    const [allCurruculum, setAllCurriculum] = useState([])

    const allSemester = [
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
    ]


    return [allSemester]
}
