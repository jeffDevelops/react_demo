/* jshint esversion: 6 */

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Request Logging
app.use(morgan('dev'));

// API Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routes
const customerRoutes = require('./api/customers.js');
const customerDataSrcRoutes = require('./api/customerDataSrcs.js');
const masterDataSrcRoutes = require('./api/masterDataSrcs.js');
const sendSurvey = require('./api/sendSurvey.js');
app.use(customerRoutes);
app.use(customerDataSrcRoutes);
app.use(masterDataSrcRoutes);
app.use(sendSurvey);

// Start Server
app.listen(port, () => {
  console.log(`vSOC Scoping App API running on:${port}`);
});
