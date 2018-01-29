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

// GET ALL CUSTOMERS
function showAllCustomers(req, res){
  console.log('SHOWALLCUSTOMERS HIT');
  db.Customer.find( (err, customers) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(customers);
    }
  });
}

// SAVE NEW CUSTOMER
function createNewCustomer(req, res) {
  console.log('CREATENEWCUSTOMER HIT');
  db.Customer.create(req.body, (err, customer) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(customer);
    }
  });
}

// GET SINGLE CUSTOMER
function showOneCustomer(req, res) {
  console.log('SHOWONECUSTOMER HIT');
  db.Customer.findById(req.params.id, (err, customer) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(customer);
    }
  });
}

// UPDATE CUSTOMER
function updateCustomer(req, res) {
  console.log('UPDATECUSTOMER HIT');
  db.Customer.findByIdAndUpdate(req.params.id, req.body, (err, customer) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(customer);
    }
  });
}

// DELETE CUSTOMER
function deleteCustomer(req, res) {
  console.log('DELETECUSTOMER HIT');
  db.Customer.findByIdAndRemove(req.params.id, req.body, (err, customer) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(customer);
    }
  })
}

module.exports = {
  handleCORS: handleCORS,
  showAllCustomers: showAllCustomers,
  createNewCustomer: createNewCustomer,
  showOneCustomer: showOneCustomer,
  updateCustomer: updateCustomer,
  deleteCustomer: deleteCustomer
};
