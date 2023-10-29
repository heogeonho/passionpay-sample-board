const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../schemas/user');

module.exports = () => {
    passport.use(
        // 카카오 로그인에 대한 설정
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: '/auth/kakao/callback',
            },
            // 기존 유저 여부 파악 후 전략 진행
            async (accessToken, refreshToken, profile, done) => {
                console.log('kakao profile', profile);
                try {
                    const exUser = await User.findOne({
                        snsId: profile.id,
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            nick: profile.displayName,
                            snsId: profile.id,
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
