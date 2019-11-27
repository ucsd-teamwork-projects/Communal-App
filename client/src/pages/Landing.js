import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col, Card } from "react-bootstrap";
import ImgCarousel from "../components/ImgCarousel";
import Logo from "../assets/img/logo.png";
import "../utils/flowHeaders.min.css";


function Landing() {
  return (
    <Container className="mt-5">
      <ImgCarousel />
      <Row className="justify-content-center">
        <Col xs={12}>
          <Card className="mx-auto my-3">
            <Card.Header className="text-center">
              <h2 className="Display-1" style={{ "fontFamily": "'Bungee', cursive", "color": "black" }}>COMMUNAL</h2>
              <img src={Logo} width="150" height="150" alt="logo" />
              <h3 className="Display-3"><i>Find People, Do Stuff</i></h3>
            </Card.Header>
            <Card.Body className="text-left mx-auto text-center">
              <Card.Text>
                <i className="fas fa-binoculars fa-2x mr-4"></i>
                <span>Find the hidden gems in places you visit regularly that you never noticed were right around the corner!</span>
              </Card.Text>
              <Card.Text>
                <i className="fas fa-car fa-2x mr-4"></i>
                <span>Found something you want your community to see? Socialize it!</span>
              </Card.Text>
              <Card.Text>
                <i className="fas fa-users fa-2x mr-4"></i>
                <span>Create groups for meetups. Hold events as often as you want!</span>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;
