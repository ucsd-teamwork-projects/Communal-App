import axios from "axios";

export default {
  // Gets all socials
  getSocials: function() {
    return axios.get("/api/socials");
  },
  // Gets user Social likes & dislikes
  getUserSocialPref: function(userEmail) {
    return axios.get(`/api/user/${userEmail}/socialPref`);

  },
  putUserSocialLike: function(userEmail, socialId) {
    return axios.put(`/api/user/${userEmail}/likes`, {
      id: socialId
    });

  },
  putUserSocialDislike: function(userEmail, socialId) {
    return axios.put(`/api/user/${userEmail}/dislikes`, {
      id: socialId
    });

  },
  putUserSocialGoing: function(userEmail, socialId) {
    return axios.put(`/api/user/${userEmail}/going`, {
      id: socialId
    });

  },
  putSocialUserGoing: function(userEmail, socialId) {
    return axios.put(`/api/socials/${socialId}/going`, {
      email: userEmail
    });

  }
};
