const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;


module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID, // 카카오 시크릿키
        callbackURL: "http://localhost:3000/api/v1/auth/kakao/callback", // 카카오 콜백 URL
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("-----------");
        console.log(accessToken);
        console.log("---------------");
        try {
            done(null, accessToken);
        } catch (error) {
            console.error(error);
            done(error);
        }
    }
    ));
};
