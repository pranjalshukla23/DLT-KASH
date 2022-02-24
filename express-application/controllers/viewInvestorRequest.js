const helper = require('./getContractInstance')
module.exports.viewInvestorRequest = async(req,res) => {

    try {

        const uccRequestId = req.params.uccRequestId;
        console.log(uccRequestId)

        const regnetContract = await helper.getContractInstance();

        // Create a new user account
        console.log('.....Get the request of investor');
        const investorRequestBuffer = await regnetContract.submitTransaction('viewInvestorRequest',uccRequestId);

        // process response
        console.log('.....Processing Get Investor Account Request Transaction Response \n\n');
        let investorRequest = JSON.parse(investorRequestBuffer.toString());
        console.log('The user request is :', investorRequest);
        console.log('\n\n.....Get Investor Account Request Transaction Complete!');
        return res.status(200).send(investorRequest)

    } catch (error) {

        console.log(`\n\n ${error} \n\n`);

        res.status(400).send({
            msg: "execution failed"
        })

    } finally {

        // Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

    }
}
/*viewAccountRequest('Aakash','pan2126364').then(() => {
    console.log('User Account Request Fetched');
});*/
