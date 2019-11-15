import React, { Component } from "react";

import API from "../utils/API";
import { Link } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";

const { user } = useAuth0();

class FindSocials extends Component {
  state = {
    socials: []
  };

  componentDidMount() {
    // Pull socials from database that user has not seen
    this.pullSocials();
  }

  pullSocials = () => {
    //   Pull numSocials from the database 
    API.getSocials()
      .then(function (allSocials) {
        //   Filter returned Socials based off what user has already seen
        filterSocials(allSocials);
      })

  }

  filterSocials = socials => {
    // Pull user's likes and dislikes
    API.getUserSocialPref(user.email)
      .then(function (pref) {
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

  dislikeSocial = socialId => {
    // Add Social to user dislikes
    API.postUserSocialDislike(socialId);

  }

  likeSocial = socialId => {
    // Add Social to user likes
    API.postUserSocialLike(socialId);
  }


  render() {
    return (
      <div>
        {/* Main card container */}
        <div class="stage">
          <div class="title">What Kind of Traveler Are You?</div>
          <div id="stacked-cards-block" class="stackedcards stackedcards--animatable init">
            <div class="stackedcards-container">
              {/* Render filtered social cards here */}
              {
                this.state.socials.map((card) => {
                  <div className="card">
                    <div className="card-content">
                      <div className="card-image"><img src="" width="100%" height="100%" /></div>
                      <div className="card-titles">
                        <h1>Title</h1>
                        <h3>Subtitle</h3>
                      </div>
                    </div>
                    <div class="card-footer">


                    </div>
                  </div>
                })
              }

              {/* If events is empty, show empty message  */}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default FindSocials;
