import styles from "./Layout.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import { Layout } from "antd";

const { Content } = Layout;

function MyLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Layout>
        <Sidebar />
        <Layout>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
}
export { MyLayout as Layout };
