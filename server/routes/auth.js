const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const modelSource = require('../models');

function initAuth(app, config, sequelize) {
  const models = modelSource(sequelize);

  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    models.Person.getFromLogin(profile).then((user) => {
      console.log(user);
      return done(null, user);
    }, (err) => { console.log(err); });
  }));
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    models.Person.getFromLogin(profile).then((user) => {
      console.log(user);
      return done(null, user);
    }, (err) => { console.log(err); });
  }));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  const router = express.Router();

  router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
  router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/show',
    failureRedirect: '/login',
  }), (req, res) => {
    res.redirect('/');
  });

  router.get('/google', passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }));
  router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/show',
    failureRedirect: '/login',
  }), (req, res) => {
    res.redirect('/');
  });

  router.get('*', (req, res) => {
    res.status(404).send('Page Not Found');
  });

  return router;
}

module.exports = initAuth;
