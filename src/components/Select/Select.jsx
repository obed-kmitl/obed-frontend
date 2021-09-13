import { Select } from "antd";
// import styles from './Select.module.scss';
const { Option } = Select;

function MySelect({
  defaultValue,
  mode,
  option,
  children,
  showSearch,
  placeholder,
  width,
  ...props
}) {
  return (
    <Select
      showSearch={showSearch}
      mode={mode}
      defaultValue={defaultValue ? defaultValue : option ? option[0] : ""}
      style={{ width: width || "100%" }}
      placeholder={placeholder}
      {...props}
    >
      {option
        ? option.map((item, index) => (
            <Option key={item + index} value={item}>
              {item}
            </Option>
          ))
        : children}
    </Select>
  );
}

export { Option };
export { MySelect as Select };
