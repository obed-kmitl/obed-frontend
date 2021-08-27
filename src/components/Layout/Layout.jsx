import styles from './Layout.module.scss'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import {Layout} from 'antd';

const { Content } = Layout;


function MyLayout ({ children }){

  const userName="Admin"

  return (
    <div className={styles.layout}>
      <Layout >
        <Sidebar />
        <Layout>
          <Header name={userName}/>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  )
}
export {MyLayout as Layout}
