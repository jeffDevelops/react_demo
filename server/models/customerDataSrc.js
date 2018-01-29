/* jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CustomerDataSrcSchema = new Schema({
  dataSourceName: String,
  estBytePerEvent: Number,
  avgEPS: Number,
  numOfDev: Number
});

let CustomerDataSrc = mongoose.model('CustomerDataSrc', CustomerDataSrcSchema);
module.exports = CustomerDataSrc;
