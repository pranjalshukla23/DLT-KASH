//const helper = require('./getContractInstance.js')

//const regnetContract = await helper.getContractInstance();
//create a user account
module.exports.createInvestorHelper
    = async (investorObj, regnetContract) => {


    //console.log(investorObj)
    try {



        // Create a new user account
        console.log('.....Create a new investor account');
        const userBuffer = await regnetContract.submitTransaction('createInvestor', investorObj.uccTmId,
            investorObj.uccTmName,
            investorObj.uccPanExempt,
            investorObj.uccPanNo,
            investorObj.uccCountry,
            investorObj.uccRequestId,
            investorObj.uccMobileNo,
            investorObj.uccEmailId,
            investorObj.uccMobileNoModified,
            investorObj.uccEmailIdModified,
            investorObj.uccDpId,
            investorObj.uccClientId,
            investorObj.uccInvestorCode,
            investorObj.uccRequestType,
            investorObj.uccNodeStatus,
            investorObj.uccEmailStatus,
            investorObj.uccMobileStatus,
            investorObj.uccPanStatus,
            investorObj.emailAttempts,
            investorObj.mobileAttempts,
            investorObj.isEmailEncrypted,
            investorObj.isPhoneEncrypted,
            investorObj.UTCNotification);


        //return JSON.parse(userBuffer.toString())

    } catch (e) {

        console.log(e)
    }
}