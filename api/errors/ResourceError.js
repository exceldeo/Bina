const { INTERNAL_SERVER_ERROR, UNAUTHORIZED, NOT_FOUND } = require('http-status-codes').StatusCodes;

const ApiError = require('./ApiError');

const LoginInternalError = () => {
  throw new ApiError(
    INTERNAL_SERVER_ERROR,
    'Login failed',
    'Something wrong happened in the backend.',
  );
};

const EmailExistError = () => {
  throw new ApiError(
    INTERNAL_SERVER_ERROR,
    'Register Failed',
    'Your email exists. Please login with your email',
  );
};

const LoginWrongCredentialsError = (message) => {
  throw new ApiError(UNAUTHORIZED, 'Login Failed', message);
};

const UserNotFound = () => {
  throw new ApiError(
    NOT_FOUND,
    'User not found',
    'User with current ID not found',
  );
};

module.exports = {
  LoginInternalError,
  LoginWrongCredentialsError,
  UserNotFound,
  EmailExistError,
};
