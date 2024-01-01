require("dotenv").config();

// require the necessary modules
const express = require("express");
const hbs = require("hbs");
const logger = require("morgan");
const nodemailer = require('nodemailer');

require("./config/db.config"); // es como si pusieramos todas las lineas del db.confgi aquí, pero somos mejores que eso.

// create the express app
const app = express();

// visualize the errors in the console
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// set up the template engine
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

// register the partials
hbs.registerPartials(__dirname + "/views/partials");

const { sessionConfig } = require("./config/session.config");
app.use(sessionConfig);
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});

// routes
const router = require("./router/router");
app.use("/", router);

// middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err);

  if (err.status === 404) {
    res.render('error', { title: err.message })
  } else {
    res.render('error');
  }
})

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running at port ${port} 🚀🚀`));