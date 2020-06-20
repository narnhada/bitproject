import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Indextem from "./templete/Indextem";
import Logintem from "./templete/Logintem";
import Jointem from "./templete/Jointem";
import Maptem from "./templete/Maptem";
import Maptem2 from "./templete/Maptem2";
import Graphtem from "./templete/Graphtem";
import Maptem3 from "./templete/Maptem3";
import Biyongtem from "./templete/Biyongtem";
import Biyong2tem from "./templete/Biyong2tem";

function App() {
  return (
    <>
      <Route exact path="/" component={Indextem}></Route>
      <Route path="/login" component={Logintem}></Route>
      <Route path="/join" component={Jointem}></Route>
      <Switch>
        <Route path="/map/:gu/3" component={Maptem3}></Route>
        <Route path="/map/:gu" component={Maptem2}></Route>
        <Route path="/map" component={Maptem}></Route>
      </Switch>
      <Route path="/graph1" component={Graphtem}></Route>
      <Route path="/biyong" component={Biyongtem}></Route>
      <Route path="/biyong2" component={Biyong2tem}></Route>
    </>
  );
}

export default App;
