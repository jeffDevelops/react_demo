/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();

const masterDataSrcController = require('../controllers/masterDataSrcs');

router.route('/api/master_data_srcs')
      // GET ALL DATA SRCS
      .get(masterDataSrcController.showAllMasterDataSrcs)
      // SAVE NEW DATA SRC
      .post(masterDataSrcController.createNewMasterDataSrc);

router.route('/api/master_data_srcs/:id')
      // GET SINGLE DATA SRC
      .get(masterDataSrcController.showOneMasterDataSrc)
      // UPDATE DATA SRC
      .put(masterDataSrcController.updateMasterDataSrc)
      // DELETE DATA SRC
      .delete(masterDataSrcController.deleteMasterDataSrc);

router.route('/*')
      // HANDLE CORS
      .options(masterDataSrcController.handleCORS);

module.exports = router;
