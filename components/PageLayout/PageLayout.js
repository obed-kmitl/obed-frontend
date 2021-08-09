import Head from 'next/head'
import styles from './PageLayout.module.scss'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import { Layout} from 'antd';

const { Footer, Sider, Content } = Layout;


const PageLayout = ({ children }) => {
  return (
    <>
      {/* <Head>
        <title>Layouts Example</title>
      </Head> */}
      {/* <Layout>
      <div className={styles.row}>
        <Sidebar />
        <div className={styles.main}>
          <Header />
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
      </Layout> */}
      <Layout className={styles.layout}>
        <Sidebar />
       
        <Layout>
          <Header />
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </>
  )
}

export default PageLayout
