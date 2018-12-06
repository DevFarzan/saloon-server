const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gallery = new Schema({
	gallery:{type:Array},
	date:{type:Date}
});

exports.Gallery = mongoose.model('Gallery', Gallery);
