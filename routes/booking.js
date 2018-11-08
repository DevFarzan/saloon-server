const {Booking} = require('../models/booking');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async(req, res) => {
	let data = req.body;
	if(data.obj_id === ''){
		let booking = new Booking(_.pick(data, ['name', 'email', 'number', 'emp_id', 'user_id', 'date', 'time', 'status']));
		try{
			let result = await booking.save();
			res.send({
				code: 200,
				content: result,
				status: 'Submitted successfully'
			});			
		}
		catch(e){
			res.send({
				code: 404,
				msg: e
			});
		}
	}else if(data.obj_id !== ''){
		try{
			let booking = await Booking.findOne({"_id": data.obj_id});
			booking.name = data.name;
			booking.email = data.email;
			booking.number = data.number;
			booking.emp_id = data.emp_id;
			booking.user_id = data.user_id;
			booking.date = data.date;
			booking.time = data.time

			let result = await booking.save();
			res.send({
				code: 200,
				content: result,
				status: 'Submitted successfully'
			});			
		}
		catch(e){
			res.send({
				code: 404,
				msg: e
			});
		}
	} 
})

module.exports = router;
