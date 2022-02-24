const helper = require('./getContractInstance')
const {helperViewInvestorAccountRequest} = require('./helperViewInvestorAccountRequest');
module.exports.updateInvestorMobile = async(req,res) => {

    try {
        const {uccRequestId, mobileStatus} = req.body;

        const regnetContract = await helper.getContractInstance();



        // Create a new user account
        console.log('.....Get the request of Investor');

        //let currentInvestorRequest = await helperViewInvestorAccountRequest(uccRequestId);

        //console.log('investor request before updating the status is: ', currentInvestorRequest);

       // let trails = [];
       // trails.push(currentInvestorRequest);
        const investorRequestBuffer = await regnetContract.submitTransaction('updateInvestorRequestMobile',uccRequestId, mobileStatus);

        // process response
        console.log('.....Processing Update Investor Account Request Transaction Response \n\n');
        let investorRequest = JSON.parse(investorRequestBuffer.toString());
        //currentInvestorRequest = await helperViewInvestorAccountRequest(uccRequestId);
        //trails.push(currentInvestorRequest);
        console.log('Investor request after updating the status is:',investorRequest);
       // console.log(trails);
        console.log('\n\n.....Get Updated Investor Account Request Transaction Complete!');
        return res.status(200).send(investorRequest)

    } catch (error) {

        console.log(`\n\n ${error} \n\n`);
        return res.status(400).send({
            msg: "execution failed"
        })

    } finally {

        // Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

    }
}

