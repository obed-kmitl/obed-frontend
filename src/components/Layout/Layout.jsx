import styles from './Layout.module.scss'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import {Layout} from 'antd';

const { Footer, Sider, Content } = Layout;


function MyLayout ({ children }){
  return (
    <div className={styles.layout}>
      <Layout >
        <Sidebar />
        <Layout>
          <Header />
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  )
}
export {MyLayout as Layout}
