import { useState, useEffect } from 'react'
import axios from 'axios';
import { Form ,message} from "antd"

export const usePassword = (accessToken) => {
    const [passwordForm] = Form.useForm()
    const [isChangePassword, setIsChangePassword] = useState(false)

    function handleCancelPassword() {
        passwordForm.resetFields()
        setIsChangePassword(false)
    }
    async function handleChangePassword(value) {
        console.log(value)
        const res = await axios.put('http://localhost:3001/obed/api/auth/updatePassword',
            {
                oldPassword: value.oldPassword,
                newPassword: value.newPassword

            },
            {
                headers: {
                    ["x-access-token"]: 'Bearer ' + accessToken
                }
            }
        ).catch(function (error) {
            if (error.response) {
                return error.response.data.error.code;

            }
        });
        console.log(res)
        if (res === "INVALID_PASSWORD") {
            message.error('Invalid Password!');
        } else if (res==="PASSWORD_SHOULD_DIFFERENT") {
            message.error('Your new password cannot be the same as your current password');
        } else {
            message.success('Your password has been changed successfully');
            passwordForm.resetFields()
            setIsChangePassword(false)
        }

    }



    return [passwordForm, isChangePassword, setIsChangePassword, handleCancelPassword, handleChangePassword]
}