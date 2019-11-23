import axios from "axios";

export default {
  // finds User by email
  getUser: function (userEmail) {
    return axios.get(`/api/user/${userEmail}`);
  },
  postNewUser: function (name, email) {
    return axios.post(`/api/user/`, { name, email });
  },
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

  putUserSocialLike: function (userEmail, socialId) {
    return axios.post(`/api/user/${userEmail}/likes`, {
      id: socialId
    });

  },
  putUserSocialDislike: function (userEmail, socialId) {
    return axios.put(`/api/user/${userEmail}/dislikes`, {
      id: socialId
    });

  },
  pullUserSocialLike: function (userEmail, socialId) {
    return axios.delete(`/api/user/${userEmail}/likes`, {
      id: socialId
    });

  },
  putUserSocialGoing: function (userEmail, socialId) {
    return axios.put(`/api/user/${userEmail}/going`, {
      id: socialId
    });

  },
  putSocialUserGoing: function (userEmail, socialId) {
    return axios.put(`/api/socials/${socialId}/going`, {
      email: userEmail
    });

  },
  pullUserSocialGoing: function (userEmail, socialId) {
    return axios.delete(`/api/user/${userEmail}/going`, {
      id: socialId
    });

  },
  pullSocialUserGoing: function (userEmail, socialId) {
    return axios.delete(`/api/socials/${socialId}/going`, {
      email: userEmail
    });
  },
  createNewCommunal: function (title, description, members) {
    return axios.post(`/api/communal`, {
      title,
      description,
      members
    })
  }
};