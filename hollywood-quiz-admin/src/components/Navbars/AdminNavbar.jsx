/* eslint-disable */

import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-end">
          <div className="col-auto">
            <a className="btn btn-logout mt-2" href={process.env.PUBLIC_URL + "/"}>Logout</a>
          </div>
          <div className="col-auto d-md-none">
            <button className="btn btn-menu btn-default mt-2" onClick={this.mobileSidebarToggle}>Menu</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
