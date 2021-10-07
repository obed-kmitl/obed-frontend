import { useState, useEffect } from 'react'
import axios from 'axios';

export const useProfileFrom = (retrived, profileForm, accessToken) => {
    const [isProfileEditing, setIsProfileEditing] = useState(false);
    const [record, setRecord] = useState()

    function handleEdit() {
        setIsProfileEditing(true);
        setRecord(retrived)
    }
    function handleCancelProfile() {
        setIsProfileEditing(false);
        profileForm.setFieldsValue(record);
    }
    async function handleSaveProfile(value) {
        setIsProfileEditing(false);
        console.log(value)
        const res = await axios.put('http://localhost:3001/obed/api/user/updateProfile',
            value,
            {
                headers: {
                    ["x-access-token"]: 'Bearer ' + accessToken
                }
            }
        )
        console.log(res)
    }

    return [isProfileEditing, handleEdit, handleCancelProfile, handleSaveProfile]
}