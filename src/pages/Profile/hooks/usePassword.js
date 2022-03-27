import { Form ,message} from "antd"
import httpClient from '../../../utils/httpClient';

export const usePassword = () => {
    const [passwordForm] = Form.useForm()
    // const [isChangePassword, setIsChangePassword] = useState(false)

    // function handleCancelPassword() {
    //     passwordForm.resetFields()
    //     setIsChangePassword(false)
    // }
    async function handleChangePassword(value) {
        const res = await httpClient.put('http://localhost:3001/obed/api/auth/updatePassword',
            {
                oldPassword: value.oldPassword,
                newPassword: value.newPassword

            }
        ).catch(function (error) {
            if (error.response) {
                return error.response.data.error.code;

            }
        });
        if (res === "INVALID_PASSWORD") {
            message.error('Invalid Current Password!');
        } else if (res==="PASSWORD_SHOULD_DIFFERENT") {
            message.error('Your new password cannot be the same as your current password');
        } else {
            message.success('Your password has been changed successfully');
            passwordForm.resetFields()
        }

    }

    return [passwordForm, handleChangePassword]
}