//express
const express = require('express');

//router
const router = express.Router();


//controllers
const {addToWallet} = require('../controllers/addToUserWallet.js');
const {createUserAccount} = require('../controllers/createUserAccount.js')
const {viewAccountRequest} = require('../controllers/viewAccountRequest.js');
const {updateAccountRequest} = require("../controllers/updateAccountRequest");
const {createInvestor} = require("../controllers/createInvestor");
const {createInvestors} = require("../controllers/createInvestors");
const {viewInvestorRequest} = require("../controllers/viewInvestorRequest");
const {updateInvestorEmail} = require('../controllers/updateInvestorEmail')
const{updateInvestorMobile} = require("../controllers/updateInvestorMobile")
const {getInvestors} = require("../controllers/getInvestors");
const {getInvestorsByNotificationKeyAndLimit} = require('../controllers/getInvestorsByNotificationKeyAndLimit')
const {getInvestorsByPanNumberAndLimit} = require("../controllers/getInvestorsByPanNumberAndLimit");
const {getInvestorsByTmNameAndLimit} = require("../controllers/getInvestorsByTmNameAndLimit");
const {getInvestorsByKey} = require("../controllers/getInvestorsByKey");
const { verifyQueueData } = require('../controllers/verifyQueueData.js');

//post request
router.post('/addToWallet', addToWallet);

//post request
router.post('/createInvestor', createInvestor);
//post request
router.post('/createInvestors', createInvestors);

//post request
router.post('/createUserAccount', createUserAccount);

//post request
router.post('/viewAccountRequest', viewAccountRequest);

//post request
router.post('/updateAccountRequest', updateAccountRequest)

//get request
router.get('/viewInvestorRequest/:uccRequestId', viewInvestorRequest)

//put request
router.put('/updateInvestorEmailStatus', updateInvestorEmail)

//put request
router.put('/updateInvestorMobileStatus', updateInvestorMobile)

//get request
router.get('/getInvestors', getInvestors)

//post request
router.post('/getInvestorsByNotificationKeyAndLimit', getInvestorsByNotificationKeyAndLimit)

//post request
router.post('/getInvestorsByPanNumberAndLimit', getInvestorsByPanNumberAndLimit)

//post request
router.post('/getInvestorsByTmNameAndLimit', getInvestorsByTmNameAndLimit)

//post request
router.post('/getInvestorsByKey', getInvestorsByKey)

//get request
router.get('/verifyQueueData',verifyQueueData)

module.exports = router;