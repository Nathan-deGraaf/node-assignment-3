const express = require('express');
const defRoutes = express.Router();
const mongoose = require('mongoose');
const Subscribers = require('./subscribers');


//filling our schema with the information gathered in the form from subscribe.pug. and writing to our db
defRoutes.post('/subscribe', (req, res) => {
  const subscriber = new Subscribers({
    name: req.body.name,
    email: req.body.email,
    adult: req.body.adult,
  });
  console.log('POST Request Sent')
  
  subscriber.save({w:1}, err => {
    if (err) {
      res.render('subscribe');
    }
    res.render('index', {
      //mitch helped with the interpolation into pug.
      message: ` Thank you for subscribing, ${req.body.name}!`
    });
  });
});

module.exports = defRoutes
