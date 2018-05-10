const WebError = require('./web_error')
const errorType = require('../enums/error_type')

class BadRequest extends WebError {
	constructor(message) {
		super(message, errorType.badRequest);
	}
}