import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import "./main.css";
import { Container, Row } from "react-bootstrap";
import Loading from "../../components/Loading";
import { documentReady } from "./main.js";
import "../../utils/flowHeaders.min.css";
import Pusher from "pusher-js";


class FindSocials extends Component {
  constructor(props) {
    super(props);
    this.currSocialIdx = 0;
    this.user = this.props.user;
  }

  state = {
    socials: [],
    loading: true

  };

  filterSocials = socials => {
    // let socialsList = socials.data;
    // Pull user's likes and dislikes
    API.getUser(this.user.email).then(userObj => {
      const { likes, dislikes, going } = userObj.data;
      let seen = [];

      if (likes && dislikes && going) { seen = likes.concat(dislikes).concat(going) };

      const filtered = socials.filter(function (social) {
        if (seen.includes(social._id) || moment(social.endDate).isBefore(new Date())) {
          return false;
        } else {
          return true;
        }
      });

      this.setState({
        socials: filtered,
        loading: false
      });

      // Call page functions after component rendered
      documentReady();
    });
  };

  getSocials = () => {
    this.setState({loading: true});

    //   Pull numSocials from the database
    API.getSocials().then(allSocials => {
      //   Filter returned Socials based off what user has already seen
      this.filterSocials(allSocials.data)

    });

  };

  dislikeSocial = () => {
    // Add Social to user dislikes
    API.putUserSocialDislike(
      this.user.email,
      this.state.socials[this.currSocialIdx]._id
    );
    this.currSocialIdx++;
  };

  likeSocial = () => {
    // Add Social to user likes
    API.putUserSocialLike(
      this.user.email,
      this.state.socials[this.currSocialIdx]._id
    );
    this.currSocialIdx++;
  };

  markGoingSocial = () => {
    // Add Social to user going
    API.putUserSocialGoing(
      this.user.email,
      this.state.socials[this.currSocialIdx]._id
    );

    // Add user to Social going
    API.putSocialUserGoing(
      this.user._id,
      this.state.socials[this.currSocialIdx]._id
    );

    this.currSocialIdx++;
  };

  componentDidMount() {
    // Get socials from database that user has not seen
    this.getSocials()


    // Listen for new Socials (Uncomment when adding socials is complete)
    const pusher = new Pusher('cd62b719442b1118e770', {
      cluster: 'us3',
      encrypted: true
    });
    const channel = pusher.subscribe(`socials`);
    channel.bind(`New Social`, data => {
      this.getSocials()
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    } else {

    return (
      <div>
        {/* Main card container */}
        <div className="stage">
          <div className="title">
            <i className="fas fa-street-view"></i>&nbsp;&nbsp;Events Near You 
          </div>
          <div
            id="stacked-cards-block"
            className="stackedcards stackedcards--animatable init"
          >
            <div className="stackedcards-container">
              {/* Render filtered social cards here */}

              {this.state.socials.map((social) => (
                <div key={social._id} className="card">
                  <Link to={`socials/${social._id}`}>
                    <div className="card-content" style={{ "padding": "0px" }}>
                      <div className="card-image">
                        <img
                          src={social.image}
                          width="100%"
                          height="100%"
                          alt=""
                          style={{ "minHeight": "200px", "maxHeight": "300px" }}
                        />
                      </div>
                      <div className="card-titles w-100" style={{ "backgroundImage": "linear-gradient( transparent, rgb(255, 192, 56, 0.8) 30%)", "padding": "20px 30px" }}>
                        <h5 className="text-left flow-text font-weight-bold break-word">{social.name}</h5>
                        <h6 className="text-left flow-text break-word font-weight-bold">
                          <i className="fas fa-calendar-week" style={{ "color": "#fae625" }}></i>
                          &nbsp;&nbsp;<Moment format="dddd, MMMM Do YYYY, h:mm a">{social.startDate}</Moment>
                        </h6>
                      </div>
                    </div>
                  </Link>
                  <div className="card-footer" >
                    <Container>
                      <Row className="mb-4 mt-3">
                        <div>
                          
                          <i className="fas fa-user-circle fa-lg text-info mr-1"></i>
                          &nbsp;
                          <span className="text-muted">
                            
                            {social.creator.name}
                          </span>
                        </div>
                      </Row>
                      <Row className="mb-4">
                        <div className="text-left">
                          
                          <i className="fas fa-thumbtack fa-lg text-danger mr-2"></i>
                          &nbsp;
                          <span className="text-muted">
                            
                            {social.location}
                          </span>
                        </div>
                      </Row>
                    </Container>
                  </div>
                </div>
              ))}

              {/* If events is empty, show empty message  */}
            </div>
            <div className="stackedcards--animatable stackedcards-overlay top">
              <img
                src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png"
                width="auto"
                height="auto"
                alt=""
              />
            </div>
            <div className="stackedcards--animatable stackedcards-overlay right">
              <img
                src="https://image.ibb.co/dCuESn/Path_3x.png"
                width="auto"
                height="auto"
                alt=""
              />
            </div>
            <div className="stackedcards--animatable stackedcards-overlay left">
              <img
                src="https://image.ibb.co/heTxf7/20_status_close_3x.png"
                width="auto"
                height="auto"
                alt=""
              />
            </div>
          </div>
          <div className="global-actions">
            <div
              onClick={() => this.dislikeSocial()}
              className="push-dislike-action"
            >
              <div className="left-action">
                <img
                  src="https://image.ibb.co/heTxf7/20_status_close_3x.png"
                  width="26"
                  height="26"
                  alt=""
                />
              </div>
            </div>
            <div
              onClick={() => this.markGoingSocial()}
              className="push-going-action"
            >
              <div className="top-action">
                <img
                  src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png"
                  width="18"
                  height="16"
                  alt=""
                />
              </div>
            </div>
            <div
              onClick={() => this.likeSocial()}
              className="push-like-action"
            >
              <div className="right-action">
                <img
                  src="https://image.ibb.co/dCuESn/Path_3x.png"
                  width="30"
                  height="28"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <h2 className="final-state hidden text-dark">There are no more events in your area. <br /> Check again later!</h2>
      </div>
    )};
  }
}

export default FindSocials;
