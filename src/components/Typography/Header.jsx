import { createElement } from "react";
import propTypes from "prop-types";
import styles from "./Typography.module.scss";

function Header({ level, children, className, ...props }) {
  return createElement(
    `h${level}`,
    { className: `${styles.header} ${className || ""}`, level, ...props },
    children
  );
}

Header.propTypes = {
  level: propTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: propTypes.node.isRequired,
};

export { Header };
