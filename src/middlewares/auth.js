// middlewares/authenticationMiddleware.js

function authenticateUser(req, res, next) {
  // Your authentication logic here
  if (user) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}


const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");
const User = require("../models/user");
const ActiveSession = require("../models/activeSession");
const reqAuth = require("../config/safeRoutes").reqAuth;
const { smtpConf } = require("../config/config");
// route /admin/users/

router.post("/all", reqAuth, function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.json({ success: false });
    }
    users = users.map(function (item) {
      const x = item;
      x.password = undefined;
      x.__v = undefined;
      return x;
    });
    res.json({ success: true, users: users });
  });
});

router.post("/edit", reqAuth, function (req, res) {
  const { userID, name, email } = req.body;

  User.find({ _id: userID }).then((user) => {
    if (user.length == 1) {
      const query = { _id: user[0]._id };
      const newvalues = { $set: { name: name, email: email } };
      User.updateOne(query, newvalues, function (err, cb) {
        if (err) {
          // eslint-disable-next-line max-len
          res.json({
            success: false,
            msg: "There was an error. Please contract the administator",
          });
        }
        res.json({ success: true });
      });
    } else {
      res.json({ success: false });
    }
  });
});

router.post("/check/resetpass/:id", (req, res) => {
  const userID = req.params.id;
  User.find({ _id: userID }).then((user) => {
    if (user.length == 1 && user[0].resetPass == true) {
      res.json({ success: true }); // reset password was made for this user
    } else {
      res.json({ success: false });
    }
  });
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = { authenticateUser };

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email}, (err, user) => {
    if (err) throw err;

    if (!user) {
      return res.json({success: false, msg: 'Wrong credentials'});
    }

    if (!user.accountConfirmation) {
      return res.json({success: false, msg: 'Account is not confirmed'});
    }

    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 86400, // 1 week
        });
        // Don't include the password in the returned user object
        const query = {userId: user._id, token: 'JWT ' + token};
        ActiveSession.create(query, function(err, cd) {
          user.password = null;
          user.__v = null;
          return res.json({
            success: true,
            token: 'JWT ' + token,
            user,
          });
        });
      } else {
        return res.json({success: false, msg: 'Wrong credentials'});
      }
    });
  });
});

router.post('/checkSession', reqAuth, function(req, res) {
  res.json({success: true});
});

router.post('/logout', reqAuth, function(req, res) {
  const token = req.body.token;
  ActiveSession.deleteMany({token: token}, function(err, item) {
    if (err) {
      res.json({success: false});
    }
    res.json({success: true});
  });
});


module.exports = router;