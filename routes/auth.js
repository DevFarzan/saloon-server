const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});
    if(!user) {
        //return res.status(400).send('Incorrect email or password.');
        res.send({
            code:500,
            msg:'Incorrect email or password'
        })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    if(user && validPassword){
        res.send({
            code: 200,
            emailStatus: 'Login Successfully',
            content: _.pick(user, ['_id', 'name', 'email', 'number', 'role'])
        })
    }

    // const token = jwt.sign({_id: user._id}, 'Privatekey');
    // res.send(token + 'login successfully');
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
