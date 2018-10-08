const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.session, 'kkkkkkkkkkkkkkk')
    if(!req.session.email){
        console.log(req.session, 'not any session');
    }else {
        console.log(req.session.email, 'already has session');
    }
});

module.exports = router;