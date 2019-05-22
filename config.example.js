// rename to .config
const config = {};

config.google = {
  clientID: '',
  clientSecret: '',
  callbackURL: 'http://localhost:3000/auth/google/callback',
};

config.facebook = {
  clientID: '',
  clientSecret: '',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
};

config.localuser = {
  provider: '',
  id: '',
};

config.sessionSecret = '';
module.exports = config;
