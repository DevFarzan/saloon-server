const Joi = require('joi');
Joi.objectId =require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/user');
const auth = require('./routes/auth');
const verified = require('./routes/verifyEmail');
const dashboard = require('./routes/dashboard');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator =  require('express-validator') ;
const session =  require('express-session') ;
const app = express();

const configDB = require('./config/database.js');
mongoose.connect(configDB.EvenNodeDB, {useNewUrlParser: true}, (err, db) => {
    if(err){
        console.log(err);
        db.on('error', console.error.bind(console, 'Database connection failed: '));
    }else {
        var db = mongoose.connection;
        console.log('Database :: saloonApp :: connection established successfully.');
    }
});

app.use(express.json());
app.use(session({ secret: 'krunal', resave: false, saveUninitialized: true, }));

app.use(expressValidator());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/verify', verified);
app.use('/api/dashboard', dashboard);

// app.get('/', (req, res) => {
//     res.send('Hello Server!!!')
// })

// app.use(function (req, res, next) {
//     if(req.headers['x-forwarded-proto'] === 'http'){
//         next();
//     }else {
//         res.redirect('http://' + req.hostname + req.url);
//     }
// })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server is up and running on port ' + PORT)
});