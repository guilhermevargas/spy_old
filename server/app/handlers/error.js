const errorType = require('../enums/error_type');


class ErrorHandler {
  constructor() {
    this.defaultMessage = 'Oops, Something broke!';
  }

  handler(err, req, res, next) {
    if (res.headersSent) {
      next(err);
    } else if (err.code && err.code === errorType.badRequest) {
      res.status(400).send(err.message);
    } else if (err.code && err.code === errorType.unauthorized) {
      res.status(401).send(err.message);
    } else if (err.code && err.code === errorType.precondionalFailed) {
      res.status(412).send(err.message);
    } else if (err.error && err.error.name === 'ValidationError') {
      res.status(400).json({
        type: err.type, // will be "query" here, but could be "headers", "body", or "params" 
        message: err.error.toString(),
      });
    } else {
      res.status(500).send(this.defaultMessage);
      console.log(err.stack);
    }
  }
}

module.exports = new ErrorHandler();
