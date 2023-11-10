const express = require('express');
const router = express.Router();

const boardController = require('../controllers/board');

router.post('/', boardController.createPost);
router.delete('/delete-post/:postId', boardController.deletePost);

module.exports = router;