import React, { useEffect, useState } from "react";
import { Container, Row, Image, Card, CardColumns, ListGroup } from "react-bootstrap";
import Logo from "../assets/img/logo.png";
import API from "../utils/API";
import SocialCard from "../components/SocialCard";
import HorizontalScroll from "../components/HorizontalScroll";
import Loading from "../components/Loading";


function UserPage(props) {
  const [createdUserSocials, setCreatedUserSocials] = useState([]);
  const [attendingUserSocials, setAttendingUserSocials] = useState([]);
  const [likedUserSocials, setLikedUserSocials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getAllSocials().then(async socials => {
      let createdList = [];
      let attendingList = [];
      let likedList = [];

      let createdSocials = await socials.data.filter(social => {
        //Filters for socials created by user
        if (social.creator._id === props.user._id)
          return social;
      });

      let attendingSocials = await socials.data.filter(social => {
        //Filters for socials user is attending
        if ("going" in social) {
          if (social.going.includes(props.user._id))
            return social;
        }
      });

      let likedSocials = await socials.data.filter(social => {
        //Filters for socials liked by user
        if ("going" in social) {
          if (!social.going.includes(props.user._id))
            if ("likes" in props.user) {
              if (props.user.likes.includes(social._id))
                return social;
            }
        } else {
          if ("likes" in props.user) {
            if (props.user.likes.includes(social._id))
              return social;
          }
        }
      });

      createdList = await createSocialCards(createdSocials);
      setCreatedUserSocials(createdList);

      attendingList = await createSocialCards(attendingSocials);
      setAttendingUserSocials(attendingList);

      likedList = await createSocialCards(likedSocials);
      setLikedUserSocials(likedList);
      
      setLoading(false);

    });
  }, [props.user, props.user.likes]);

  const createSocialCards = async (socials) => {
    let List = [];

    if (socials.length === 0) {
      List.push(
        <SocialCard
          cardStyle={{ "width": "300px", "height": "33vh" }}
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
            cardStyle={{ "width": "300px", "height": "33vh" }}
            key={props.user._id + social.name}
            title={social.name}
            date={social.startDate}
            img={social.image || Logo}
            location={social.location}
            link={`/socials/${social._id}`}
          />
        );
      });
    }
    return List;
  };


  if (loading) {
    return <Loading />
  } else {
    return (
      <Container className="my-5">
        <Card className="p-3" >
          {/* <Card className="p-3" style={{"background": "url(../../userProfile.jpg) no-repeat center center", "backgroundSize": "cover"}}> */}
          {/* <div className="overlay"></div> */}

          <Card.Body>
            {/* User Image */}
            <Row>
              <Image
                className="mx-auto d-block rounded-circle mb-3"
                src={props.user.image ? props.user.image : Logo}
                roundedCircle
                width="225px"
                height="225px"
              />
            </Row>
            {/* User Info */}
            <Row>
              <span className="h1 col-12 text-center">
                <div className="mx-auto">
                  <h2 className="h2">{props.user.name}</h2>
                  <h3 className="h3">{props.user.email}</h3>
                </div>
              </span>
            </Row>
            <hr></hr>
            {/* Social Info */}
            <Row>
              <h2 className="h1 col-12 text-center">View Your Socials!</h2>
              <hr />
              <p className="lead col-12 text-center mb-5">
                Found something worth wild? Don't forget to create a Social to share!
              </p>
            </Row>
            <Row>
              <h2 className="h1 col-12 mt-4 text-center"><b>Social's Liked by You</b></h2>
              {likedUserSocials.length ? (
                <HorizontalScroll
                  posts={likedUserSocials} />
              ) : ""}

              <h2 className="h1 col-12 mt-4 text-center"><b>Social's You are Attending</b></h2>
              {attendingUserSocials.length ? (
                <HorizontalScroll
                  posts={attendingUserSocials} />
              ) : ""}

              <h2 className="h1 col-12 mt-4 text-center">Social's Created by You</h2>
              {createdUserSocials.length ? (
                <HorizontalScroll
                  posts={createdUserSocials} />
              ) : ""}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default UserPage;
