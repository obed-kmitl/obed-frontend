import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Curriculum, Home, Sandbox, Profile, Teacher } from "./pages";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/teacher">
            <Teacher />
          </Route>
          <Route path="/curriculum">
            <Curriculum />
          </Route>
          <Route path="/sandbox">
            <Sandbox />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
