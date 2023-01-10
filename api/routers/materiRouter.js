const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { OK } = require('http-status-codes').StatusCodes;
const MateriService = require('../services/materiService');

const materiRouter = Router();
const materiService = new MateriService();

materiRouter.get(
  '/:idUmkm',
  asyncHandler(async (req, res) => {
    const { idUmkm } = req.params;
    const materi = await materiService.getSubMateriByUmkmId({umkmId : idUmkm});
    res.status(OK).send(materi);
  }),
);




module.exports = materiRouter;
