const socialDb = require("../models/Social");
const commentDb = require("../models/Comment");
const userDb = require("../models/User");
const mongoose = require("mongoose");


const pusher = require("../pusher");

module.exports = {
  findAll: function (req, res) {
    socialDb
      .find({})
      .populate("creator")
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function (req, res) {

    socialDb
      .findById(req.params.id)
      .populate("creator")
      .populate("going")
      .populate("comments")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {

    socialDb
      .create(req.body)
      .then(dbModel => {
        res.json(dbModel);
        // Trigger all listening components to retrieve new Social
        pusher.trigger(`socials`, `New Social`, dbModel);

      })
      .catch(err => res.status(422).json(err));

  },
  update: function (req, res) {
    socialDb
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  pushGoing: function (req, res) {
    socialDb
      .findOneAndUpdate({ _id: req.params.id },
        {
          $push: {
            going: req.body.userId
          }
        })
      .then(dbModel => { 
        userDb.findOne({
          _id: req.body.userId
        })
        .then(newGoingUser => {
          pusher.trigger(`add-going`, `social-${req.params.id}`, newGoingUser);
          res.json(newGoingUser)
        })
      })
      .catch(err => res.status(422).json(err));
  },
  pullGoing: function (req, res) {
    socialDb
      .findOneAndUpdate({ _id: req.params.id },
        {
          $pull: {
            going: req.body.userId
          }
        })
      .then(dbModel => 
        {
          pusher.trigger(`remove-going`, `social-${req.params.id}`, req.body.userId);
          res.json(dbModel)
        })
      .catch(err => res.status(422).json(err));
  },
  pushComment: function (req, res) {
    // create Comment
    commentDb
      .create(req.body)
      .then(newComment => {
        // Trigger all listening components to retrieve new comment
        pusher.trigger(`comment-creation`, `social-${req.params.id}`, newComment);

        // Then push new ID into Social comments
        socialDb
          .findOneAndUpdate({ _id: req.params.id },
            {
              $push: {
                comments: newComment._id
              }
            })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));

      });

  },
  pullComment: function(req, res) {
    commentDb
    .findById({
        _id: req.body.commentId
    })
    .then(dbModel => {
        // // Delete all references to said Comment in social
        const commentId = dbModel._id;
        socialDb.update(
            {
                _id: req.params.id
            },
            {
                $pull: {
                    comments: commentId,
                }
            })
            .then(() => {
                pusher.trigger(`comment-deletion`, `social-${req.params.id}`, dbModel);
                // Remove the Comment
                dbModel.remove();
            })

    })
    .then(commentDbModel => res.json(commentDbModel))
    .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    socialDb
      .findById({ _id: req.params.id })
      .then(dbModel => {
        
        // Delete all comments related to social
        commentDb.deleteMany({
          _id: dbModel.comments
        })
        .then(()=>{
       
          // // Delete all references to said Social in user likes, dislikes, going
          const socialId = dbModel._id;
          userDb.updateMany({}, {
            $pull: {
              going: socialId,
              dislikes: socialId,
              likes: socialId,
            }
          })
          .then(() => { 
            // Remove the Social
            dbModel.remove();
          })
  
        });

      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};