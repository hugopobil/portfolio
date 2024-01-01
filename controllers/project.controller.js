const Project = require('../models/Project.model');

module.exports.list = (req, res, next) => {
    Project.find()
        .sort({ startDate: -1 })
        .then((projects) => {
            console.log(projects)
            res.render('projects', { projects });
        })
        .catch((err) => next(err));
};

module.exports.filter = (req, res, next) => {
    const { tech } = req.params;
    Project.find({ tech_stack: tech })
        .then((projects) => {
            res.render('projects', { projects });
        })
        .catch((err) => next(err));
}

module.exports.edit = (req, res, next) => {
    const { id } = req.params;
    Project.findById(id)
        .then((project) => {
            res.render('projects/edit', { project });
        })
        .catch((err) => next(err));
}

module.exports.doEdit = (req, res, next) => {
    const { id } = req.params;

    req.body.tech_stack = req.body.tech_stack.split(',')

    Project.findByIdAndUpdate(id, req.body, { new: true })
        .then((project) => {
            res.redirect(`/projects`);
        })
        .catch((err) => next(err));
}