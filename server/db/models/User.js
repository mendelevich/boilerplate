const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('users', {
  name: Sequelize.STRING,
});

module.exports = User;
