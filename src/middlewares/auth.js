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

router.post('/forgotpassword', (req, res) => {
  const {email} = req.body;
  const errors = [];

  if (!email) {
    errors.push({msg: 'Please enter all fields'});
  }
  User.find({email: email}).then((user) => {
    if (user.length != 1) {
      errors.push({msg: 'Email Address does not exist'});
    }
    if (errors.length > 0) {
      res.json({success: false, errors: errors});
    } else {

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
