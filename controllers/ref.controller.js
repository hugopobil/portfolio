const Reference = require('../models/References.model');

module.exports.list = (req, res, next) => {
    Reference.find()
        .sort({ name: 1 })
        .then((references) => {
            res.render('references', { references });
        })
        .catch((err) => next(err));
}