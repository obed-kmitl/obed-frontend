import styles from "./Layout.module.scss";
import Navbar from "./Navbar/Navbar";

import { Layout } from "antd";

const { Content } = Layout;

function MyLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Layout>
        <Navbar />
        <Layout>
          <Content className={styles.container}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
}
export { MyLayout as Layout };
