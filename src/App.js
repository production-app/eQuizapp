import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MainPage from "./MainPage";
import ScorePage from "./ScorePage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/score" component={ScorePage} />
          {/* <Route exact path="/user" component={User} /> */}
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}
export default App;
