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
};

module.exports.edit = (req, res, next) => {
    const { id } = req.params;

    Education.findById(id)
        .then((education) => {
            res.render('education/edit', { education });
        })
        .catch(next);
};

module.exports.doEdit = (req, res, next) => {
    const { id } = req.params;

    req.body.tech_stack = req.body.tech_stack.split(',')
    req.body.responsibilities = req.body.responsibilities.split(',')

    Education.findByIdAndUpdate(id, req.body, { new: true })
        .then(education => {
            console.log(education)
            res.redirect(`/education/${education._id}`);
        })
        .catch(next)
};

module.exports.delete = (req, res, next) => {
    const { id } = req.params;

    Education.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/education');
        })
        .catch(next)
}

module.exports.create = (req, res, next) => {
    res.render('education/create');
}

module.exports.doCreate = (req, res, next) => {
    req.body.tech_stack = req.body.tech_stack.split(',')
    req.body.responsibilities = req.body.responsibilities.split(',')

    Education.create(req.body)
        .then((education) => {
            res.redirect(`/education/${education._id}`);
        })
        .catch(next);
}