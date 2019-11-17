import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import Logo from "../components/img/logo.png";
import SocialCard from "../components/SocialCard";
import HorizontalScroll from "../components/HorizontalScroll";

export class UserPage extends Component {
  render() {
    return (
      <div>
        <Container>
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row>
            <Col></Col>
            <Col xs={6}>
              {" "}
              <Image
                className="mx-auto d-block rounded-circle "
                src={Logo}
                roundedCircle
                width="225px"
                height="225px"
              />
            </Col>
            <Col> </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={5}>
              {" "}
              <ListGroup variant="flush">
                <ListGroup.Item>Name: Winnie the Poo</ListGroup.Item>
                <ListGroup.Item>Location: San Diego, Ca</ListGroup.Item>
                <ListGroup.Item>
                  Hobbies and activites: OutDoors, Games, Honey
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col></Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <HorizontalScroll />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserPage;
