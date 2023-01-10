const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { OK } = require('http-status-codes').StatusCodes;
const UserService = require('../services/userService');

const userRouter = Router();
const userService = new UserService();

userRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.status(OK).send(user);
  }),
);

module.exports = userRouter;
