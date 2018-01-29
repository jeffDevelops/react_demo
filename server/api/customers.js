/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customers');

router.route('/api/customers')
      // GET ALL CUSTOMERS
      .get(customerController.showAllCustomers)
      // SAVE NEW CUSTOMER
      .post(customerController.createNewCustomer);

router.route('/api/customers/:id')
      // GET SINGLE CUSTOMER
      .get(customerController.showOneCustomer)
      // UPDATE CUSTOMER
      .put(customerController.updateCustomer)
      // DELETE CUSTOMER
      .delete(customerController.deleteCustomer);

router.route('/*')
      // HANDLE CORS
      .options(customerController.handleCORS);

module.exports = router;
