var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
// var older_token = jwt.sign({
//   data: 'foobar'
// }, 'secret', { expiresIn: 60 });
// console.log(older_token)
// try {
//   var decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNTk3Mjk3NTA4LCJleHAiOjE1OTcyOTc1Njh9.KUSYkbRxHhe-FkDdfWFIUBeuETU1nyTIhpLAK_Ue3Yc', 'secret');
//   console.log(decoded)
// } catch (err) {
//   console.log(err)
// }
var transporter = nodemailer.createTransport({
  service: 'zoho',
  tls: true,
  auth: {
    user: 'admin@biz1book.com',
    pass: 'Sairam@11'
  }
});

// var mailOptions = {
//     from: 'admin@biz1book.com',
//     to: 'masoodrbz@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: '123456789'};
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
var express = require('express');
var app = express();
var fs = require("fs");

app.get('/get', function (req, res) {
  console.log(req.query)
  var older_token = jwt.sign({
    data: 'foobar'
  }, 'secret', { expiresIn: 60 });
  var mailOptions = {
    from: 'admin@biz1book.com',
    to: req.query.email,
    subject: 'Sending Email using Node.js',
    text: 'http://localhost:8081/verify?token=' + older_token
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.send('hghjghji')
})
app.get('/verify', function (req, res) {
  console.log(req.query)
  var message = '';
  try {
    var decoded = jwt.verify(req.query.token, 'secret');
    message = 'verified'
    console.log(decoded)
  } catch (err) {
    console.log(err)
    message = 'link expired'
  }
  res.send(message)
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})