import { notification } from "antd";

export default function openNotificationWithIcon(type, message, desc) {
  notification[type]({
    message: message,
    description: desc,
    duration: type === "error" ? 15 : 5,
  });
}
