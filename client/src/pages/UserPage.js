import React, { useEffect, useState } from "react";
import { Container, Row, Image, Card, CardColumns } from "react-bootstrap";
import Logo from "../assets/img/logo.png";
import API from "../utils/API";
import SocialCard from "../components/SocialCard";

function UserPage(props) {
  const [createdUserSocials, setCreatedUserSocials] = useState([]);
  const [attendingUserSocials, setAttendingUserSocials] = useState([]);
  const [likedUserSocials, setLikedUserSocials] = useState([]);

  useEffect(() => {
    API.getAllSocials().then(async socials => {
      let createdList = [];
      let attendingList = [];
      let likedList = [];

      let createdSocials = await socials.data.filter(social => {
        //Filters for socials created by user
        if(social.creator._id === props.user._id)
          return social;
      });

      let attendingSocials = await socials.data.filter(social => {
        //Filters for socials user is attending
        if("going" in social){
          if(social.going.includes(props.user._id))
            return social;
        }
      });

      let likedSocials = await socials.data.filter(social => {
        //Filters for socials liked by user
        if("likes" in props.user){
          console.log(props.user.likes)
          console.log(socials._id)
          if(props.user.likes.includes(social._id))
            return social;
        }
      });

      createdList = await createSocialCards(createdSocials);
      setCreatedUserSocials(createdList);

      attendingList = await createSocialCards(attendingSocials);
      setAttendingUserSocials(attendingList);

      likedList = await createSocialCards(likedSocials);
      setLikedUserSocials(likedList);
    });
  }, [props.user]);

  const createSocialCards = async (socials) => {
    let List = [];

    if(socials.length === 0){
      List.push(
        <SocialCard
          key="0"
          title="No Socials Yet, Go find some!"
          img={Logo}
          location="Bee Somewhere!"
          link="/add-social"
        />
      )
    } else {
      await socials.forEach(social => {
        List.push(
          <SocialCard
            key={props.user._id + social.name}
            title={social.name}
            img={social.image || Logo}
            location={social.location}
            link={`/socials/${social._id}`}
          />
        );
      });
    }
    return List;
  };

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
              <h2 className="h1 col-12 text-center">View Your Socials!</h2>
              <hr />
              <p className="lead col-12 text-center mb-5">
                Don't forget! Take a pic of your adventure and post it on the
                Event Page!
              </p>
              <h2 className="h1 col-12 mt-4 text-right">Social's Liked by You</h2>
              <CardColumns>
                {likedUserSocials}
              </CardColumns>

              <h2 className="h1 col-12 mt-4 text-right">Social's You are Attending</h2>
              <CardColumns>
                {attendingUserSocials}
              </CardColumns>

              <h2 className="h1 col-12 mt-4 text-right">Social's Created by You</h2>
              <CardColumns>
                {createdUserSocials}
              </CardColumns>
            </Row>
          </Card.Body>
        </Card>
      </Container>
  );
}

export default UserPage;
