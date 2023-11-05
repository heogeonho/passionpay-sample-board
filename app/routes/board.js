const express = require('express');
const router = express.Router();

const boardController = require('../controllers/board');

router.post('/', boardController.createPost);

module.exports = router;