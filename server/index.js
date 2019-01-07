const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const { db, User } = require('./db');

if (process.env.NODE_ENV === 'development') {
  require('./localSecrets');
}

const app = express();

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
dbStore.sync();

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'some secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

// Static middleware
app.use(express.static(path.join(__dirname, '../public')));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

// Routes
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

// Send index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const PORT = process.env.PORT || 8080;

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
