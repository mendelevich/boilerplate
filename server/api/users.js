const router = require('express').Router();

// api/users
router.get('/', (req, res, next) => {
  try {
    /* etc */
  } catch (err) {
    next(err);
  }
});

router.post('/', (req, res, next) => {
  try {
    /* etc */
  } catch (err) {
    next(err);
  }
});

router.put('/:userId', (req, res, next) => {
  try {
    /* etc */
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', (req, res, next) => {
  try {
    /* etc */
  } catch (err) {
    next(err);
  }
});

module.exports = router;
