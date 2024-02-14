const express = require('express');
const router = express.Router();
const note = require('../controllers/note-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/addnote', note.noteForm);
router.get('/notes', authMiddleware, note.getAllUserNotes);
router.get('/notes/:id', authMiddleware, note.getUserNotesById);
router.patch('/notes/update/:id', authMiddleware, note.updateByUserId);
router.delete('/notes/delete/:id', authMiddleware, note.deleteByUserId);

module.exports = router;