(function() {
  'use strict';

  var express       = require('express'),
      jwt           = require('jwt-simple'),
      TOKEN_SECRET  = process.env.TOKEN_SECRET,
      authService   = require('../../auth/auth.service'),
      User          = require('mongoose').model('User');
//  var controller = require('./user.controller');
//  var config = require('../../config/environment');
//  var auth = require('../../auth/auth.service');

  var router = express.Router();

  router.get('/me', authService.ensureAuthenticated, function(req, res) {
    var token = req.headers.authorization.split(' ')[1],
        payload = jwt.decode(token, TOKEN_SECRET);
    User.findById(payload.sub, function(err, user) {
      if (err) { return res.render('500'); }
      var userToSend = {
        _id: user._id,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      };
      if (user.provider === 'google') {
        userToSend.provider = user.provider;
        userToSend.google = user.google;
      }
      res.send(userToSend);
    });
  });

//  router.get('/', auth.hasRole('admin'), controller.index);
//  router.delete('/:id', auth.hasRole('admin'), controller.destroy);
//  router.get('/me', auth.isAuthenticated(), controller.me);
//  router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
//  router.get('/:id', auth.isAuthenticated(), controller.show);
//  router.post('/', controller.create);

  module.exports = router;
}());
