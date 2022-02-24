const helper = require('./getContractInstance.js')

//create a user account
module.exports.createInvestor
    = async (req,res) =>{

    const {uccRequestId, uccTmId, uccTmName, uccPanExempt, uccPanNo, uccCountry, uccMobileNo, uccEmailId, uccMobileNoModified, uccEmailIdModified, uccDpId, uccClientId, uccInvestorCode, uccRequestType, uccNodeStatus, uccEmailStatus, uccMobileStatus, uccPanStatus, emailAttempts, mobileAttempts, isEmailEncrypted, isPhoneEncrypted, UTCNotification } = req.body;

    console.log(req.body)
    try {

        const regnetContract = await helper.getContractInstance();

        // Create a new user account
        console.log('.....Create a new investor account');
        const userAsset = await regnetContract.submitTransaction('createInvestor',uccRequestId, uccTmId, uccTmName, uccPanExempt, uccPanNo, uccCountry, uccMobileNo, uccEmailId, uccMobileNoModified, uccEmailIdModified, uccDpId, uccClientId, uccInvestorCode, uccRequestType, uccNodeStatus, uccEmailStatus, uccMobileStatus, uccPanStatus, emailAttempts, mobileAttempts, isEmailEncrypted, isPhoneEncrypted, UTCNotification);

        // process response
        console.log('.....Processing Create investor Account Transaction Response \n\n');
        console.log('\n\n.....Create User investor Transaction Complete!');
        return res.status(200).send({
            msg: "request successful"
        });

    } catch (error) {

        console.log(`\n\n ${error} \n\n`);
        console.log(error.stack)
        return res.status(400).send({
            msg:"execution failed"
        })

    } finally {

        // Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

    }
}
