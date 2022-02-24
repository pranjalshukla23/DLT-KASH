const helper = require('./getContractInstance')

module.exports.getInvestorsByPanNumberAndLimit = async(req,res) => {

    try {

        const page = parseInt(req.body.page)
        const limit = parseInt(req.body.limit)

        const panNumber = req.body.panNumber;

        console.log(panNumber)

        const regnetContract = await helper.getContractInstance();

        //console.log(regnetContract)

        // Create a new user account
        console.log('.....Get the request of investors');
        const investorsRequestBuffer = await regnetContract.submitTransaction('getInvestorsByPanNumber', panNumber);

        // process response
        console.log('.....Processing Get Investor Account Request Transaction Response \n\n');
        let investorsRequest = JSON.parse(investorsRequestBuffer.toString());
        console.log('The investor request is :', investorsRequest.length);

        console.log(investorsRequest)


        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < investorsRequest.length) {

            results.next = {
                page: page + 1,
                limit: limit
            }
        }


        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        results.results = investorsRequest.slice(startIndex, endIndex)


        console.log('\n\n.....Get Investor Account Request Transaction Complete!');
        res.json(results)

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

