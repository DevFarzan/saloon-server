const Joi = require('joi');
Joi.objectId =require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/user');
const auth = require('./routes/auth');
const verified = require('./routes/verifyEmail');
const dashboard = require('./routes/dashboard');
const employees = require('./routes/employees');
const getEmployees = require('./routes/getEmployees');
const services = require('./routes/services');
const getServices = require('./routes/getServices');
const getUsers = require('./routes/getUsers');
const booking = require('./routes/booking');
const getBooking = require('./routes/getBooking');
const aboutUs = require('./routes/aboutUs');
const gallery = require('./routes/gallery');
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
app.use('/api/employees', employees);
app.use('/api/getEmployees', getEmployees);
app.use('/api/services', services);
app.use('/api/getServices', getServices);
app.use('/api/booking', booking);
app.use('/api/getBooking',getBooking);
app.use('/api/getUser',getUsers);
app.use('/api/aboutUs',aboutUs);
app.use('/api/gallery',gallery);

app.get('/', (req, res) => {
    res.send('Saloon App Server is running!!!')
})

// app.use(function (req, res, next) {
//     if(req.headers['x-forwarded-proto'] === 'http'){
//         next();
//     }else {
//         res.redirect('http://' + req.hostname + req.url);
//     }
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('server is up and running on port ' + PORT)
});
