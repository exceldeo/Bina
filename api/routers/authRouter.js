const { Router } = require('express');
const expressAsyncHandler = require('express-async-handler');
const { OK } = require('http-status-codes').StatusCodes;
const passport = require('passport');
const { object, string } = require('yup');
const { LoginInternalError, LoginWrongCredentialsError } = require('../errors/ResourceError');
const AuthService = require('../services/authService');
const UserService = require('../services/userService');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const authRouter = Router();

const authService = new AuthService();
const userService = new UserService();

authRouter.post('/login', async (req, res, next) => {
  passport.authenticate(
    'login',
    { session: true },
    async (err, user, info) => {
      try {
        if (err) {
          LoginInternalError();
        }

        if (!user) {
          LoginWrongCredentialsError(info.message);
        }

        const data = await authService.createAuthUserData(user);
        res.setHeader('authorization', `bearer ${data.token}`);
        return res.status(OK).send(data);
      } catch (error) {
        return next(error);
      }
    },
  )(req, res, next);
});

authRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      name: string().required(),
      email: string().required().email(),
      password: string().required().min(4),
      phoneNumber: string().required(),
    });
    const body = bodySchema.validateSync(req.body);
    const user = await authService.registerNewUser(body);

    res.status(OK).send(user);
  }),
);

authRouter.get(
  '/checkData',
  expressAsyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_JWT, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if(user.user.role == "UMKM"){
              const mentor = await userService.getUmkmMentoringByIdUmkm(user.user.id);
              // console.log(mentor.name);
              user.user.idMentor = mentor.id;
              user.user.namaMentor = mentor.name;
            }
            res.status(OK).send(user);
        });
    } else {
        res.sendStatus(401);
    }
  }),
);

module.exports = authRouter;
