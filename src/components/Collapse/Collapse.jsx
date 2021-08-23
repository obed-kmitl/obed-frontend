import { Collapse } from 'antd';
import styles from './Collapse.module.scss';

const { Panel } = Collapse;

function MyCollapse({
    children,
}) {
    return (
        <div className={styles.container}>
            <Collapse className={styles.collapse} expandIconPosition="right">{children}</Collapse>
        </div>
    )

}


export { MyCollapse as Collapse, Panel }
