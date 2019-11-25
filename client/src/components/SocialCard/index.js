import React from "react";
import { Card } from "react-bootstrap";
import Logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

function SocialCard(props) {
  return (
    <Link to={props.link}>
      <Card >
        <Card.Img variant="top" src={props.img ? props.img : Logo} alt="Social Image" />
        <Card.Body>
          <Card.Title>
            <font size="3">
              <b>{props.title}</b>
            </font>
          </Card.Title>
          <Card.Text>
            <font size="1">Location: {props.location}</font>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default SocialCard;
