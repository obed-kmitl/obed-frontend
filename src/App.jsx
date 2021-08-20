import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Home,Sandbox} from './pages'

function App() {
  return (
    <Router>
      <Switch>
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
