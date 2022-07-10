const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport(config.smtp);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/home.html');
});
app.post("/home", function (req, res) {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/register', function (req, res) {
  res.sendFile(__dirname + '/views/register.html');
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/views/login.html');
});
app.get("/getSimCard", function (req, res) {
  res.sendFile(__dirname + '/views/Getsimcard.html');
});
app.get('/buy', function (req, res) {
  res.sendFile(__dirname + '/views/buy.html');
});

app.post("/home", function (req, res) {
  res.sendFile(__dirname + '/views/home.html');
});
app.post('/register', function (req, res) {
  let mailOptions = {
    to: req.body.email,
    subject: 'Registration successful',
    from: config.smtp.auth.user,
    html: `<b>Hi ${req.body.username}  !! You have successfully registered to Bargain Karo. Enjoy!!</b>`
  }

  transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
      res.redirect('/');
    }
  });
});
app.post('/buy', function (req, res) {
  let mailOptions = {
    to: req.body.email,
    subject: 'Order Confirm',
    from: config.smtp.auth.user,
    html: `<b>Hi ${req.body.name} !! You have successfully ordered your Sim Card form Bargain Karo .Our sales executive will come to your house and please get ready with your documents. Enjoy!!</b>`
  }

  transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
      res.redirect('/');
    }
  });
});
app.listen(3000, function () {
  console.log("Server Has Started!");
});