const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/', async (req, res) => {
    let user = await User.findOne({email: req.query.email});
    if(req.protocol + "://" + req.get('host') === ("http://" + user.host)){
        if(req.query.id === user.randomno){
            user = await User.update({ email: user.email }, { $set: { varifiedemail: true }});
            res.end("<h1>Email "+ req.query.email +" is been Successfully verified.</h1>");
        }else {
            res.end("<h1>Bad Request</h1>");
        }
    }else {
        res.end("<h1>Request is from unknown source");
    }
});

module.exports = router;