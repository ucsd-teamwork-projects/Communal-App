import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col, Card } from "react-bootstrap";
import Logo from "../assets/img/logo.png"

function Landing() {
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col></Col>
          <Col xs={10}>
            <Card className="text-center">
              <Card.Header>
                <h1 className="Display-1">COMMUNAL</h1>
                <img
                    src={Logo}
                    width="150"
                    height="150"
                    alt="logo"
                />
                <h3 className="Display-3">Find People, Do Stuff</h3>
              </Card.Header>
              <Card.Body className="text-left mx-auto">
                <Card.Text>
                  <i className="fas fa-binoculars fa-2x mr-4"></i>
                  <span>Find hidden gems in places you visit regularly</span>
                </Card.Text>
                <Card.Text>
                  <i className="fas fa-car fa-2x mr-4"></i>
                  <span>Share places you have found for others to explore</span>
                </Card.Text>
                <Card.Text>
                  <i className="fas fa-users fa-2x mr-4"></i>
                  <span>Create groups for meetups</span>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Landing;
