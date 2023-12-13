const router = require("express").Router();
const educationController = require("../controllers/education.controller");
const experienceController = require("../controllers/experience.controller");
const Experience = require('../models/Experience.model');
const contactController = require("../controllers/contact.controller");

router.get("/", (req, res, next) => {
    Experience.find()
        .then((experiences) => {
            console.log(experiences)
            res.render('home', { experiences });
        })
        .catch((err) => next(err))

});

router.get("/education", educationController.list);
router.get("/professional_experience", experienceController.list);
router.get("/professional_experience/:id", experienceController.detail);
router.get("/education/:id", educationController.detail);

router.get("/contact", contactController.render);

module.exports = router;