const mongoose = require('mongoose');
const User = require('../models/User.model');
const passport = require("passport");
const { log } = require('console');


module.exports.activate = (req, res, next) => {
  const { token } = req.params;
  User.findOneAndUpdate({ activationToken: token }, { isActive: true }, { new: true })
    .then((dbUser) => {
      res.render('auth/login', { username: dbUser.username });
    })
    .catch((error) => next(error));
};

module.exports.login = (req, res, next) => {
  res.render('auth/login', { errors: false });
};

module.exports.doLogin = (req, res, next) => {
  const { username, password } = req.body;

  const renderWithErrors = (msg) => {
    res.render('auth/login', {
        username,
      errors: {
        msg: msg || 'Username or password are incorrect',
      },
    });
  };

  if (!username || !password) {
    renderWithErrors();
  } else {
    User.findOne({ username })
      .then((dbUser) => {
        if (!dbUser) {
          renderWithErrors();
        } else {
          dbUser
            .checkPassword(password)
            .then((match) => {
              if (!match) {
                renderWithErrors();
              } else {
                if (!dbUser.isActive) {
                  renderWithErrors('User not active');
                } else {
                  req.session.currentUser = dbUser;
                  log(req.session.currentUser);
                  res.redirect('/');
                }
              }
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  }
};

// module.exports.doLoginGoogle = (req, res, next) => {
//   passport.authenticate('google-auth', (error, user, validations) => {
//     if (error) {
//       next(error);
//     } else if (!user) {
//       res.status(400).render('auth/login', { user: req.body, error: validations });
//     } else {
//       req.login(user, loginErr => {
//         if (loginErr) next(loginErr)
//         else {
//           req.session.currentUser = user;
//           // console.log(req.user);
//           // console.log(req.session.passport.user);
//           res.redirect('/profile');
//         }
//       })
//     }
//   })(req, res, next)
// }

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/');
};