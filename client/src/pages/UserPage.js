import React, { useEffect, useState } from "react";
import { Container, Row, Image, Card, CardColumns } from "react-bootstrap";
import Logo from "../assets/img/logo.png";
import { useAuth0 } from "../react-auth0-spa";
import API from "../utils/API";
import SocialCard from "../components/SocialCard";

function UserPage(props) {
  const [currentUserSocials, setCurrentUserSocials] = useState([]);


  useEffect(() => {
    API.getAllSocials().then(async socials => {
      let list = [];

      let userSocials = await socials.data.filter(social => {
        //Filters for socials created by user
        if(social.creator._id === props.user._id)
          return social;
        //need to add filter for socials user is attending
      });

      await userSocials.forEach(social => {
        console.log(social)
        list.push(
          <SocialCard
            key={props.user.id + social.name}
            title={social.name}
            img={social.image || Logo}
            location={social.location}
          />
        );
      });

      setCurrentUserSocials(list);
    });
  }, []);

  return (
      <Container className="my-5">
        <Card className="p-3">
          <Card.Body>
            {/* User Image */}
            <Row>
              <Image
                className="mx-auto d-block rounded-circle mb-3"
                src={props.user.image?props.user.image:Logo}
                roundedCircle
                width="225px"
                height="225px"
              />
            </Row>
            {/* User Info */}
            <Row>
              <div className="mx-auto">
                <h2 className="h2">{props.user.name}</h2>
                <h3 className="h3">{props.user.email}</h3>
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
              <CardColumns>
                {currentUserSocials}
              </CardColumns>
            </Row>
          </Card.Body>
        </Card>
      </Container>
  );
}

export default UserPage;
