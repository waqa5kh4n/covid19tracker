import React from "react";
import Home from "./pages/Home";
// import About from "./pages/About";
// import Graph from "./pages/Graph";
// import Forecast from "./pages/Forecast/Forecast";
import Nav from "./Nav";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Nav />
      <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route path="/graph" component={Graph} />
      <Route path="/about" component={About} />
      <Route path="/forecast" component={Forecast} /> */}
      </Switch>
    </div>
    </Router>
  );
}

export default App;
