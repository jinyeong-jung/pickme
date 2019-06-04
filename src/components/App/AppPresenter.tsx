import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Detail from "src/pages/Detail";
import Home from "src/pages/Home";

const AppPresenter: React.SFC = () => (
  <BrowserRouter>
    <Route path="/" exact={true} component={Home} />
    <Route path="/detail/:championName" component={Detail} />
  </BrowserRouter>
);

export default AppPresenter;
