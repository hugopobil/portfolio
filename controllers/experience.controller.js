const Experience = require('../models/Experience.model');

module.exports.list = (req, res, next) => {
    Experience.find()
        .then((experiences) => {
            console.log(experiences)
            res.render('experience', { experiences });
        })
        .catch((err) => next(err));
};

module.exports.detail = (req, res, next) => {
    const { id } = req.params;
    Experience.findById(id)
        .then((experience) => {
            res.render('experience/detail', { experience });
        })
        .catch((err) => next(err));
}