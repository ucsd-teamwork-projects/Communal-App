const commentDb = require("../models/Comment");

module.exports = {
    addToSocial: function(req, res) {
        const { text, author } = req.body;

        commentDb
            .create({
                text,
                author,
                socal: req.params.socialId
            })
            .then(commentDbModel => res.json(commentDbModel))
            .catch(err => res.status(422).json(err));
    },
    addToCommunal: function(req, res) {
        const { text, author } = req.body;

        commentDb
            .create({
                text,
                author,
                communal: req.params.communalId
            })
            .then(commentDbModel => res.json(commentDbModel))
            .catch(err => res.status(422).json(err));
    },
    delete: function(req, res) {
        commentDb
            .findById({
                _id: req.params.id
            })
            .then(dbModel => dbModel.remove())
            .then(commentDbModel => res.json(commentDbModel))
            .catch(err => res.status(422).json(err));
    }
}