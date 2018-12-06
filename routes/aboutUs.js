const { AboutUs } = require('../models/aboutUs');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async(req, res) => {
	let about = req.body

	var about_info = new AboutUs({
        aboutUs:about.about,
        date:about.date
    });
    about_info.save(function(err,success){
    	if(err){
    		res.send({
    			code:404,
    			msg:'Internal server error'
    		})
    	}
    	else if(success){
    		res.send({
    			code:200,
    			msg:'data inserted successfully'
    		})
    	}
    })
});

module.exports = router;
