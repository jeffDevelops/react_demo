/* jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CustomerDataSrcSchema = require('./customerDataSrc.js');

let CustomerSchema = new Schema({
  customerBusinessName: String,
  // customerUsername: String,
  // customerPassword: String,
  customerSurveyComplete: Boolean,
  customerSurveyResponse: [CustomerDataSrcSchema.schema]
});

let Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
