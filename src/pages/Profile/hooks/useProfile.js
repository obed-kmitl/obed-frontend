import { useState ,useContext} from 'react'
import { Form } from "antd"
import UserContext from '../../../contexts/UserContext';
import httpClient from '../../../utils/httpClient';

export const useProfileFrom = () => {
    const [profileForm] = Form.useForm()
    const { user } = useContext(UserContext);
    const [isProfileEditing, setIsProfileEditing] = useState(false);
    const [record, setRecord] = useState();

    profileForm.setFieldsValue(user);

    function handleEdit() {
        setIsProfileEditing(true);
        setRecord(user)
    }
    function handleCancelProfile() {
        setIsProfileEditing(false);
        profileForm.setFieldsValue(record);
    }
    async function handleSaveProfile(value) {
        setIsProfileEditing(false);
        const res = await httpClient.put('user/updateProfile',value).catch((error) => {
            console.log(error);
          });
        profileForm.setFieldsValue(res.data.data)
    }

    

    return [profileForm,isProfileEditing, handleEdit, handleCancelProfile, handleSaveProfile]
}