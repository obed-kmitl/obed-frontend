import { Button } from 'antd';
import css from 'classnames';
import style from './Button.module.scss';

export default function MyBtn({
  children, type, danger, disabled, block, loading, onClick, carrot, title, className
}) {
  return (
      <Button className={css(carrot ? style.btnCarrot : style.btnTurquoise,
      danger && style.btnDanger, className)} type={type} danger={danger} disabled={disabled}
        block={block} loading={loading} onClick={onClick} title={title}>{children}
      </Button>
  );
}