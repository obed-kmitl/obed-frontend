import styles from "./Teacher.module.scss";
import { Header, Button, Input } from "../../components";
import { Divider } from "antd";

export const Teacher = () => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Header level={1}>Teacher</Header>
        <div>
          <Input search placeholder="Search" />
          <Button>Add</Button>
        </div>
      </div>
      <Divider />
    </div>
  );
};
