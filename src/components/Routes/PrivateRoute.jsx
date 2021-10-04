import { useEffect } from "react";
import { Route } from "react-router-dom";
import useUser from "../../hooks/useUser";

function PrivateRoute({ children, path, ...props }) {
  const { getProfile } = useUser();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <Route path={path} {...props}>
      {children}
    </Route>
  );
}

export { PrivateRoute };
