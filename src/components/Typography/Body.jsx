
import propTypes from 'prop-types';
import css from 'classnames';
import styles from './Typography.module.scss';

function Body({ level, children, className }) {
  return <p className={css(styles.body, className)} level={level}>{children}</p>;
}

Body.propTypes = {
  level: propTypes.oneOf([1, 2, 3, 4]),
  children: propTypes.node.isRequired,
};

export {Body};