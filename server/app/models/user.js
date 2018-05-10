var mongoose         = require('mongoose')
var bcrypt           = require('bcrypt')
const DuplicatedData = require('../erros/duplicated_data')

const Schema         = mongoose.Schema

var UserSchema = new Schema({
		firstName:     {
      type:      String,
      required:  true
    },
    lastName:    {
      type:      String,
      required:  true
    },
    email:       {
      type:      String,
      required:  true,
			unique: true
			
    },
    password:    {
      type:      String,
      required:  true
    },
    socialMedias: [{
      type:      Schema.Types.ObjectId, 
      ref:       'SocialMedia'
    }]
})

UserSchema.pre('save', function(next) {
  var user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
            return next(err);
        }

        user.password = hash;
        next();
      })
    })
    
  } else {
    return next();
  }
})

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) {
        return cb(err);
    }

    cb(err, isMatch);
    })
}

module.exports = mongoose.model('User', UserSchema);
