/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Route, useParams } from "react-router-dom";

import useUser from "../../hooks/useUser";
import SectionContext from "../../contexts/SectionContext";

const PrivateRoute = ({ children, path, roles, ...props }) => {
  const { getProfile } = useUser();

  useEffect(() => {
    getProfile(roles);
  }, []);

  return (
    <Route path={path} {...props}>
      <SectionContextManager>{children}</SectionContextManager>
    </Route>
  );
};

const SectionContextManager = ({ children }) => {
  const { setSection } = useContext(SectionContext);
  let { sectionId } = useParams();
  useEffect(() => {
    setSection(sectionId);
  }, []);

  return children;
};
export { PrivateRoute };
