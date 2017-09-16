var mongoose = require('mongoose');
var User = mongoose.model('user');
var Player = mongoose.model('player');
var bcrypt = require('bcrypt');
var session = require('express-session');


//export our controller methods
module.exports = (() => {
  const handleError = (err) => {
    console.error(err);
  };
  return {
    imageForUser: (req, res) => {
 
    },
    newUser: (req, res) => {
      const regInfo = req.body.userForm;
      if(!regInfo) {
        res.stats(404).send({
          Message: 'No Form, stop hacking'
        });
      }
      User.findOne({
        email: regInfo.email
      }, (err, userFound) => {
        if (err) {
          res.status(404).send({
            Message: err
          });
        }
        if (!regInfo.email || !regInfo.password) {
          res.status(404).send({
            Message: 'Invalid Password'
          });
        } else if (userFound) {
          res.status(404).send({
            Message: 'Invalid E-mail'
          });
        } else {
          const userToSave = new User(regInfo);
          const saltrounds = 9;
          bcrypt.hash(userToSave.password, saltrounds, (err, hash) => {
            if (err) {
              console.error(err);
            } else {
              userToSave.password = hash;
              userToSave.save((err) => {
                if (err) {
                  res.status(404).send({
                    Message: 'Server Error'
                  });
                } else {
                  var sess = req.session;
                  sess.user = userToSave;
                  sess.user.players = [];
                  res.json({
                    user: userToSave
                  });
                }
              });

            }
          });
        }

      });
    },
    loginUser: (req, res) => {
      let loginInfo = {};
        if (!req.body.loginForm) {
          loginInfo = {
            email: req.body.email,
            password: req.body.password
          };
        } else {
           loginInfo = req.body.loginForm;
        }
        User.findOne({
          email: loginInfo.email
        }, (err, userFound) => {
          if (!loginInfo.email || !loginInfo.password) {
            res.json({
              error: "field_missing"
            });
          } else if (userFound) {
            bcrypt.compare(loginInfo.password, userFound.password, (err, bcryptRes) => {
              if (bcryptRes === true) {
                var sess = req.session;
                sess.user = userFound;
                sess.user.players = [];
                res.json({
                  user: userFound
                });
              } else {
                res.status(204).send({
                  Message: 'User Not Found'
                });
              }
            });
          } else {
            res.status(204).send({
              Message: 'User Not Found'
            });
            // res.json({error: "user_not_found"});
          }
        });
    },
    getUser: (req, res) => {
      var sess = req.session;
      if (!sess.user) {
        res.status(204).send({
          Message: 'No one is logged in'
        });
      } else { 
        res.json(sess.user);
      }
    },
    logoutUser: (req, res) => {
      var sess = req.session;
      if (sess.user) {
        sess.destroy();
        res.json({
          loggedOut: true
        });
      } else {
        res.json({
          loggedOut: false
        });
      }
    },
    getMyPlayers: (req, res) => {
      var currentUser = req.session.user;
      if (!currentUser) {
        res.status(404).send({
          Message: 'Not Logged In'
        });
      } else {
        Player.find({
          accountEmail: currentUser.email
        }, (err, playerArr) => {
          res.json({
            data: playerArr
          });
        });
      }
    }

  };

})();
