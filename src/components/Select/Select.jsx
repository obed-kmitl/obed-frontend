import { Select } from 'antd';
// import styles from './Select.module.scss';
const { Option } = Select;

function MySelect({defaultValue,mode,onChange,option,children,showSearch,bordered,width,...props}) {
    return (
        <Select showSearch={showSearch} mode={mode} 
        defaultValue={defaultValue?defaultValue:(option? option[0] : "")} 
        style={{ width: width || "100%" }} onChange={onChange} {...props}
        bordered={bordered} >
            {option?option.map((item,index)=>
                <Option key={item+index} value={item}>{item}</Option>
            ):children}
        </Select>
    )
}

export {Option}
export {MySelect as Select}
