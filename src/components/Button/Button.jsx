import { Button } from 'antd';
import css from 'classnames';
import styles from './Button.module.scss';

function MyBtn({children, type, danger, block, loading, carrot, className, ...props}) {
  return (
      <Button className={css(carrot ? styles.btnCarrot : styles.btnTurquoise,
      danger && styles.btnDanger, className)} type={type} danger={danger}
        block={block} loading={loading} {...props}>{children}
      </Button>
  );
}
export {MyBtn as Button};