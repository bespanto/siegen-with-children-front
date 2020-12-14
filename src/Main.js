import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Start from "./components/Start";
import Login from "./components/Login";
import LoginRedirect from "./components/LoginRedirect";
import Playgrounds from "./components/Playgrounds";
import Restaurants from "./components/Restaurants";
import Childcare from "./components/Childcare";
import Walking from "./components/Walking";
import Profile from "./components/Profile";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Imprint from "./components/Imprint";
import TermsOfUse from "./components/TermsOfUse";

function Main(props) {

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Redirect to="/Start" /> :
        </Route>
        <Route exact path="/Start">
          <Start />
        </Route>
        <Route exact path="/Login">
          <Login />
        </Route>
        <Route exact path="/connect/:providerName/redirect" component={LoginRedirect} />
        <Route exact path="/Playgrounds">
          <Playgrounds />
        </Route>
        <Route exact path="/Restaurants">
          <Restaurants />
        </Route>
        <Route exact path="/Childcare">
          <Childcare />
        </Route>
        <Route exact path="/Walking">
          <Walking />
        </Route>
        <Route exact path="/Profile">
          <Profile />
        </Route>
        <Route exact path="/TermsOfUse">
          <TermsOfUse />
        </Route>
        <Route exact path="/PrivacyPolicy">
          <PrivacyPolicy />
        </Route>
        <Route exact path="/Imprint">
          <Imprint />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
