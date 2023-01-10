const { Router } = require('express');
const { NOT_FOUND } = require('http-status-codes').StatusCodes;
const ApiError = require('../errors/ApiError');

const noRouterFound = Router();

const NO_ROUTER_FOUND = 'Error! Route not found';

noRouterFound.use(() => {
  throw new ApiError(NOT_FOUND, NO_ROUTER_FOUND);
});

module.exports = noRouterFound;
