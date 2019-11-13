const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const defRoutes = require('./assets/js/route');

//joins files from the assets directory. can view css
app.use(express.static(path.join(__dirname + '/assets')));

//middleware for POST requests
app.use(express.urlencoded({extended: false}));

//set the view engine to pug
app.set('view engine', 'pug');

//connection to DB. unifiedTopology baselines, useNewUrlParser creates reusable Connection
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true,useNewUrlParser: true });
const db = mongoose.connection;

//once connection has been opened. will display Connected to DB! in console
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to DB!');
});


// home route will render index.pug. will catch any errors
app.get('/', async (req,res) => {
  try{
    await res.render('index', {
    })
  }
  catch(err) {
    return response.status(404).send(err);
  }
});

//route to login
app.get('/login', async (req,res) => {
  try{
    await res.render('login.pug')
  }
  catch(err) {
    return response.status(404).send(err);
  }
});

//route to subscribe
app.get('/subscribe', async (req,res) => {
  try{
   await res.render('subscribe.pug')
  }
  catch(err) {
    return response.status(404).send(err);
  }
});


//subscriber module
app.use('/',defRoutes);

// desplay a splash page for 404 errors
app.use((err, req, res, next) => {
  res.locals.layout = err.layout;
  res.status(err.status || 404);
  res.render('error404');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });