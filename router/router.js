const router = require("express").Router();
const educationController = require("../controllers/education.controller");
const experienceController = require("../controllers/experience.controller");
const Experience = require('../models/Experience.model');
const contactController = require("../controllers/contact.controller");
const authController = require("../controllers/auth.controller");
const projectController = require("../controllers/project.controller");
const referenceController = require("../controllers/ref.controller");
const e = require("express");


// home route
router.get("/", (req, res, next) => {
    // we need experiences images for the slideshow at the home page
    Experience.find()
        .then((experiences) => {res.render('home', { experiences });})
        .catch((err) => next(err))
});

// education routes
router.get("/education", educationController.list);
router.get("/education/:id", educationController.detail);
router.get("/education/:id/edit", educationController.edit);
router.post("/education/:id/edit", educationController.doEdit);

// experience routes
router.get("/professional_experience", experienceController.list);
router.get("/professional_experience/:id", experienceController.detail);
router.get("/professional_experience/:id/edit", experienceController.edit);
router.post("/professional_experience/:id/edit", experienceController.doEdit);

// projects routes
router.get("/projects", projectController.list);
router.get("/projects/:tech", projectController.filter);
router.get("/projects/:id/edit", projectController.edit);
router.post("/projects/:id/edit", projectController.doEdit);

// references routes
router.get("/references", referenceController.list);

// contact routes
router.get("/contact", contactController.render);
router.post("/send", contactController.send);

// login admin routes
router.get("/login", authController.login)
router.post("/login", authController.doLogin)
router.get("/logout", authController.logout);

module.exports = router;