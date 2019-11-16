const socialDb = require("../models/Social");

module.exports = {
  findAll: function(req, res) {
    socialDb
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function(req, res) {
    socialDb
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    socialDb
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    socialDb
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  pushGoing: function(req, res) {
    socialDb
            .findById({ _id: req.params.id }, 
            {
                $push: {
                    going: req.body.email
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    socialDb
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};