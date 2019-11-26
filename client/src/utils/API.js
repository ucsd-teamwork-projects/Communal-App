import axios from "axios";

export default {
  // finds User by email
  getUser: function (userEmail) {
    return axios.get(`/api/user/${userEmail}`);
  },
  postNewUser: function (name, email, image) {
    return axios.post(`/api/user/`, {
      name,
      email,
      image
    })
  },
  getAllSocials: function () {
    return axios.get("/api/socials/");
  },
  getSocials: function () {
    return axios.get("/api/socials");
  },
  // Get social by ID
  getSocialById: function (socialId) {
    return axios.get(`/api/socials/${socialId}`);
  },
  // Post comment to Social
  postCommentToSocial: function (socialId, commentObj) {
    return axios.put(`/api/socials/${socialId}/comment`, commentObj);
  },
  // Add social like to user
  putUserSocialLike: function (userEmail, socialId) {
    return axios.put(`/api/user/${userEmail}/likes`, {
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
      data: {
        id: socialId
      }
    });

  },
  // Add Social to user going
  putUserSocialGoing: function (userEmail, socialId) {
    return axios.put(`/api/user/${userEmail}/going`, {
      id: socialId
    });

  },
  // Add user to Social going 
  putSocialUserGoing: function (userId, socialId) {
    return axios.put(`/api/socials/${socialId}/going`, {
      userId: userId
    });

  },
  // Remove Social to user going
  pullUserSocialGoing: function (userEmail, socialId) {
    return axios.delete(`/api/user/${userEmail}/going`, {
      data: {
        id: socialId
      }
    });

  },
  // Remove user from Social going 
  pullSocialUserGoing: function (userId, socialId) {
    return axios.delete(`/api/socials/${socialId}/going`, {
      data: {
        userId: userId
      }
    });
  },
  // Create a new Social
  createSocial: function(newSocial) {
    return axios.post(`/api/socials`, newSocial);
  },
  // Create a new Communal
  createNewCommunal: function (title, description, members) {
    return axios.post(`/api/communal`, {
      title,
      description,
      members
    })
  },
  // Delete a Social
  deleteSocial: function(socialId) {
    return axios.delete(`/api/socials/${socialId}`);
  } 
};