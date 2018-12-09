const express = require('express');
const router = express.Router();

// router.get('/track', require('../modules/getTracks'));
router.post('/register', require('../modules/addUser'))

router.use((req, res, next) => {
    res.header({ 'Content-Type': 'text/plain' });
    next();
});

router.get('/armaauth/0.1/', require('../modules/armaauth'));

module.exports = router;