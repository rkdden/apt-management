const passport = require('passport');
const kakao = require('./kakaoStrategy');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user);    // 세션에 user의 id만 저장
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    kakao();
};