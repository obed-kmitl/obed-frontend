import { Select } from 'antd';
// import styles from './Select.module.scss';
const { Option } = Select;

function MySelect({defaultValue,mode,width,onChange,option,children}) {
    return (
        <Select mode={mode} defaultValue={defaultValue?defaultValue:option[0]} style={{ width: width?width:"240px" }} onChange={onChange}>
            {option?option.map((item,index)=>
                <Option key={index}value={item}>{item}</Option>
            ):children}
        </Select>
    )
}

export {MySelect as Select}
