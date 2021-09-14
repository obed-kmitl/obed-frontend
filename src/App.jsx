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
} from "./pages";
import { Layout } from "./components/Layout/Layout";
import "./styles/global.module.scss";

function App() {
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
            <PublicRoute path="/">
              <Home />
            </PublicRoute>
          </Switch>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
