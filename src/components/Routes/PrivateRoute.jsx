import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { Modal } from "antd";

import useUser from "../../hooks/useUser";

function PrivateRoute({ children, path, ...props }) {
  const history = useHistory();
  const { getProfile } = useUser();

  useEffect(() => {
    getProfile();
  }, []);

  function sessionExpired() {
    Modal.warning({
      title: "Session Expired",
      content: "Please login again.",
      okText: "Login",
      onOk() {
        Modal.destroyAll();
        localStorage.clear();
        history.push("/login?nextpage=" + window.location.pathname);
      },
      centered: true,
    });
  }

  function checkSession() {
    if (localStorage.getItem("sessionStatus") === "expired") {
      sessionExpired();
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
}

export { PrivateRoute };
