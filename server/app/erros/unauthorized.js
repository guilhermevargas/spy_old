const WebError = require('./web_error');
const errorType = require('../enums/error_type');

class UnauthorizedError extends WebError {
  constructor(message) {
    super(message, errorType.UnauthorizedError);
  }
}

module.exports = UnauthorizedError;
