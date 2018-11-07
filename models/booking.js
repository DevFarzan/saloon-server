const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Booking = new Schema({
	name: {type: String},
	email: {type: String},
	number: {type: String},
	emp_id: {type: String},
	user_id: {type: String},
	date: {type: String},
	time: {type: Object},
	status: {type: String, default: 'process'}
});

exports.Booking = mongoose.model('Booking', Booking);
