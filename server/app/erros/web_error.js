const errorType = require('../enums/error_type');

class WebError extends Error {
  constructor(message, code) {
    super();
    this.message = message;
    this.code = code || errorType.internalServerError;
  }
}

module.exports = WebError;
