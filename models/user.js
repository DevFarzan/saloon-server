const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String, required: true, minLength: 6, maxLength: 50},
    email: {type: String, required: true, minLength: 5, maxLength: 255, unique: true},
    password: {type: String, required: true, minLength: 6, maxLength: 1024},
    number: {type: String, required: true, minLength: 11, maxLength: 12},
    randomno: {type: String, minLength: 5, maxLength: 50},
    host: {type: String, minLength: 5, maxLength: 50},
    varifiedemail: {type: Boolean, default: false},
    block: {type: Boolean, default: false},
    role: {type: String}
})

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        number: Joi.string().min(11).max(12).required(),
        role: Joi.string().min(4).max(7).required()
    };
    return Joi.validate(user, schema);
};

exports.User = mongoose.model('User', User);
exports.validate = validateUser;
