import React, { Component } from "react";

import API from "../utils/API";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
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
    API.getUserSocialPref()
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

        {/* Render filtered social cards here */}
        

        {/* If events is empty, show empty message  */}



      </div>
    );
  }
}

export default FindSocials;
