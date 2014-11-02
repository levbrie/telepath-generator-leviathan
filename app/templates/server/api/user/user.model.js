(function() {
  'use strict';

  var mongoose = require('mongoose'),
      qs       = require('querystring'),
      bcrypt   = require('bcryptjs'),
      jwt      = require('jwt-simple'),
      Schema   = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;

  var userSchema = mongoose.Schema({
    email:          {type:String, required:'{PATH} is required!', unique:true},
    emailVerified:  {type:Boolean, default: false},
//    salt:           {type:String, required:'{PATH} is required!'},
//    hashedPassword: {type:String, required:'{PATH} is required!'},
    password:       String,
    role:           {type:String, required:'{PATH} is required!', default: 'user'},
    firstName:      {type:String, required:'{PATH} is required!'},
    lastName:       {type:String, required:'{PATH} is required!'},
    profileImageUrl:String,
    provider:       String,
    displayName:    String,
    facebook:       {},
    github:         {},
    google:         {},
    linkedin:       {}
  });

  userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  });

  userSchema.methods = {
    comparePassword: function(passwordToMatch, done) {
      console.log('comparing password');
      console.log(passwordToMatch);
      bcrypt.compare(passwordToMatch, this.password, function(err, isMatch) {
        if (err) {
          console.log('some error matching password');
          console.log(err);
        } else {
          console.log('no error matching password');
          console.log(isMatch);
        }
        done(err, isMatch);
      });
    },
    authenticate: function(passwordToMatch) {
      return this.comparePassword(passwordToMatch, done);
      // return encrypt.hasPwd(this.salt, passwordToMatch) === this.hashedPassword;
    },
    hasRole: function(role) {
      return this.role === role;
    }
  };

  var User = mongoose.model('User', userSchema);
}());
