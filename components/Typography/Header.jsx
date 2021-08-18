import { createElement } from 'react';
import propTypes from 'prop-types';
import styles from './Typography.module.scss';

function Header({ level, children, className }) {
  return createElement(`h${level}`, { className: `${styles.header} ${className || ''}`, level }, children);
}

Header.propTypes = {
  level: propTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: propTypes.node.isRequired,
};

export default Header;
