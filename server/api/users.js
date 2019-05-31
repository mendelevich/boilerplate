const router = require('express').Router();

// GET /api/users/
router.get('/', function(req, res, next) {
  /* etc */
});

// POST /api/users/
router.post('/', function(req, res, next) {
  /* etc */
});

// PUT /api/users/:userId
router.put('/:userId', function(req, res, next) {
  /* etc */
});

// DELETE /api/users/:userId
router.delete('/:userId', function(req, res, next) {
  /* etc */
});

module.exports = router;
