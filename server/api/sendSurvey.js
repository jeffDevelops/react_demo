const express = require('express');
const router = express.Router();

const sendSurveyController = require('../controllers/sendSurvey');

router.route('/api/sendEmail')
  .post(sendSurveyController.sendSurvey);

router.route('/*')
  // HANDLE CORS
  .options(sendSurveyController.handleCORS);
  
module.exports = router;
