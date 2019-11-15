import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col, Card } from 'react-bootstrap';
import bino from "../components/img/bino.png";
import car from "../components/img/car.png";
import people from "../components/img/people.png";

export class Landing extends Component {
    render() {
        return (
            <div>
                
                <Container>
  <Row>
    <Col></Col>
    <Col xs={10}><Card className="text-center">
  <Card.Header><h1>Communal</h1></Card.Header>
  <Card.Body>
    <Card.Title>Find out where you belong</Card.Title>
    <Card.Text><img src={bino} width="50px" height="50px" />
      Find hidden gems in places you visit regularly
    </Card.Text>
    <Card.Text><img src={car} width="50px" height="50px" />
      Share places you have found for others to explore
    </Card.Text>
    <Card.Text><img src={people} width="50px" height="50px" />
      Create groups for meetups
    </Card.Text>
  </Card.Body>
  <Card.Footer className="text-muted"></Card.Footer>
</Card>
</Col>
    <Col></Col>
  </Row>

</Container>
                
            </div>
        )
    }
}

export default Landing
