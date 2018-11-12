const {Employees} = require('../models/employees');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async(req, res) => {
	let data = req.body;
	let employee = await Employees.findOne({email: data.email});
	if(employee){
		return res.status(400).send('That employee already exits!');
	}else {
		employee = new Employees(_.pick(data, ['name', 'email', 'rating', 'active', 'activity', 'image', 'comments', 'emp_id']));
		try{
			let result = await employee.save();
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
