const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
	try {
		let data = await User.find({});
		employeeName = [];
		for(var i=0;i<data.length;i++){
			if(data[i].role == "employe"){
			employeeName.push({
				name:data[i].name,
				email:data[i].email,
				number:data[i].number,
				id:data[i]._id,
				role:data[i].role
				})
			}
		}
		res.send({
			code: 200,
			content: employeeName
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
