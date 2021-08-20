import styles from './Layout.module.scss'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import {Layout} from 'antd';

const { Footer, Sider, Content } = Layout;


function MyLayout ({ children }){
  return (
    <>
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
export {MyLayout as Layout}
