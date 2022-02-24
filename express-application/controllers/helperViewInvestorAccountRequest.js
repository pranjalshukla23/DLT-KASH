const helper = require("./getContractInstance");
module.exports.helperViewInvestorAccountRequest = async(uccRequestId) => {

    try {


        const regnetContract = await helper.getContractInstance();

        // Create a new user account
        console.log('.....Get the request of investor');
        const investorRequestBuffer = await regnetContract.submitTransaction('viewInvestorRequest',uccRequestId);

        // process response
        console.log('.....Processing Get investor Account Request Transaction Response \n\n');
        let investorRequest = JSON.parse(investorRequestBuffer.toString());
        console.log('The investor request is :', investorRequest);
        console.log('\n\n.....Get Investor Account Request Transaction Complete!');
        return investorRequest

    } catch (error) {

        console.log(`\n\n ${error} \n\n`);
        throw new Error(error);

    } finally {

        // Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

    }
}