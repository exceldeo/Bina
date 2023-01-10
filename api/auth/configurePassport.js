const passportJWT = require('passport-jwt');
const passportLocal = require('passport-local');
const passport = require('passport');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const db = require('../models');
const { Op } = require("sequelize");

dotenv.config();
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = passportLocal.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  'login',
  new LocalStrategy({
    usernameField: 'email',
    password: 'password',
  }, async (email, password, done) => {
    try {
      const user = await db.sequelize.models.User.findOne({
        where: {
          [Op.or]: [
          {
            email
          },
          {
              phoneNumber: email
          },
        ]
          ,
        },
      });

      if (!user) {
        return done(null, false, {
          message: 'Email or password is not found',
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password,
      );

      if (!isPasswordCorrect) {
        return done(null, false, {
          message: 'Wrong password',
        });
      }
      return done(null, user, {
        message: 'Log in successfull',
      });
    } catch (error) {
      return done(error);
    }
  }),
);

passport.use(
  new JWTStrategy({
    secretOrKey: process.env.SECRET_JWT,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  }, async (payload, done) => {
    try {
      return done(null, payload.user);
    } catch (error) {
      return done(error);
    }
  }),
);
