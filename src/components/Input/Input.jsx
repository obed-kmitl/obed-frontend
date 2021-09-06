import { Input, Select, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styles from "./Input.module.scss";

const { Option } = Select;
const { Search, TextArea } = Input;
function MyInput({
  placeholder,
  width,
  type,
  addonBefore,
  password,
  search,
  onSearch,
  defaultValue,
  ...props
}) {
  if (password) {
    return (
      <div className={styles.input}>
        <Input.Password
          style={{ width: width || "100%" }}
          placeholder={placeholder}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          defaultValue={defaultValue}
          {...props}
        />
      </div>
    );
  }
  if (search) {
    return (
      <div className={styles.input}>
        <Search
          style={{ width: width || "100%" }}
          placeholder={placeholder ? placeholder : "Please Input Search"}
          onSearch={onSearch}
          defaultValue={defaultValue}
          {...props}
        />
      </div>
    );
  }
  return (
    <div className={styles.input}>
      <Input
        style={{ width: width || "100%" }}
        placeholder={placeholder}
        type={type}
        addonBefore={
          addonBefore && (
            <Form.Item name="prefix" noStyle>
              <Select defaultValue={null} className="select-after">
                <Option value={null}>None</Option>
                {addonBefore.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )
        }
        defaultValue={defaultValue}
        {...props}
      ></Input>
    </div>
  );
}

export { MyInput as Input, TextArea };