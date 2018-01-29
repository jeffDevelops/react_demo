/* jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MasterDataSrcSchema = new Schema({
  dataSourceName: String,
  estBytePerEvent: Number,
  avgEPS: Number,
  numOfDev: Number
});

let MasterDataSrc = mongoose.model('MasterDataSrc', MasterDataSrcSchema);
module.exports = MasterDataSrc;
