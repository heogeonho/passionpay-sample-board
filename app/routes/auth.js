const express = require('express');
const passport = require('passport');

const router = express.Router();

// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
router.get(
    '/kakao/callback',
    passport.authenticate('kakao', {
        failureRedirect: '/?loginError=카카오로그인 실패',
    }),
    (req, res) => {
        res.redirect('/main');
    }
);

module.exports = router;
