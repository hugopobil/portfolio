const Education = require('../models/Education.model');

module.exports.list = (req, res, next) => {
    Education.find()
        .sort({ startDate: 1 })
        .then((educations) => {
            res.render('education', { educations });
        })
        .catch((err) => next(err));
};

module.exports.detail = (req, res, next) => {
    const { id } = req.params;

    Education.findById(id)
        .then((education) => {
            res.render('education/detail', { education });
        })
        .catch((err) => next(err));
}

module.exports.edit = (req, res, next) => {
    const { id } = req.params;

    Education.findById(id)
        .then((education) => {
            res.render('education/edit', { education });
        })
        .catch(next);
}

module.exports.doEdit = (req, res, next) => {
    const { id } = req.params;

    console.log("req.body", req.body)

    req.body.tech_stack = req.body.tech_stack.split(',')
    req.body.responsabilities = req.body.responsabilities.split(',')

    Education.findByIdAndUpdate(id, req.body, { new: true })
        .then(education => {
            console.log(education)
            res.redirect(`/education/${education._id}`);
        })
        .catch(next)
}