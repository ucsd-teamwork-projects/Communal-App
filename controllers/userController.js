const userDb = require("../models/User");

module.exports = {
    create: function(req, res) {
        userDb
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    find: function(req, res) {
        userDb
            .findOne(
                {
                    email: req.params.userEmail
                }
            )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        
        userDb
        .findOneAndUpdate({ email: req.params.userEmail }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    pushLikes: function(req, res) {

        userDb
            .findOneAndUpdate({ email: req.params.userEmail }, 
            {
                $push: {
                    likes: req.body.id
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    pushDislikes: function(req, res) {
        userDb
            .findOneAndUpdate({ email: req.params.userEmail }, 
            {
                $push: {
                    dislikes: req.body.id
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    pushGoing: function(req, res) {
        userDb
            .findOneAndUpdate({ email: req.params.userEmail }, 
            {
                $push: {
                    going: req.body.id
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
    delete: function(req, res) {
        userDb
            .findOne({ email: req.params.userEmail })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    pullLikes: function(req, res) {
        userDb
            .findOneAndUpdate({ email: req.params.userEmail }, 
            {
                $pull: {
                    likes: req.body.id
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    pullDislikes: function(req, res) {
        userDb
            .findOneAndUpdate({ email: req.params.userEmail }, 
            {
                $pull: {
                    dislikes: req.body.id
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }, 
    pullGoing: function(req, res) {
        userDb
            .findOneAndUpdate({ email: req.params.userEmail }, 
            {
                $pull: {
                    going: req.body.id
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      }
    
}