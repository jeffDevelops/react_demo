/* jshint esversion: 6 */

const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URI ||
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/vSOC_scoping_app'
);

module.exports.CustomerDataSrc = require('./customerDataSrc.js');
module.exports.Customer = require('./customer.js');
module.exports.MasterDataSrc = require('./masterDataSrc.js');
