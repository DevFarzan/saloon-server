const {Services} = require('../models/services');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async(req, res) => {
	let data = req.body;
	let services = await Services.findOne({heading: data.heading});
	if(services){
		return res.status(400).send('That Service already exits!');
	}else {
		services = new Services(_.pick(data, ['heading', 'description', 'image']));
		try{
			let result = await services.save();
			res.send({
				code: 200,
				status: 'Added successfully'
			});			
		}
		catch(e){
			res.send({
				code: 404,
				msg: e
			});
		}

	}
});

module.exports = router;
