import {
  BrowserRouter as Router,
  Switch,
  Route as PublicRoute,
} from "react-router-dom";
import {
  Curriculum,
  Home,
  Sandbox,
  Profile,
  Teacher,
  Plan,
  Login,
  Student,
} from "./pages";
import { Layout } from "./components/Layout/Layout";
import "./styles/global.module.scss";

function App() {
  if (window.location.host.split(".")[0] === "admin") {
    return (
      <Router>
        <Switch>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <Layout>
            <Switch>
              <PublicRoute path="/teacher">
                <Teacher />
              </PublicRoute>
              <PublicRoute path="/curriculum">
                <Curriculum />
              </PublicRoute>
              <PublicRoute path="/sandbox">
                <Sandbox />
              </PublicRoute>
              <PublicRoute path="/profile">
                <Profile />
              </PublicRoute>
              <PublicRoute path="/plan">
                <Plan />
              </PublicRoute>
              <PublicRoute exact path="/">
                <Home />
              </PublicRoute>
            </Switch>
          </Layout>
        </Switch>
      </Router>
    );
  } else
    return (
      <Router>
        <Switch>
          <Layout>
            <Switch>
              <PublicRoute path="/student">
                <Student />
              </PublicRoute>
              <PublicRoute path="/profile">
                <Profile />
              </PublicRoute>
            </Switch>
          </Layout>
        </Switch>
      </Router>
    );
}

export default App;
