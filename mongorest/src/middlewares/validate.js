const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const validate = (schema, validateBool) => (req, res, next) => {
  if (!validateBool) return next();
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

const validateMock = (schema) => (req, res, next) => {
  return next();
};

module.exports = { validate, validateMock };
