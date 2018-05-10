const jwt  = require('jwt-simple');
const nconf = require('nconf');

const secret  = nconf.get('jwt:secret');

module.exports = {

  encode: user => jwt.encode(user, secret),

  decode: token => jwt.decode(token, secret),
};
