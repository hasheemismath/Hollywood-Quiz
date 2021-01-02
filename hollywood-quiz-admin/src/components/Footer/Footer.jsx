import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
          </p>
        </Container>
      </footer>
    );
  }
}

export default Footer;
