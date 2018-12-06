const { Gallery } = require('../models/Gallery');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async(req, res) => {
	let gallery = req.body;
	var gallery_info = new Gallery({
        gallery:gallery.image,
        date:gallery.date
    });
    gallery_info.save(function(err,success){
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
