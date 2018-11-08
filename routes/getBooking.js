const {Booking} = require('../models/booking');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
	try {
		let data = await Booking.find({});
		res.send({
			code: 200,
			content: data
		});	
	}
	catch(e){
		res.send({
			code: 404,
			msg: e
		});
	}
	
});

module.exports = router;
