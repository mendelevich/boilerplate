const router = require('express').Router();
const passport = require('passport');
const { User } = require('./db');

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/home', // or wherever
    failureRedirect: '/', // or wherever
  })
);

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};

const strategy = new GoogleStrategy(googleConfig, function(
  token,
  refreshToken,
  profile,
  done
) {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  User.findOne({ where: { googleId: googleId } })
    .then(function(user) {
      if (!user) {
        return User.create({ name, email, googleId }).then(function(user) {
          done(null, user);
        });
      } else {
        done(null, user);
      }
    })
    .catch(done);
});

passport.use(strategy);
module.exports = router;
