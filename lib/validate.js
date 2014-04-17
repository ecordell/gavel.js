// Generated by CoffeeScript 1.7.1
var ExpectedHttpRequest, ExpectedHttpResponse, HttpRequest, HttpResponse, errors, isValid, isValidatable, proxy, validate, _ref, _ref1;

errors = require('./errors');

_ref = require('./model/http-request'), HttpRequest = _ref.HttpRequest, ExpectedHttpRequest = _ref.ExpectedHttpRequest;

_ref1 = require('./model/http-response'), HttpResponse = _ref1.HttpResponse, ExpectedHttpResponse = _ref1.ExpectedHttpResponse;

proxy = function(validatableObject, method, cb) {
  var error, result;
  try {
    result = validatableObject[method]();
  } catch (_error) {
    error = _error;
    return cb(error, null);
  }
  return cb(null, result);
};

isValid = function(real, expected, type, cb) {
  var validatableObject;
  switch (type) {
    case 'request':
      validatableObject = new HttpRequest(real);
      validatableObject['expected'] = new ExpectedHttpRequest(expected);
      break;
    case 'response':
      validatableObject = new HttpResponse(real);
      validatableObject['expected'] = new ExpectedHttpResponse(expected);
  }
  return proxy(validatableObject, 'isValid', cb);
};

isValidatable = function(real, expected, type, cb) {
  var validatableObject;
  switch (type) {
    case 'request':
      validatableObject = new HttpRequest(real);
      validatableObject['expected'] = new ExpectedHttpRequest(expected);
      break;
    case 'response':
      validatableObject = new HttpResponse(real);
      validatableObject['expected'] = new ExpectedHttpResponse(expected);
  }
  return proxy(validatableObject, 'isValidatable', cb);
};

validate = function(real, expected, type, cb) {
  var validatableObject;
  switch (type) {
    case 'request':
      validatableObject = new HttpRequest(real);
      validatableObject['expected'] = new ExpectedHttpRequest(expected);
      break;
    case 'response':
      validatableObject = new HttpResponse(real);
      validatableObject['expected'] = new ExpectedHttpResponse(expected);
  }
  return proxy(validatableObject, 'validate', cb);
};

module.exports = {
  validate: validate,
  isValid: isValid,
  isValidatable: isValidatable
};