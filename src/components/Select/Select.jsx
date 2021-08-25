import { Select } from 'antd';
// import styles from './Select.module.scss';
const { Option } = Select;

function MySelect({defaultValue,mode,width,height,onChange,option,children,showSearch,placeholder,bordered,disabled}) {
    return (
        <Select showSearch={showSearch} mode={mode} 
        defaultValue={defaultValue?defaultValue:(option? option[0] : "")} 
        style={{ width: width || "240px" }} onChange={onChange} disabled={disabled}
        placeholder={placeholder} bordered={bordered} height={height}>
            {option?option.map((item,index)=>
                <Option key={index}value={item}>{item}</Option>
            ):children}
        </Select>
    )
}

export {Option}
export {MySelect as Select}
