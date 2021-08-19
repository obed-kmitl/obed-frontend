import { Select } from 'antd';
const { Option } = Select;
import styles from './Select.module.scss';


export default function MySelect({defaultValue,mode,width,onChange,option}) {
    return (
        <Select mode={mode} defaultValue={defaultValue?defaultValue:option[0]} style={{ width: width?width:"240px" }} onChange={onChange}>
            {option.map((item,index)=>
                <Option key={index}value={item}>{item}</Option>
            )}
        </Select>
    )
}