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

// module.exports.detail = (req, res, next) => {
//     const { id } = req.params;
//     Experience.findById(id)
//         .then((experience) => {
//             res.render('experience/detail', { experience });
//         })
//         .catch((err) => next(err));
// }

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

    Project.findByIdAndUpdate(id, req.body, { new: true })
        .then((project) => {
            res.redirect(`/projects/${project._id}`);
        })
        .catch((err) => next(err));
}