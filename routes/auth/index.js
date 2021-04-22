const express = require('express');
const passport = require('passport');
const { User } = require('../../models');
const authController = require('./auth.controller');
const router = express.Router();


router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/login',
}), async (req, res) => {
    const exUser = await User.findOne({
        where: {
            id: req.user.id
        },
    });
    if(exUser.apt_ho === null) {
        res.redirect('/auth/userinfo');
    } else {
        res.redirect('/');
    }
});

router.get('/userinfo', authController.getUserInfo);

module.exports = router;