const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const cors = require("cors");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});app.use(bodyParser.json({strict: false}));

app.listen(3000, () => console.info('Application running on port 3000'));

app.post('/sendmail',bodyParser.json() , (request, response) => {
  console.log(request.body)
  var mailOptions = {
    from: 'admin@biz1book.com',
    to: request.body.email,
    subject: 'Sending Email using Node.js',
    text: 'https://biz1pos.azurewebsites.net/api/Registration/ConfirmEmail?email='+request.body.email  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });  response.send("data recieved");
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'zoho',
  tls: true,
  auth: {
    user: 'admin@biz1book.com',
    pass: 'B1zd0m##'
  }
});
