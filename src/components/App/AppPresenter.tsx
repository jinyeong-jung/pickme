import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Detail from "src/pages/Detail";
import Home from "src/pages/Home";

const AppPresenter: React.SFC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/pickme" exact={true} component={Home} />
      <Route path="/pickme/detail/:championName" component={Detail} />
    </Switch>
  </BrowserRouter>
);

export default AppPresenter;
