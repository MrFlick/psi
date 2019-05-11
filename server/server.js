const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');

const app = express();
const port = 3000;

app.set('views', './server/views');
app.set('view engine', 'pug');

const config = require('../.config');

const sequelize = new Sequelize('sqlite:db/data.sqlite3', {
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: false,
  },
});

app.use(express.static('public'));
app.use(express.static('react-build'));

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

const api = require('./routes/api')(sequelize);
const user = require('./routes/user');
const auth = require('./routes/auth')(app, config, sequelize);

app.use('/api', api);
app.use('/auth', auth);
app.use('/', user);

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
