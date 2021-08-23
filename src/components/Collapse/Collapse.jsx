import { Collapse } from 'antd';
import styles from './Collapse.module.scss';

const { Panel } = Collapse;

function MyCollapse({
    children,ghost
}) {
    return (
        <div className={styles.container}>
            <Collapse className={styles.collapse} ghost={ghost} expandIconPosition="right">{children}</Collapse>
        </div>
    )

}


export { MyCollapse as Collapse, Panel }
