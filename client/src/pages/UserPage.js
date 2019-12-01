import React, { useEffect, useState } from "react";
import { Container, Row, Image, Card, CardColumns, ListGroup } from "react-bootstrap";
import Logo from "../assets/img/logo.png";
import API from "../utils/API";
import SocialCard from "../components/SocialCard";
import HorizontalScroll from "../components/HorizontalScroll";
import Loading from "../components/Loading";
import moment from "moment";


function UserPage(props) {
  const [createdUserSocials, setCreatedUserSocials] = useState([]);
  const [attendingUserSocials, setAttendingUserSocials] = useState([]);
  const [likedUserSocials, setLikedUserSocials] = useState([]);
  const [createdIsEmpty, setCreatedIsEmpty] = useState([]);
  const [attendingIsEmpty, setAttendingIsEmpty] = useState([]);
  const [likedIsEmpty, setLikedIsEmpty] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    API.getAllSocials().then(async socials => {
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

      // Sort all events by ascending order 
      const dateComparisonFn = (firstS, secondS) => {
        // ORDER = -1 FOR DESCENDING
        // ORDER = 1 FOR ASCENDING
        const ORDER = 1;
        if (moment(firstS.startDate).isAfter(secondS.startDate)) {
          return 1 * ORDER;
        }
        else if (moment(firstS.startDate).isBefore(secondS.startDate)) {
          return -1 * ORDER;
        } 

        return 0;

      }

      let { list: createdListArr, isEmpty: createdEmpty } = await createSocialCards(createdSocials.sort(dateComparisonFn));
      setCreatedUserSocials(createdListArr);
      setCreatedIsEmpty(createdEmpty);

      let { list: attendingListArr, isEmpty: attendingEmpty } = await createSocialCards(attendingSocials.sort(dateComparisonFn));
      setAttendingUserSocials(attendingListArr);
      setAttendingIsEmpty(attendingEmpty);

      let { list: likedListArr, isEmpty: likedEmpty } = await createSocialCards(likedSocials.sort(dateComparisonFn));
      setLikedUserSocials(likedListArr);
      setLikedIsEmpty(likedEmpty);

      setLoading(false);

    });
  }, [props.user, props.user.likes]);

  const createSocialCards = async (socials) => {
    let list = [];
    let isEmpty = false;

    if (socials.length === 0) {
      list.push(
        <SocialCard
          cardStyle={{ "width": "300px", "height": "200px", "backgroundColor": "transparent", "borderRadius": "10px","boxShadow": "#eee 0px 0px 10px"}}
          key="0"
          title="No Social's yet, go find some!"
          img={"https://lh3.googleusercontent.com/QhL5dNG9pMr0I3ABM2TWT6yjyieVwdNDWRX7P3Ia1zplwfhwcpPbfLPKOR3OQi0wMdwdVC7P=w1080-h608-p-no-v0"}
          location="Bee Somewhere!"
          link="/find-social"
        />

        )
        isEmpty = true;
    } else {
      await socials.forEach(social => {
        list.push(
          <SocialCard
            cardStyle={{ "width": "300px", "height": "200px", "backgroundColor": "transparent", "borderRadius": "10px", "boxShadow": "#eee 0px 0px 10px" }}
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
    return { list, isEmpty};
  };

  const containerStyles = {
    "backgroundImage": "url(https://i.pinimg.com/originals/66/20/d6/6620d6402b8e756a4848ff5c0872c6fe.jpg)",
    "overflow": "hidden",
    "backgroundRepeat": "no-repeat",
    "backgroundSize": "cover",
    "backgroundColor": "rgba(238, 238, 238, 0.35)",
    "backgroundBlendMode": "color"
  }

  const glowStyle = {
    "color": "#ffffff!important",
    "textShadow": "#ffffff 1px 0px 15px"
  }

  const scrollContainerStyle = {
    "maxWidth": "1200px",
    "margin": "0 auto"
  }

  const userGreetingStyles = {
    "backgroundImage": "linear-gradient( rgb(0,0,0, 0.70), transparent)"
  }

  if (loading) {
    return <Loading />
  } else {
    return (
      <div className="pb-5" style={containerStyles}>
        {/* <Card className="p-3" > */}
        {/* <Card className="p-3" style={{"background": "url(../../userProfile.jpg) no-repeat center center", "backgroundSize": "cover"}}> */}
        {/* <div className="overlay"></div> */}

        {/* <Card.Body> */}
        {/* User Info */}
        <Row>
          <span className="h1 col-12 text-center">
            <div className="p-3 pt-5 mx-auto" style={userGreetingStyles}>
              <h4 style={glowStyle} className="h4 text-white font-weight-bold flow-text">
              {

                ( moment().isBetween(moment(`${moment().format("MM-DD-YYYY")} 06:00:00`), moment(`${moment().format("MM-DD-YYYY")} 11:59:59`)) ) ?
                "good morning"
                : ( moment().isBetween(moment(`${moment().format("MM-DD-YYYY")} 12:00:00`), moment(`${moment().format("MM-DD-YYYY")} 17:59:59`)) ) ?
                "good afternoon"
                : 
                "good evening"

                }

                
              </h4>
              <span style={{ "color": "rgb(255, 215, 0)", "textShadow": "rgb(255, 255, 255) 1px 0 10px" }}>{props.user.name.split(" ")[0]}</span>
          <Image
            className="mx-auto d-block rounded-circle mt-3 mb-3"
            src={props.user.image ? props.user.image : Logo}
            roundedCircle
            style={{ "boxShadow": "#ffffff 0px 0px 30px", "maxWidth": "175px", "maxHeight": "175px", "width": "30vw", "height": "30vw" }, { "boxShadow": "0px 0px 30px #888888" }}
            height="150px"
          />
            </div>
          </span>
        </Row>
        {/* Social Info */}
        {/* <Row>
              <h2 className="h1 col-12 text-center">View Your Socials!</h2>
              <hr />
              <p className="lead col-12 text-center mb-5">
                Found something worth wild? Don't forget to create a Social to share!
              </p>
            </Row> */}
            <div>
              
        <Row className="px-3 pt-0" style={scrollContainerStyle}>
            <h4 style={glowStyle} className="h4 text-white flow-text col-12 mt-2 font-weight-bold text-left">Going ({attendingIsEmpty ? "0": attendingUserSocials.length})</h4>
            {attendingUserSocials.length ? (
              <HorizontalScroll
                posts={attendingUserSocials} />
            ) : ""}

        
            <h4 style={glowStyle} className="h4 text-white flow-text col-12 mt-4 font-weight-bold text-left">Interested ({likedIsEmpty ? "0": likedUserSocials.length})</h4>
            {likedUserSocials.length ? (
              <HorizontalScroll
                posts={likedUserSocials} />
            ) : ""}
        

            <h4 style={glowStyle} className="h4 text-white flow-text col-12 mt-4 font-weight-bold text-left">Hosting ({createdIsEmpty ? "0": createdUserSocials.length})</h4>
            {createdUserSocials.length ? (
              <HorizontalScroll
                posts={createdUserSocials} />
            ) : ""}
        </Row>
            </div>

      </div>
    );
  }
}

export default UserPage;
