const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { OK } = require('http-status-codes').StatusCodes;
const UserService = require('../services/userService');

const subscribeRouter = Router();
const userService = new UserService();


subscribeRouter.post(
  '/:idUser',
  asyncHandler(async (req, res) => {
    const { idUser } = req.params;
    const data = {
      authSubscribe : JSON.stringify(req.body)
    }
    const user = await userService.updateUserById({ userId:idUser , data : data });
    console.log(user)
    res.status(OK).send(user);
  }),
);

module.exports = subscribeRouter;
