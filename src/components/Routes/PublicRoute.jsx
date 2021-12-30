/* eslint-disable react-hooks/exhaustive-deps */
import { Route } from "react-router-dom";

const PublicRoute = ({ children, path, ...props }) => {
  return (
    <Route path={path} {...props}>
      {children}
    </Route>
  );
};

export { PublicRoute };
