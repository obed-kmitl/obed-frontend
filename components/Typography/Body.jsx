import propTypes from 'prop-types';
import styles from './Typography.module.scss';

function Body({ level, children }) {
  return <p className={styles.body} level={level}>{children}</p>;
}

Body.propTypes = {
  level: propTypes.oneOf([1, 2, 3, 4]),
  children: propTypes.node.isRequired,
};

export default Body;
