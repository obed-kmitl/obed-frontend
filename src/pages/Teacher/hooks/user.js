import { useState, useEffect } from 'react'
import axios from 'axios';

export const useGetAllUsers = () => {
    const [retrived, setRetrived] = useState();

    async function fetchAllUsers() {
        const result = await axios.get('http://localhost:3001/obed/api/user/getAll',
            {
                headers: {
                    ["x-access-token"]: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzMDA5MzMyLCJleHAiOjE2MzMwMTI5MzJ9.5_HULSOVR-umzzLKFxaBWJi2Vn8CfDeRP9v0omfcCCQ"
                }
            })
        const getThPrefix = {
           PROF_DR:"ศ.ดร.",
           PROF:"ศ.",
           ASSOC_PROF_DR:"รศ.ดร.",
           ASSOC_PROF:"รศ.",
           ASST_PROF_DR:"ผศ.ดร.",
           ASST_PROF:"ผศ.",
           DR:"ดร.",
           INSTRUCTOR:"อ."           
        }
        setRetrived(result.data.data.map((user) => ({
            id: user.user_id,
            prefix: getThPrefix[user.prefix],
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            // status: 1,
        })));
    }
    useEffect(() => {
        fetchAllUsers()
    }, [])

    return [retrived, setRetrived]
}
