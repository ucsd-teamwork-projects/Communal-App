import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./main.css";
import { Container, Row } from "react-bootstrap";
import { documentReady } from "./main.js";
import "../../utils/flowHeaders.min.css";

class FindSocials extends Component {
  constructor(props) {
    super(props);
    this.currSocialIdx = 0;
    this.user = this.props.user;
  }

  state = {
    socials: []
  };

  filterSocials = socials => {
    // Pull user's likes and dislikes
    API.getUser(this.user.email).then(userObj => {
      const { likes, dislikes } = userObj;
      let seen;

      if (likes) seen = likes.concat(dislikes);

      const filtered = this.state.socials.filter(function(social) {
        if (seen.includes(social._id)) {
          return false;
        } else {
          return true;
        }
      });

      this.setState({
        socials: filtered
      });
    });
  };

  getSocials = () => {
    //   Pull numSocials from the database
    let fields = ["creator"];
    API.getSocials(fields).then(allSocials => {
      //   Filter returned Socials based off what user has already seen
      this.filterSocials(allSocials);
    });
  };

  dislikeSocial = () => {
    // Add Social to user dislikes
    API.putUserSocialDislike(
      this.user.email,
      this.state.socials[this.currSocialIdx]
    );
    this.currSocialIdx++;
  };

  likeSocial = () => {
    // Add Social to user likes
    API.putUserSocialLike(
      this.user.email,
      this.state.socials[this.currSocialIdx]
    );
    this.currSocialIdx++;
  };

  markGoingSocial = () => {
    // Add Social to user going
    API.putUserSocialGoing(
      this.user.email,
      this.state.socials[this.currSocialIdx]
    );

    // Add user to Social going
    API.putSocialUserGoing(
      this.user.email,
      this.state.socials[this.currSocialIdx]
    );

    this.currSocialIdx++;
  };

  componentDidMount() {
    // Get socials from database that user has not seen
    this.getSocials();
    // Call page functions after component rendered
    documentReady();

    // Listen for new Socials (Uncomment when adding socials is complete)
    // const pusher = new Pusher('APP_KEY', {
    //   cluster: 'APP_CLUSTER',
    //   encrypted: true
    // });
    // const channel = pusher.subscribe(`socials`);
    // channel.bind(`New Social`, data => {
    //   this.setState({ socials: [...this.state.socials, data] });
    // });
  }

  render() {
    return (
      <div>
        {/* Main card container */}
        <div className="stage">
          <div className="title">
            Events Near You &nbsp;&nbsp;<i className="fas fa-street-view"></i>{" "}
          </div>
          <div
            id="stacked-cards-block"
            className="stackedcards stackedcards--animatable init"
          >
            <div className="stackedcards-container">
              {/* Render filtered social cards here */}

              {this.state.socials.map(social => (
                <div className="card">
                  <Link to={`socials/${social._id}`}>
                    <div className="card-content">
                      <div className="card-image">
                        <img
                          src={social.img}
                          width="100%"
                          height="100%"
                          alt=""
                        />
                      </div>
                      <div className="card-titles">
                        <h4 className="flow-text break-word">{social.name}</h4>
                        <h5 className="flow-text break-word">
                          <i className="fas fa-calendar-week text-secondary"></i>
                          &nbsp;&nbsp;{social.date}
                        </h5>
                      </div>
                    </div>
                  </Link>
                  <div className="card-footer">
                    <Container>
                      <Row className="mb-4 mt-3">
                        <div>
                          {" "}
                          <i className="fas fa-user-circle fa-lg text-info"></i>{" "}
                          &nbsp;{" "}
                          <span className="text-muted">
                            {" "}
                            {social.creator.name}{" "}
                          </span>{" "}
                        </div>
                      </Row>
                      <Row className="mb-4">
                        <div>
                          {" "}
                          <i className="fas fa-thumbtack fa-lg text-danger"></i>{" "}
                          &nbsp;{" "}
                          <span className="text-muted">
                            {" "}
                            {social.location}{" "}
                          </span>{" "}
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
            <div className="left-action">
              <div
                onClick={() => this.dislikeSocial()}
                className="push-dislike-action"
              >
                <img
                  src="https://image.ibb.co/heTxf7/20_status_close_3x.png"
                  width="26"
                  height="26"
                  alt=""
                />
              </div>
            </div>
            <div className="top-action">
              <div
                onClick={() => this.markGoingSocial()}
                className="push-going-action"
              >
                <img
                  src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png"
                  width="18"
                  height="16"
                  alt=""
                />
              </div>
            </div>
            <div className="right-action">
              <div
                onClick={() => this.likeSocial()}
                className="push-like-action"
              >
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
        <h2 className="final-state hidden text-dark">There are no more events in your area. <br/> Check again later!</h2>
      </div>
    );
  }
}

export default FindSocials;
