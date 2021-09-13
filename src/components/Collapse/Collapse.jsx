import { Collapse } from "antd";
import styles from "./Collapse.module.scss";

const { Panel } = Collapse;

function MyCollapse({ children, ghost, ...props }) {
  return (
    <div className={styles.container}>
      <Collapse
        className={styles.collapse}
        ghost={ghost}
        expandIconPosition="right"
        {...props}
      >
        {children}
      </Collapse>
    </div>
  );
}

export { MyCollapse as Collapse, Panel };
