import React from "react";
import Midway from "../img/midway.png";
import { Card, Container, Row, Col } from 'react-bootstrap';


function SocialCard(props) {
    return (
<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={Midway} />
  <Card.Body>
      
          
    <Card.Title><font size="3" ><b>USS Midway</b></font></Card.Title>

    <Card.Text ><font size="1">Location: DownTown San Diego - 
    1000 pinned</font></Card.Text>
    
  </Card.Body>
</Card>
  );
}

export default SocialCard;