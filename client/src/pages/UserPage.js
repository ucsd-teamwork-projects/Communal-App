import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card
} from "react-bootstrap";
import Logo from "../assets/img/logo.png";
import HorizontalScroll from "../components/HorizontalScroll";
import { useAuth0 } from "../react-auth0-spa";
import API from "../utils/API";


function UserPage() {
  const { user, loading, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if(!loading && user && isAuthenticated){
      API.getUser(user.email).then(user => {
        setCurrentUser(user.data);
      });
    }
  })

  return (
    <div className="mt-5">
      <Container>
        <Card className="p-3">
          <Card.Body>
            {/* User Image */}
            <Row>
                <Image
                  className="mx-auto d-block rounded-circle mb-3"
                  src={currentUser.image || Logo}
                  roundedCircle
                  width="225px"
                  height="225px"
                />
            </Row>
            {/* User Info */}
            <Row>
              <div className="mx-auto">
                <h2 className="h2">{currentUser.name}</h2>
                <h3 className="h3">{currentUser.email}</h3>
              </div>
            </Row>
            <hr></hr>
            {/* Social Info */}
            <Row>
              <Col>
                <HorizontalScroll />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default UserPage;
