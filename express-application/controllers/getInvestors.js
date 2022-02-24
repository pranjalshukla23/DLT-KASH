const helper = require('./getContractInstance')
module.exports.getInvestors = async(req,res) => {

    try {


        const regnetContract = await helper.getContractInstance();

        //console.log(regnetContract)

        // Create a new user account
        console.log('.....Get the request of investors');
        const investorsRequestBuffer = await regnetContract.submitTransaction('getInvestors');

        // process response
        console.log('.....Processing Get Investor Account Request Transaction Response \n\n');
        let investorsRequest = JSON.parse(investorsRequestBuffer.toString());
        console.log('The investor request is :', investorsRequest.length);

        console.log('\n\n.....Get Investor Account Request Transaction Complete!');
        return res.status(200).send(investorsRequest)

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

