import { Input, Select } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styles from './Input.module.scss';

const { Option } = Select
const { Search, TextArea } = Input;
function MyInput({ placeholder, width, type, addonBefore, password , search ,onSearch, defaultValue }) {

    if (password) {
        return (
            <div className={styles.input}>
                <Input.Password
                    style={{ width: width ? width : "240px" }}
                    placeholder={placeholder}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    defaultValue={defaultValue}
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
                    defaultValue={defaultValue}
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
                defaultValue={defaultValue}
            ></Input>
        </div>
    )

}

export {MyInput as Input, TextArea}