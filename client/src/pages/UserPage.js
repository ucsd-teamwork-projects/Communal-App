import React, { useEffect, useState } from "react";
import { Container, Row, Image, Card, CardColumns } from "react-bootstrap";
import Logo from "../assets/img/logo.png";
import { useAuth0 } from "../react-auth0-spa";
import API from "../utils/API";
import SocialCard from "../components/SocialCard";

function UserPage(props) {
  const { user, loading, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserSocials, setCurrentUserSocials] = useState([]);

  useEffect(() => {
    if (!loading && user && isAuthenticated) {
      API.getUser(props.user.email).then(user => {
        setCurrentUser(user.data);
      });
    }

    API.getAllSocials().then(async socials => {
      let list = [];

      let userSocials = await socials.data.filter(social => {
        // Need to filter so that only socials that the user is appart of will be returned
        return social;
      });

      await userSocials.forEach(social => {
        list.push(
          // <div className="col-6">
          <SocialCard
            key={props.user.id + social.name}
            title={social.name}
            img={social.img || "No Image"}
            location={social.location}
          />
          // </div>
        );
      });

      setCurrentUserSocials(list);
    });
  });

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
              <h1 className="h1 col-12 text-center">Your Socials!</h1>
              <p className="lead col-12 text-center my-4">
                Don't forget! Take a pic of your adventure and post it on the
                Event Page!
              </p>
              <CardColumns>{currentUserSocials}</CardColumns>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default UserPage;
