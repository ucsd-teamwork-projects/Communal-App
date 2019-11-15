import axios from "axios";

export default {
  // Gets all socials
  getSocials: function() {
    return axios.get("/api/socials");
  },
  // Gets user Social likes & dislikes
  getUserSocialPref: function(userId) {
    return axios.get(`/api/${userId}/socialPref`);

  },
  postUserSocialLike: function(socialId) {
    return axios.post(`/api/${userId}/likes`, {
      id: socialId
    });

  },
  postUserSocialDislike: function(socialId) {
    return axios.post(`/api/${userId}/dislikes`, {
      id: socialId
    });

  }
};
