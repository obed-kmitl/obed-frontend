import { Button } from 'antd';
import cn from 'classname';
import styles from './Button.module.scss';

export default function MyBtn({
  children, type, danger, disabled, block, loading, onClick, carrot = false,
}) {
  return (
    <div className={cn(carrot ? styles.btnCarrot : styles.btnTurquoise,
      danger && styles.btnDanger)}>
      <Button type={type} danger={danger} disabled={disabled}
        block={block} loading={loading} onClick={onClick}>{children}</Button>
    </div>
  );
}
