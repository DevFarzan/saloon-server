const nodemailer = require('nodemailer');

module.exports = async function smtpTrans (req) {
    let rand, mailOptions, host, link, email;
    let smtpTransport = nodemailer.createTransport({
       service: 'Gmail',
       auth: {
           user: 'ranjhadill143@gmail.com',
           pass: 'ranjha123'
       },
       tls: {
           rejectUnauthorized: false
       }
    });

    email = req.body.email;
    rand = Math.floor((Math.random() * 100) + 11);
    host = req.get('host');
    link="http://" + req.get('host') + "/verify?email=" + email + "&&id="+rand;
    mailOptions = {
        to: req.body.email,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    };

    let res = await smtpTransport.sendMail(mailOptions);
    return obj = {res, rand, host};
};