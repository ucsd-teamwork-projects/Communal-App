import React, { Component } from "react";

import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./main.css";
import { Container, Row, Col } from 'react-bootstrap';

import { documentReady } from "./main.js";

// Import responsive header tags
import "../../utils/flowHeaders.min.css";

class FindSocials extends Component {
  state = {
    socials: [],
    user: this.props.user,
    currSocialId: 0
  };

  filterSocials = socials => {
    // Pull user's likes and dislikes
    API.getUserSocialPref(this.state.user.email)
      .then( (pref) => {
        const { likes, dislikes } = pref;
        const seen = likes.concat(dislikes);
        const filtered = socials.filter(function (social) {
          if (seen.includes(social._id)) {
            return false;
          } else {
            return true;
          }
        });

        this.setState({
          socials: filtered
        })
      });
  }

  pullSocials = () => {
    //   Pull numSocials from the database 
    API.getSocials()
      .then( (allSocials) => {
        //   Filter returned Socials based off what user has already seen
        this.filterSocials(allSocials);
      })

  }

  dislikeSocial = () => {
    // Add Social to user dislikes
    API.putUserSocialDislike(this.state.user.email, this.state.currSocial);

  }

  likeSocial = () => {
    // Add Social to user likes
    API.putUserSocialLike(this.state.user.email, this.state.currSocial);

  }

  componentDidMount() {
    // Pull socials from database that user has not seen
    this.pullSocials();
    documentReady();
  }

  render() {

    return (
      <div>
        {/* Main card container */}
        <div className="stage">
          <div className="title">Events Near You &nbsp;&nbsp;<i class="fas fa-street-view"></i> </div>
          <div id="stacked-cards-block" className="stackedcards stackedcards--animatable init">
            <div className="stackedcards-container">
              {/* Render filtered social cards here */}
        
              {
                this.state.socials.map(social => (
                  <div className="card">
                    <Link to={`social/${social._id}`}>
                  <div className="card-content">
                    <div className="card-image"><img src={social.img} width="100%" height="100%" /></div>
                    <div className="card-titles">
                      <h4 className="flow-text break-word">{social.title}</h4>
                      <h5 className="flow-text break-word"><i class="fas fa-calendar-week text-secondary"></i>&nbsp;&nbsp;{social.date}</h5>
                    </div>
                  </div>
                </Link>
                  <div className="card-footer">
                      <Container>
                        <Row className="mb-4 mt-3">
                        <div> <i className="fas fa-user-circle fa-lg text-info"></i> &nbsp; <span className="text-muted"> {social.authorName} </span> </div>
                        </Row>
                        <Row className="mb-4">
                        <div> <i className="fas fa-thumbtack fa-lg text-danger"></i> &nbsp; <span className="text-muted"> {social.location} </span> </div>
                        </Row>
                      </Container>
                  </div>
                </div>
                ))
              }

              {/* If events is empty, show empty message  */}
            </div>
            <div className="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png" width="auto" height="auto" /></div>
            <div className="stackedcards--animatable stackedcards-overlay right"><img src="https://image.ibb.co/dCuESn/Path_3x.png" width="auto" height="auto" /></div>
            <div className="stackedcards--animatable stackedcards-overlay left"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="auto" height="auto" /></div>
          </div>
          <div className="global-actions">
            <div className="left-action" ><div onClick={() => this.dislikeSocial()} className="push-dislike-action"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="26" height="26" /></div></div>
            <div className="top-action" ><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png" width="18" height="16" /></div>
            <div className="right-action" ><div onClick={() => this.likeSocial()} className="push-like-action"><img src="https://image.ibb.co/dCuESn/Path_3x.png" width="30" height="28" /></div></div>
          </div>
        </div>
        <h2 className="final-state hidden">There are no more events in your area. <br/> Check again later!</h2>

      </div>
    );
  }
}

export default FindSocials;
