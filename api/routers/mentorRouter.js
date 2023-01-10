const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { OK } = require('http-status-codes').StatusCodes;
const UserService = require('../services/userService');

const mentorRouter = Router();
const userService = new UserService();

mentorRouter.get(
  '/:idMentor',
  asyncHandler(async (req, res) => {
    const { idMentor } = req.params;
    const user = await userService.getMentor(idMentor);
    res.status(OK).send(user);
  }),
);

mentorRouter.get(
  '/listumkm/:idMentor',
  asyncHandler(async (req, res) => {
    const { idMentor } = req.params;
    const user = await userService.getUmkmMentoringByIdMentor(idMentor);
    res.status(OK).send(user);
  }),
);

mentorRouter.get(
  '/detailumkm/:idUmkm',
  asyncHandler(async (req, res) => {
    const { idUmkm } = req.params;
    const user = await userService.getDetailUmkm(idUmkm);
    res.status(OK).send(user);
  }),
);

module.exports = mentorRouter;
