import axios from "axios";

export default {
  // Retrieve user info by email
  getUser: function (userEmail) {
    return axios.get(`/api/user/${userEmail}`);
  },
  // Gets all socials
  getSocials: function (populateFields) {
    return axios.get("/api/socials", {
      fields: populateFields.join(" ")
    });
  },
  // Get social by ID
  getSocialById: function (socialId, populateFields) {
    return axios.get(`/api/socials/:${socialId}`, {
      fields: populateFields.join(" ")
    });
  },
  // Post comment to Social
  postCommentToSocial: function (socialId, commentObj) {
    return axios.get(`/api/socials/:${socialId}/comment`, commentObj);
  },
  // Add social like to user
  putUserSocialLike: function (userEmail, socialId) {
    return axios.post(`/api/user/${userEmail}/likes`, {
      id: socialId
    });
  },
  // Add social dislike to user
  putUserSocialDislike: function (userEmail, socialId) {
    return axios.put(`/api/user/${userEmail}/dislikes`, {
      id: socialId
    });

  },
  // Remove social like to user
  pullUserSocialLike: function (userEmail, socialId) {
    return axios.delete(`/api/user/${userEmail}/likes`, {
      id: socialId
    });

  },
  // Add Social to user going
  putUserSocialGoing: function (userEmail, socialId) {
    return axios.put(`/api/user/${userEmail}/going`, {
      id: socialId
    });

  },
  // Add user to Social going 
  putSocialUserGoing: function (userEmail, socialId) {
    return axios.put(`/api/socials/${socialId}/going`, {
      email: userEmail
    });

  },
  // Remove Social to user going
  pullUserSocialGoing: function (userEmail, socialId) {
    return axios.delete(`/api/user/${userEmail}/going`, {
      id: socialId
    });

  },
  // Remove user to Social going 
  pullSocialUserGoing: function (userEmail, socialId) {
    return axios.delete(`/api/socials/${socialId}/going`, {
      email: userEmail
    });

  },
  createSocial: function(newSocial) {
    return axios.post(`/api/socials`, newSocial);
  }
};