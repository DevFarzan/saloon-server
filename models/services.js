const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Services = new Schema({
	heading: {type: String},
	description: {type: String},
	image: {type: String}
});

exports.Services = mongoose.model('Services', Services);
