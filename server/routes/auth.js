const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const modelSource = require('../models');

function initAuth(app, config, sequelize) {
  const router = express.Router();
  const models = modelSource(sequelize);

  function getUserFromProfile(profile, done) {
    models.Person.getFromLogin(profile).then(
      (user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false, { message: 'Your login is not tied to a user account' });
        }
      },
      (err) => { done(err); },
    );
  }

  app.use(passport.initialize());
  app.use(passport.session());

  let configured = false;
  if (config.localuser) {
    // helper middleware for deveopment to avoid interactive auth
    app.use((req, res, next) => {
      if (!req.user && req.hostname === 'localhost') {
        getUserFromProfile(config.localuser, (err, user) => {
          if (err) next(err);
          req.login(user, (err2) => {
            if (err2) next(err2);
            next();
          });
        });
      } else {
        next();
      }
    });
    configured = true;
  }
  if (config.facebook) {
    passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
    }, (accessToken, refreshToken, profile, done) => {
      getUserFromProfile(profile, done);
    }));
    router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
    router.get('/facebook/callback', passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureMessage: true,
    }));
    configured = true;
  }
  if (config.google) {
    passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
    }, (accessToken, refreshToken, profile, done) => {
      getUserFromProfile(profile, done);
    }));
    router.get('/google', passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }));
    router.get('/google/callback', passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureMessage: true,
    }));
    configured = true;
  }
  if (!configured) {
    throw new Error('No login scheme found in config');
  }

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  router.get('*', (req, res) => {
    res.status(404).send('Page Not Found');
  });

  return router;
}

module.exports = initAuth;
