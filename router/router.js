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
router.get("/education/create", educationController.create);
router.post("/education/create", educationController.doCreate);
router.get("/education/:id", educationController.detail);
router.get("/education/:id/edit", educationController.edit);
router.post("/education/:id/edit", educationController.doEdit);
router.get("/education/:id/delete", educationController.delete);


// experience routes
router.get("/professional_experience", experienceController.list);
router.get("/professional_experience/create", experienceController.create);
router.post("/professional_experience/create", experienceController.doCreate);
router.get("/professional_experience/:id", experienceController.detail);
router.get("/professional_experience/:id/edit", experienceController.edit);
router.post("/professional_experience/:id/edit", experienceController.doEdit);
router.get("/professional_experience/:id/delete", experienceController.delete);


// projects routes
router.get("/projects", projectController.list);
router.get("/projects/create", projectController.create);
router.post("/projects/create", projectController.doCreate);
router.get("/projects/:tech", projectController.filter);
router.get("/projects/:id/edit", projectController.edit);
router.post("/projects/:id/edit", projectController.doEdit);
router.get("/projects/:id/delete", projectController.delete);

// references routes
router.get("/references", referenceController.list);

// contact routes
router.get("/contact", contactController.render);
router.post("/sendmail", contactController.send);

// login admin routes
router.get("/login", authController.login)
router.post("/login", authController.doLogin)
router.get("/logout", authController.logout);

module.exports = router;