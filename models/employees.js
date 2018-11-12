const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employees = new Schema({
	name: {type: String, required: true, minLength: 6, maxLength: 50},
	email: {type: String, required: true, minLength: 5, maxLength: 255},
	rating: {type: String, required: true, minLength: 6, maxLength: 50},
	active: {type: Boolean, default: false},
	activity: {type: Array},
	image: {type: String},
	comments: {type: Array},
	emp_id:{type:String},
});

exports.Employees = mongoose.model('Employees', Employees);
