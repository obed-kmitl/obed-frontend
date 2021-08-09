import { Tabs } from 'antd';
import cn from 'classname';
import styles from './Tabs.module.scss';

export default function MyTabs({
  children, onChange, defaultActiveKey,
}) {
  return (
    <div className={styles.tab}>
      <Tabs defaultActiveKey={defaultActiveKey} onChange={onChange}>
        {children}
      </Tabs>
    </div>
  );
}
