import {
  BrowserRouter as Router,
  Switch,
  Route as PublicRoute,
} from "react-router-dom";
import { Curriculum, Home, Sandbox, Profile, Teacher ,Plan } from "./pages";
import { Layout } from "./components/Layout/Layout";
import "./styles/global.module.scss";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
