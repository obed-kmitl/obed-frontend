import { Input, Select } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styles from './Input.module.scss';

const { Option } = Select
const { Search } = Input;
function MyInput({ placeholder, width, type, addonBefore, password , search ,onSearch }) {

    if (password) {
        return (
            <div className={styles.input}>
                <Input.Password
                    style={{ width: width ? width : "240px" }}
                    placeholder={placeholder}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </div>
        )
    }
    if (search) {
        return (
            <div className={styles.input}>
                <Search
                    style={{ width: width ? width : "240px" }}
                    placeholder={placeholder?placeholder:"Please Input Search"}
                    onSearch={onSearch}
                />
            </div>
        )

    }
    return (
        <div className={styles.input}>
            <Input
                style={{ width: width ? width : "240px" }}
                placeholder={placeholder}
                type={type}
                addonBefore={addonBefore?
                    <Select defaultValue={addonBefore[0]} className="select-after">
                        {addonBefore.map((item,index) =>
                            <Option key={index} value={item}> {item}</Option>
                        )}
                    </Select>
                    :null
                }
             
            ></Input>
        </div>
    )

}

export {MyInput as Input}