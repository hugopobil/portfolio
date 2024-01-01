const Experience = require('../models/Experience.model');

module.exports.list = (req, res, next) => {
    Experience.find()
        .sort({ startDate: -1 })
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

module.exports.edit = (req, res, next) => {
    const { id } = req.params;
    Experience.findById(id)
        .then((experience) => {
            res.render('experience/edit', { experience });
        })
        .catch((err) => next(err));
}

module.exports.doEdit = (req, res, next) => {
    const { id } = req.params;

    req.body.tech_stack = req.body.tech_stack.split(',')
    req.body.responsabilities = req.body.responsabilities.split(',')

    Experience.findByIdAndUpdate(id, req.body, { new: true })
        .then((experience) => {
            res.redirect(`/professional_experience/${experience._id}`);
        })
        .catch((err) => next(err));
}