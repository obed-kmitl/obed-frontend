import styles from "./Layout.module.scss";
import Navbar from "./Navbar/Navbar";

function MyLayout({ children }) {
  return (
      <div className={styles.layout}>
        <Navbar />
        <div className={styles.container}>{children}</div>
      </div>
  );
}
export { MyLayout as Layout };
