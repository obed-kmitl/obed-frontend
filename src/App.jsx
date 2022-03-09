import { useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import {
  Curriculum,
  Home,
  Sandbox,
  Profile,
  Teacher,
  Plan,
  Login,
  Student,
  NotFound,
  Overview,
  Planning,
  Activity,
  LearningOutcome,
  TeacherReport,
  ActivityDetail,
  AdminReport,
  AdminGraph,
} from "./pages";
import { PrivateRoute, PublicRoute } from "./components";
import { Layout } from "./components/Layout/Layout";
import "./styles/global.module.scss";

import UserContext from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router basename="/obed">
        <Switch>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PublicRoute path="/admin">
            <Login isAdmin={true} />
          </PublicRoute>
          <Layout>
            <Switch>
              <PrivateRoute roles={["ADMIN"]} path="/teacher">
                <Teacher />
              </PrivateRoute>
              <PrivateRoute roles={["ADMIN"]} path="/curriculum">
                <Curriculum />
              </PrivateRoute>
              <PrivateRoute roles={["ADMIN"]} path="/sandbox">
                <Sandbox />
              </PrivateRoute>
              <PrivateRoute roles={["ADMIN", "TEACHER"]} path="/profile">
                <Profile />
              </PrivateRoute>
              <PrivateRoute roles={["ADMIN"]} path="/plan">
                <Plan />
              </PrivateRoute>
              <PrivateRoute roles={["ADMIN"]} path="/summary/subject">
                <AdminGraph page="subject" />
              </PrivateRoute>
              <PrivateRoute roles={["ADMIN"]} path="/summary/cohort">
                <AdminGraph page="cohort" />
              </PrivateRoute>
              <PrivateRoute roles={["ADMIN"]} path="/summary/student">
                <AdminGraph page="student" />
              </PrivateRoute>
              <PrivateRoute roles={["ADMIN"]} exact path="/summary">
                <AdminReport />
              </PrivateRoute>
              <PrivateRoute roles={["TEACHER"]} path="/:sectionId/overview">
                <Overview />
              </PrivateRoute>
              <PrivateRoute roles={["TEACHER"]} path="/:sectionId/student">
                <Student />
              </PrivateRoute>
              <PrivateRoute roles={["TEACHER"]} path="/:sectionId/lo">
                <LearningOutcome />
              </PrivateRoute>
              {/* <PrivateRoute roles={["TEACHER"]} path="/:sectionId/planning">
                <Planning />
              </PrivateRoute> */}
              <PrivateRoute
                roles={["TEACHER"]}
                exact
                path="/:sectionId/activity"
              >
                <Activity />
              </PrivateRoute>
              <PrivateRoute roles={["TEACHER"]} path="/:sectionId/report">
                <TeacherReport />
              </PrivateRoute>
              <PrivateRoute
                roles={["TEACHER"]}
                path="/:sectionId/activity/:activityId"
              >
                <ActivityDetail />
              </PrivateRoute>
              <PrivateRoute roles={["ADMIN", "TEACHER"]} exact path="/">
                {user.role === "ADMIN" ? (
                  <Redirect to="/curriculum" />
                ) : (
                  <Home />
                )}
              </PrivateRoute>
              <PrivateRoute roles={["ADMIN", "TEACHER"]} path="/">
                <NotFound />
              </PrivateRoute>
            </Switch>
          </Layout>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
