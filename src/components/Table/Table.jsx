import styles from "./Table.module.scss";
import { Header } from "..";

export function Table({ children, type, col1, col2, col3, col4, col5, col6 }) {
  return (
    <div className={styles.container}>
      <div className={styles.tableHead}>
        {type === 1 ? (
          <div className={styles.type1}>
            <Header level={4} className={styles.col1}>
              {col1}
            </Header>
            <Header level={4} className={styles.col2}>
              {col2}
            </Header>
            <Header level={4} className={styles.col3}>
              {col3}
            </Header>
            <Header level={4} className={styles.col4}>
              {col4}
            </Header>
            <Header level={4} className={styles.col5}>
              {col5}
            </Header>
          </div>
        ) : type === 2 ? (
          <div className={styles.type2}>
            <Header level={4} className={styles.col1}>
              {col1}
            </Header>
            <Header level={4} className={styles.col2}>
              {col2}
            </Header>
            <Header level={4} className={styles.col3}>
              {col3}
            </Header>
            <Header level={4} className={styles.col4}>
              {col4}
            </Header>
            <Header level={4} className={styles.col5}>
              {col5}
            </Header>
            <Header level={4} className={styles.col6}>
              {col6}
            </Header>
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
}
