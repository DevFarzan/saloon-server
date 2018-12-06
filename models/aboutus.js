const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutUs = new Schema({
	aboutUs:{type:String},
	date:{type:Date}
});

exports.AboutUs = mongoose.model('AboutUs', AboutUs);
