import React from "react";
import Midway from "../../assets/img/midway.png";
import { Card } from 'react-bootstrap';


function SocialCard(props) {
    return (
<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={props.img} />
  <Card.Body>
      
          
    <Card.Title><font size="3" ><b>{props.title}</b></font></Card.Title>

    <Card.Text ><font size="1">Location: {props.location}</font></Card.Text>
    
  </Card.Body>
</Card>
  );
}

export default SocialCard;