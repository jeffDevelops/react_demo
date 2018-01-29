/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();

const customerDataSrcController = require('../controllers/customerDataSrcs');

router.route('/api/customer_data_srcs')
      // GET ALL DATA SRCS
      .get(customerDataSrcController.showAllCustomerDataSrcs)
      // SAVE NEW L DATA SRC
      .post(customerDataSrcController.createNewCustomerDataSrc);

router.route('/api/customer_data_srcs/:id')
      // GET SINGLE L DATA SRC
      .get(customerDataSrcController.showOneCustomerDataSrc)
      // UPDATE L DATA SRC
      .put(customerDataSrcController.updateCustomerDataSrc)
      // DELETE L DATA SRC
      .delete(customerDataSrcController.deleteCustomerDataSrc);

router.route('/*')
      // HANDLE CORS
      .options(customerDataSrcController.handleCORS);

module.exports = router;
