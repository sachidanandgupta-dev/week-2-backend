const router = require('express').Router();
const c = require('../controllers/noteController');
const protect = require('../middleware/auth');

router.use(protect); // every notes route requires a valid JWT

router.route('/').post(c.createNote).get(c.getNotes);
router.route('/:id').get(c.getNote).put(c.updateNote).delete(c.deleteNote);

module.exports = router;
