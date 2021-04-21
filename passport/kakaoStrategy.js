const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const { User } = require('../models');


module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID, // 카카오 시크릿키
        callbackURL: "http://localhost:3000/api/v1/auth/kakao/callback", // 카카오 콜백 URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await User.findOne({
                where: { uemail: profile._json.kakao_account.email, },
            });
            if (exUser) { // 카카오로 가입된 정보가 있을때
                // 토큰을 업데이트 해준다.
                const originalUser = await User.update({accessToken}, {where: {id: exUser.id}});
                done(null, exUser);
            } else { // 카카오로 가입된 정보가 없을때
                // 새로운 사용자를 생성한다.
                const newUser = await User.create({
                    uemail: profile._json.kakao_account.email,
                    uname: profile.displayName,
                    accessToken,
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }
    ));
};
