const {Services} = require('../models/services');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
	try {
		let data = await Services.find({});
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
