var nodemailer = require('nodemailer');

// HANDLE CORS
function handleCORS(req, res, next) {
  console.log('HANDLECORS HIT');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
}

function sendSurvey(req, res) {
  console.log("send survey hit!!");
  console.log(req.body.email);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jeremy.verdolino@guidepointsecurity.com',
      pass: 'mzdsrjuxsapbdwkp'
    }
  });

  var mailOptions = {
    from: 'jeremy.verdolino@guidepointsecurity.com',
    to: req.body.email,
    subject: 'Test Email',
    html: '<h1>TEST TEST TEST</h1>'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


module.exports = {
  sendSurvey: sendSurvey,
  handleCORS: handleCORS
};
