/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Route } from "react-router-dom";

import useUser from "../../hooks/useUser";

const PrivateRoute = ({ children, path, roles, ...props }) => {
  const { getProfile } = useUser();

  useEffect(() => {
    getProfile(roles);
  }, []);

  return (
    <Route path={path} {...props}>
        {children}
    </Route>
  );
};

export { PrivateRoute };
