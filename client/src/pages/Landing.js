import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col, Card, Carousel, Badge } from "react-bootstrap";
import Logo from "../assets/img/logo.png"
import Balboa from "../assets/img/Balboa.jpg"
import Midway from "../assets/img/midway.png"
import SunsetCliffs from "../assets/img/SunsetCliffs.jpg"
import BorregoFlowers from "../assets/img/BorregoFlowers.jpg"
import MountLaguna from "../assets/img/MountLaguna.jpg"
import Lajollacaves from "../assets/img/Lajollacaves.jpeg"


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
      <br>
      </br>
      {/* Carousel */}
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}><Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={Midway}
      width="300"
      height="500"
      alt="First slide"
    />
    <Carousel.Caption>
      <h1 ><Badge pill variant="dark">Midway Museum</Badge></h1>
      <h3>Over 115,000 Socialized Yearly</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={Balboa}
      width="300"
      height="500"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h1><Badge pill variant="dark">Balboa Park</Badge></h1>
      <h3>Over 1,000,000 Socializes Yearly</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={SunsetCliffs}
      width="300"
      height="500"
      alt="thirs slide"
    />

    <Carousel.Caption>
      <h1><Badge pill variant="dark">Sunset Cliffs</Badge></h1>
      <h3>Over 100 Socialized Daily</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={BorregoFlowers}
      width="300"
      height="500"
      alt="forth slide"
    />

    <Carousel.Caption>
      <h1><Badge pill variant="dark">Borrego Springs Flowers</Badge></h1>
      <h3>Over 50,000 Socialized Yearly</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={MountLaguna}
      width="300"
      height="500"
      alt="fith slide"
    />

    <Carousel.Caption>
      <h1><Badge pill variant="dark">Mount Laguna</Badge></h1>
      <h3>Over 150 Socialized Daily</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={Lajollacaves}
      width="300"
      height="500"
      alt="sixth slide"
    />

    <Carousel.Caption>
      <h1 ><Badge pill variant="dark">La Jolla Caves</Badge></h1>
      <h3>Over 40,000 Socialized Yearly</h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel></Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Landing;
