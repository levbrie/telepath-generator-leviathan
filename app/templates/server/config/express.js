(function () {
  'use strict';

  var express         = require('express'),
      session         = require('express-session'),
      ejs             = require('ejs'),
      morgan          = require('morgan'),
      MORGAN_FORMAT   = 'dev',              // https://github.com/expressjs/morgan
      bodyParser      = require('body-parser'),
      methodOverride  = require('method-override'),
      jwt             = require('jwt-simple'),
      passport        = require('passport');

  module.exports = function(app, config, env) {
    // setup static route handling
    app.set('views', config.rootPath + '/public/app');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(morgan(MORGAN_FORMAT));   // log every request to the console, I've also seen app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());    // parse json
    app.use(methodOverride());     // simulate DELETE and PUT

    app.use(session({
      secret: process.env.APP_SECRET,
      saveUninitialized: true,
      resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());


    app.use(express.static(config.rootPath + '/public'));   // set the static files location /public/img will be /img for users
  };

})();
