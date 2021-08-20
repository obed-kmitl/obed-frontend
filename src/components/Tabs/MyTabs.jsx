import { Tabs } from 'antd';
import styles from './Tabs.module.scss';

function MyTabs({
  children, onChange, defaultActiveKey,
}) {
  return (
    <div className={styles.tab}>
      <Tabs defaultActiveKey={defaultActiveKey} onChange={onChange}>
        {children}
      </Tabs>
    </div>
  )
}

const { TabPane } = Tabs

export {MyTabs as Tabs, TabPane}
