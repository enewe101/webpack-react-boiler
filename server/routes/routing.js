"use strict";
const oauth = require('oauth');
const request = require('request');
const authRouter = require('./auth/routing.js');
const express = require('express');

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function prepare_router() {
  const router = express.Router();
  router.use('/auth', authRouter);
  router.use('/api', require('./api/routing.js'));
  router.get('/app/*', serve_client_app);
  router.post('/mail', send_mail);
  module.exports = router;
}


function serve_client_app(req, res){
  let GLOBALS = {
    'FACEBOOK_APP_ID': process.env.FACEBOOK_APP_ID
  };
  res.render('index', {'globals': JSON.stringify(GLOBALS)});
}

function send_mail(req, res) {
  let message = [
    'From: ' + req.body.email,
    'First Name: ' + req.body.fname,
    'Last Name: ' + req.body.lname,
    'Organization: ' + req.body.org,
    'Role: ' + req.body.role,
    '','Campaign:',req.body.campaign,
    '','Needs:',req.body.needs
  ];

  console.log(message);

  sgMail.send({
    to: 'edward.newell@gmail.com',
    from: 'contact-form@aventamedia.com',
    subject: 'Aventa Contact',
    text: message.join('\n'),
    html: '<p>\n' + message.join('\n<br>\n') + '\n</p>'
  });  
  res.json({success:true});
}

prepare_router();
