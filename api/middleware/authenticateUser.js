const jwt = require('jsonwebtoken');
const passport = require('passport');
const dotenv = require('dotenv');
const UserService = require('../services/userService');

dotenv.config();

const authenticateUser = async (req, res, next) => passport.authenticate(
  'jwt',
  { session: false },
  async (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.user = null;
      return next();
    }

    const userService = new UserService();
    // Renew the user record.
    const userFromDb = await userService.getUserById(user.id);
    if (!userFromDb) {
      req.user = null;
      return next();
    }

    const accessToken = req.headers.authorization.split(' ')[1];
    if (accessToken === undefined || userFromDb.accessToken !== accessToken) {
      req.user = null;
      return next();
    }

    req.user = userFromDb;
    return next();
  },
)(req, res, next);

const authenticateSocketUser = async (socket, next) => {
  try {
    const { token } = socket.handshake.auth;
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    // eslint-disable-next-line no-param-reassign
    socket.user = payload?.user;
    next();
  } catch (error) {
    // raise error
  }
};

module.exports = {
  authenticateSocketUser,
  authenticateUser,
};
