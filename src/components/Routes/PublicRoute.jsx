import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

const PublicRoute = ({ children, path, ...props }) => {
  const history = useHistory();

  function checkSession() {
    if (localStorage.getItem("atk")) {
      return history.push("/");
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <Route path={path} {...props}>
      {children}
    </Route>
  );
};

export { PublicRoute };
