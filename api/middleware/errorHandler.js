const { ValidationError } = require('yup');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('http-status-codes').StatusCodes;
const ApiError = require('../errors/ApiError');

const sendJsonApiError = (res, statusCode, title, description) => {
  res.status(statusCode).json({
    code: statusCode,
    title,
    description,
  });
};

const errorHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars
  next,
) => {
  if (err instanceof ValidationError) {
    const validationErr = err;
    sendJsonApiError(
      res,
      BAD_REQUEST,
      validationErr.type,
      validationErr.message,
    );
    return;
  }

  if (err instanceof ApiError) {
    const apiError = err;
    sendJsonApiError(
      res,
      apiError.statusCode,
      apiError.title,
      apiError.message,
    );
    return;
  }

  if (err instanceof SyntaxError) {
    sendJsonApiError(
      res,
      BAD_REQUEST,
      err.name,
      err.message,
    );
    return;
  }

  // eslint-disable-next-line no-console
  console.log(err);

  sendJsonApiError(
    res,
    INTERNAL_SERVER_ERROR,
    `${err.name}`,
    `Debug: ${err.message}. \n ${err.stack}`,
  );
};

module.exports = errorHandler;
