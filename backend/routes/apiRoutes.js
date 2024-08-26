const express = require('express');
const { getDailyPuzzle } = require('../controllers/lichess');

const router = express.Router();

// Route for fetching the Lichess daily puzzle
router.get('/lichess/daily-puzzle', getDailyPuzzle);

module.exports = router;
