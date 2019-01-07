const db = require('./database');
const User = require('./models/User');

// Associations
// Product.belongsTo(User);

module.exports = {
  db,
  User,
};
