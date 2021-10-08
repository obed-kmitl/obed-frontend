import { useState, useEffect } from 'react'
import axios from 'axios';
import {Form} from "antd"

export const useGetProfile = (accessToken) => {
    const [retrived, setRetrived] = useState();
    const [profileForm]=Form.useForm()

    async function fetchProfile() {
        const result = await axios.get('http://localhost:3001/obed/api/user/getProfile',
            {
                headers: {
                    ["x-access-token"]: 'Bearer ' + accessToken
                }
            })
        setRetrived(result.data.data);
        profileForm.setFieldsValue(result.data.data);
        console.log(result.data.data)
    }
    useEffect(() => {
        fetchProfile()
    }, [])

    return[retrived, setRetrived ,profileForm]
}
