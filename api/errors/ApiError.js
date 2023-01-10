/* eslint-disable no-underscore-dangle */
const { StatusCodes } = require('http-status-codes');

const DEFAULT_API_ERROR_TITLE = 'Internal Server Error.';
const DEFAULT_API_ERROR_MESSAGE = 'Something is wrong with the backend';

class ApiError extends Error {
  constructor(statusCode, title, message) {
    super(message || DEFAULT_API_ERROR_MESSAGE);
    this._title = title || DEFAULT_API_ERROR_TITLE;
    this._statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  }

  get statusCode() {
    return this._statusCode;
  }

  get title() {
    return this._title;
  }
}

module.exports = ApiError;
