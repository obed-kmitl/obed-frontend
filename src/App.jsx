import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Curriculum, Home, Sandbox} from './pages'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/curriculum">
          <Curriculum />
        </Route>
        <Route path="/sandbox">
          <Sandbox />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
