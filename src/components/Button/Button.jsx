import { Button } from 'antd';
import css from 'classnames';
import styles from './Button.module.scss';

function MyBtn({children, type, danger, disabled, block, loading, onClick, carrot, title, className}) {
  return (
      <Button className={css(carrot ? styles.btnCarrot : styles.btnTurquoise,
      danger && styles.btnDanger, className)} type={type} danger={danger} disabled={disabled}
        block={block} loading={loading} onClick={onClick} title={title}>{children}
      </Button>
  );
}
export {MyBtn as Button};