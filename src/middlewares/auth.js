// middlewares/authenticationMiddleware.js

function authenticateUser(req, res, next) {
  // Your authentication logic here
  if (/* user is authenticated */) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = { authenticateUser };
