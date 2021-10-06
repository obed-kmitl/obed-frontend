import { useState, useEffect } from 'react'
import axios from 'axios';

export const useProfileFrom = (retrived,setRetrived,profileForm) => {
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
    function handleSaveProfile() {
        setIsProfileEditing(false);
    }

    return [isProfileEditing, setIsProfileEditing ,handleEdit, handleCancelProfile,handleSaveProfile]
}