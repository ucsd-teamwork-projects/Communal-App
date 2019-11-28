import React from "react";
import { Card } from "react-bootstrap";
import Logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import "./main.css";
import "../../utils/flowHeaders.min.css";


function SocialCard(props) {
  return (
    <Link to={props.link}>
      {/* <Card >
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
      </Card> */}
      <Card style={props.cardStyle} className="text-white">
        <Card.Img width="100%" height="100%" style={{"objectFit": "cover"}} src={props.img ? props.img : Logo} alt="Card image cap" />
        <Card.ImgOverlay>
          <div className="overlay-container" >
            <div className="text-left overlay-title-container">
              <h6 className="mb-0 font-weight-bolder flow-text ellipsis-overflow"><Moment format="dddd, MMMM Do YYYY, h:mm a">{props.date}</Moment></h6>
              <h5 style={{"color": "#fff468"}} className="mt-0 mb-1 font-weight-bold ellipsis-overflow flow-text">{props.title}</h5>
              <div className="ellipsis-overflow text-left">
                <i className="fas fa-thumbtack fa-sm text-danger mr-1"></i>
                &nbsp;
                <span className="font-weight-light">
                  {props.location}
                </span>
              </div>
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>
    </Link>
  );
}

export default SocialCard;
