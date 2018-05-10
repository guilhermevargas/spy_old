let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt  = require('passport-jwt').ExtractJwt
let User        = require('../app/models/user')
let nconf 			= require('nconf')

const secret = nconf.get('jwt:secret')

module.exports = (passport) => {
  var opts = {};

  opts.secretOrKey    = secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({id: jwt_payload.id}, (err, user) => {
			if (err) {
					return done(err, false);
			}
			if (user) {
					done(null, user);
			} else {
					done(null, false);
			}
    })
  }))
}


