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
} from "./pages";
import { PrivateRoute, PublicRoute } from "./components";
import { Layout } from "./components/Layout/Layout";
import "./styles/global.module.scss";

import UserContext from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState({});

  if (window.location.host.split(".")[0] === "admin") {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <Router basename="/obed">
          <Switch>
            <PublicRoute path="/login">
              <Login />
            </PublicRoute>
            <Layout>
              <Switch>
                <PrivateRoute path="/teacher">
                  <Teacher />
                </PrivateRoute>
                <PrivateRoute path="/curriculum">
                  <Curriculum />
                </PrivateRoute>
                <PrivateRoute path="/sandbox">
                  <Sandbox />
                </PrivateRoute>
                <PrivateRoute path="/profile">
                  <Profile />
                </PrivateRoute>
                <PrivateRoute path="/plan">
                  <Plan />
                </PrivateRoute>
                <PrivateRoute exact path="/">
                  <Redirect to="/curriculum" />
                </PrivateRoute>
                <PrivateRoute path="/">
                  <NotFound />
                </PrivateRoute>
              </Switch>
            </Layout>
          </Switch>
        </Router>
      </UserContext.Provider>
    );
  } else
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Switch>
            <PublicRoute path="/login">
              <Login />
            </PublicRoute>
            <Layout>
              <Switch>
                <PrivateRoute path="/:sectionId/overview">
                  <Overview />
                </PrivateRoute>
                <PrivateRoute path="/:sectionId/student">
                  <Student />
                </PrivateRoute>
                <PrivateRoute path="/:sectionId/lo">
                  <LearningOutcome />
                </PrivateRoute>
                <PrivateRoute path="/:sectionId/planning">
                  <Planning />
                </PrivateRoute>
                <PrivateRoute path="/:sectionId/activity">
                  <Activity />
                </PrivateRoute>
                <PrivateRoute path="/:sectionId/report">
                  <TeacherReport />
                </PrivateRoute>
                <PrivateRoute path="/profile">
                  <Profile />
                </PrivateRoute>
                <PrivateRoute exact path="/">
                  <Home />
                </PrivateRoute>
                <PrivateRoute path="/">
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
