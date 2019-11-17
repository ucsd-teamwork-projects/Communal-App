import axios from "axios";

export default {
  // Gets all socials
  getSocials: function(populateFields) {
    return axios.get("/api/socials", 
    {
      fields: populateFields.join(" ")
    });
  },
  // Get social by ID
  getSocialById: function(socialId, populateFields) {
    return axios.get(`/api/socials/:${socialId}`, 
    {
      fields: populateFields.join(" ")
    });
  },
  // Post comment to Social
  postCommentToSocial: function(socialId, commentObj) {
    return axios.get(`/api/socials/:${socialId}/comment`, commentObj);
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
