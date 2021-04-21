const passport = require('passport');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);    // 세션에 user의 id만 저장
    });

    passport.deserializeUser((id, done) => {
        // 세션에 저장된 user.id의 정보를 가져올 수 있다.
        User.findOne({ 
            where: {id},
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    kakao();

};