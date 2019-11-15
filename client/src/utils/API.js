import axios from "axios";
import { useAuth0 } from "../react-auth0-spa";

const { user } = useAuth0();


export default {
  // Gets all socials
  getSocials: function() {
    return axios.get("/api/socials");
  },
  // Gets user Social likes & dislikes
  getUserSocialPref: function() {
    return axios.get(`/api/${user.email}/socialPref`);

  },
  postUserSocialLike: function(socialId) {
    return axios.post(`/api/${user.email}/likes`, {
      id: socialId
    });

  },
  postUserSocialDislike: function(socialId) {
    return axios.post(`/api/${user.email}/dislikes`, {
      id: socialId
    });

  }
};
