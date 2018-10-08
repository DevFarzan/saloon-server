const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const smtpTransport = require('../config/smtpTransport');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    console.log(req.body, 'dataaaaaaaaaaa')
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});
    if(user) {
        return res.status(400).send('That user already exits!');
    }else {
        user = new User(_.pick(req.body, ['name', 'email', 'number', 'password', 'randomno', 'host', 'varifiedemail', 'block']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        req.session.email = req.body.email;
        let smtpRes = await smtpTransport(req);
        user.randomno = smtpRes.rand;
        user.host = smtpRes.host;
        await user.save();

        if(smtpRes.res.accepted[0] === req.body.email) {
            res.send({
                code: 200,
                emailStatus: 'Email send',
                content: _.pick(user, ['_id', 'name', 'email', 'number'])
            })
        }
    }
});

module.exports = router;