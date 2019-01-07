const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Middleware
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', require('./api'));

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
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
