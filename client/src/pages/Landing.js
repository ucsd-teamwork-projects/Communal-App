import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col, Card, Carousel, Badge } from "react-bootstrap";
import ImgCarousel from "../components/ImgCarousel";
import Logo from "../assets/img/logo.png";
import Balboa from "../assets/img/Balboa.jpg";
import Midway from "../assets/img/midway.png";
import SunsetCliffs from "../assets/img/SunsetCliffs.jpg";
import BorregoFlowers from "../assets/img/BorregoFlowers.jpg";
import MountLaguna from "../assets/img/MountLaguna.jpg";
import Lajollacaves from "../assets/img/Lajollacaves.jpeg";

function Landing() {
  return (
    // <div>
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card>
            <Card.Header className="text-center">
              <h1 className="Display-1">COMMUNAL</h1>
              <img src={Logo} width="150" height="150" alt="logo" />
              <h3 className="Display-3">Find People, Do Stuff</h3>
            </Card.Header>
            <Card.Body className="text-left mx-auto text-center">
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
              <ImgCarousel />
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    // </div>
  );
}

export default Landing;
