import { BrowserRouter as Router, Switch, Route as PublicRoute } from "react-router-dom";
import { Curriculum, Home, Sandbox, Profile } from "./pages";
import { Layout } from "./components/Layout/Layout"

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <PublicRoute path="/curriculum">
            <Curriculum />
          </PublicRoute>
          <PublicRoute path="/sandbox">
            <Sandbox />
          </PublicRoute>
          <PublicRoute path="/profile">
            <Profile />
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
