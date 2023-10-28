const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require( '../middlewares');

// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
}), (req, res) => {
    res.redirect('/main');
});

module.exports = router;