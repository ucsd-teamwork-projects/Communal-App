import React, { Component } from "react";

import API from "../utils/API";
import { Link } from "react-router-dom";

class FindSocials extends Component {
  state = {
    socials: []
  };

  filterSocials = socials => {
    // Pull user's likes and dislikes
    API.getUserSocialPref()
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

 

  dislikeSocial = socialId => {
    // Add Social to user dislikes
    API.postUserSocialDislike(socialId);

  }

  likeSocial = socialId => {
    // Add Social to user likes
    API.postUserSocialLike(socialId);
  }

  componentDidMount() {
    // Pull socials from database that user has not seen
    this.pullSocials();
  }

  render() {
    return (
      <div>
        {/* Main card container */}
        <div className="stage">
          <div className="title">What Kind of Traveler Are You?</div>
          <div id="stacked-cards-block" className="stackedcards stackedcards--animatable init">
            <div className="stackedcards-container">
              {/* Render filtered social cards here */}
              
              {/* {
                this.state.socials.map((card) => {
`                  <div className="card">
                    <div className="card-content">
                      <div className="card-image"><img src="" width="100%" height="100%" /></div>
                      <div className="card-titles">
                        <h1>Title</h1>
                        <h3>Subtitle</h3>
                      </div>
                    </div>
                    <div className="card-footer">


                    </div>
                  </div>`
                })
              } */}

              {/* If events is empty, show empty message  */}
            </div>
            <div className="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png" width="auto" height="auto" /></div>
            <div className="stackedcards--animatable stackedcards-overlay right"><img src="https://image.ibb.co/dCuESn/Path_3x.png" width="auto" height="auto" /></div>
            <div className="stackedcards--animatable stackedcards-overlay left"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="auto" height="auto" /></div>
          </div>
          <div className="global-actions">
            <div className="left-action"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="26" height="26" /></div>
            <div className="top-action"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png" width="18" height="16" /></div>
            <div className="right-action"><img src="https://image.ibb.co/dCuESn/Path_3x.png" width="30" height="28" /></div>
          </div>
        </div>
        <h2 class="final-state hidden"><h2>Got it! We received your preferences! <br/> To submit again, press F5.</h2></h2>
      </div>
    );
  }
}

export default FindSocials;
