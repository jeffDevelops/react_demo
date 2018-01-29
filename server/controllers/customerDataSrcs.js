/* jshint esversion: 6 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const db = require('../models/index.js');

app.use(bodyParser.json());

// HANDLE CORS
function handleCORS(req, res, next) {
  console.log('HANDLECORS HIT');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
}

// GET ALL CUSTOMER DATA SRCS
function showAllCustomerDataSrcs(req, res){
  console.log('SHOWALLCUSTOMERDATASRCS HIT');
  db.CustomerLogSrc.find( (err, customerDataSrcs) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(customerDataSrcs);
    }
  });
}

// SAVE NEW CUSTOMER DATA SRC
function createNewCustomerDataSrc(req, res) {
  console.log('CREATENEWCUSTOMERDATASRC HIT');
  db.CustomerDataSrc.create(req.body, (err, customerDataSrc) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(customerDataSrc);
    }
  });
}

// GET SINGLE CUSTOMER DATA SRC
function showOneCustomerDataSrc(req, res) {
  console.log('SHOWONECUSTOMERDATASRC HIT');
  db.CustomerDataSrc.findById(req.params.id, (err, customerDataSrc) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(customerDataSrc);
    }
  });
}

// UPDATE CUSTOMER DATA SRC
function updateCustomerDataSrc(req, res) {
  console.log('UPDATECUSTOMERDATASRC HIT');
  db.CustomerDataSrc.findByIdAndUpdate(req.params.id, req.body, (err, customerDataSrc) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(customerDataSrc);
    }
  });
}

// DELETE CUSTOMER DATA SRC
function deleteCustomerDataSrc(req, res) {
  console.log('DELETECUSTOMERDATASRC HIT');
  db.CustomerDataSrc.findByIdAndRemove(req.params.id, req.body, (err, customerDataSrc) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(customerDataSrc);
    }
  })
}

module.exports = {
  handleCORS: handleCORS,
  showAllCustomerDataSrcs: showAllCustomerDataSrcs,
  createNewCustomerDataSrc: createNewCustomerDataSrc,
  showOneCustomerDataSrc: showOneCustomerDataSrc,
  updateCustomerDataSrc: updateCustomerDataSrc,
  deleteCustomerDataSrc: deleteCustomerDataSrc
};
