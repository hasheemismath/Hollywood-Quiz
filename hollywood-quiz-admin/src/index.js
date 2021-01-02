import React from "react";
import ReactDOM from "react-dom";

import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/style.scss";

import AdminLayout from "layouts/Admin.jsx";
import Login from './views/Login';
import { ToastContainer } from 'react-toastify';
ReactDOM.render(
  <HashRouter>
    <ToastContainer />
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/" component={Login} />
      <Redirect from="/admin" to="/admin/dashboard" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
