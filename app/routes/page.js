const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/page');

// 컨트롤러에 정의한 page render를 가져오는 과정
router.get('/', ctrl.output.login);
router.get('/main', ctrl.output.main);
router.get('/create', ctrl.output.create);
router.get('/update', ctrl.output.update);

module.exports = router;
