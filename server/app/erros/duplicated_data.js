const WebError  = require('./web_error');
const errorType = require('../enums/error_type');

class DuplicatedData extends WebError {
  constructor(message) {
    super(message, errorType.precondionalFailed);
  }
}

module.exports = DuplicatedData;
