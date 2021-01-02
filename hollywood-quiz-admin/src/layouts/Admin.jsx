import React from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import { style } from "variables/Variables.jsx";

import routes from "routes.js";


const Admin = (props) => {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };


  return (
    <div className="wrapper">
      <NotificationSystem style={style} />
      <Sidebar {...props} routes={routes} color="black"/>
      <div id="main-panel" className="main-panel">
        <AdminNavbar
          {...props}
        />
        <Switch>{getRoutes(routes)}</Switch>
        <Footer />
      </div>
    </div>
  );
}

export default Admin;
