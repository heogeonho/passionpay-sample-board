const passport = require('passport');
const kakao = require('./kakaoStrategy');
const User = require('../schemas/user')

module.exports = () => {
    // req.session에 어떤 데이터 저장할 것인지 정하는 코드 (로그인 후 세션에 유저 저장)
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // 요청시 조회 (위에서 저장한 유저 정보가 매개변수가 됨)
    passport.deserializeUser((id, done) => {
        User.findOne({ _id : id }).exec() // 추후 수정할 가능성 있음 (데이터 전달 확인후 다시 검토할 것)
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    kakao();
}