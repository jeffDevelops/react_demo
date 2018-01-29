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

// GET ALL MASTER DATA SRCS
function showAllMasterDataSrcs(req, res){
  console.log('SHOWALLMASTERDATASRCS HIT');
  db.MasterDataSrc.find({})
    .then(datasrcs => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(datasrcs);
    })
    .catch(err => {
      console.log(err);
    });
}

// SAVE NEW MASTER DATA SRC
function createNewMasterDataSrc(req, res) {
  console.log('CREATENEWMASTERDATASRC HIT');
  db.MasterDataSrc.create({
    dataSourceName: req.body.dataSourceName,
    estBytePerEvent: req.body.estBytePerEvent,
    avgEPS: req.body.avgEPS,
    numOfDev: req.body.numOfDev
  })
    .then(createdDataSrc => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(createdDataSrc);
    })
    .catch(err => {
      console.log(err);
    });
}

// GET SINGLE MASTER DATA SRC
function showOneMasterDataSrc(req, res) {
  console.log('SHOWONEMASTERDATASRC HIT');
  db.MasterDataSrc.findById(req.params.id)
    .then(datasrc => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(datasrc);
    })
    .catch(err => {
      console.log(err);
    });
}

// UPDATE MASTER DATA SRC
function updateMasterDataSrc(req, res) {
  console.log('UPDATEMASTERDATASRC HIT');
  db.MasterDataSrc.findByIdAndUpdate(req.params.id,
    { "$set":
      {
        "dataSourceName": req.body.dataSourceName,
        "estBytePerEvent": req.body.estBytePerEvent,
        "avgEPS": req.body.avgEPS,
        "numOfDev": req.body.numOfDev
      }
    }, { new: true }, function(err, newDoc) {
      if (err) throw err;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(newDoc);
    });
}

// DELETE MASTER DATA SRC
function deleteMasterDataSrc(req, res) {
  console.log('DELETEMASTERDATASRC HIT');
  db.MasterDataSrc.findByIdAndRemove(req.params.id, function(err, deletedDoc) {
    if (err) throw err;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json('deleted');
  });
}

module.exports = {
  handleCORS: handleCORS,
  showAllMasterDataSrcs: showAllMasterDataSrcs,
  createNewMasterDataSrc: createNewMasterDataSrc,
  showOneMasterDataSrc: showOneMasterDataSrc,
  updateMasterDataSrc: updateMasterDataSrc,
  deleteMasterDataSrc: deleteMasterDataSrc
};
