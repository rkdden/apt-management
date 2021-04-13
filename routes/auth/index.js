const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/api/v1',
}), (req, res) => {
    
    res.send('ok');
});

module.exports = router;