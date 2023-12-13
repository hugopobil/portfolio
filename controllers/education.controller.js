const Education = require('../models/Education.model');

module.exports.list = (req, res, next) => {
    Education.find()
        .then((educations) => {
            console.log(educations)
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