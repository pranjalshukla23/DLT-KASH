const helper = require('./getContractInstance')

module.exports.getInvestorsByKey = async(req,res) => {

    try {

        console.log(req.body)

        const page = parseInt(req.body.page.toString())
        const limit = parseInt(req.body.limit.toString())

        const mobileNumber = req.body.mobileNumber;
        const panNumber = req.body.panNumber
        const TmName = req.body.TmName
        const notificationKey = req.body.notificationKey

        const regnetContract = await helper.getContractInstance();

        //console.log(regnetContract)

        // Create a new user account
        console.log('.....Get the request of investors');

        let investorsRequestBuffer;


        if (mobileNumber) {


            investorsRequestBuffer = await regnetContract.submitTransaction('getInvestorsByMobileNumber', mobileNumber);


        }

        else if (panNumber){

             investorsRequestBuffer = await regnetContract.submitTransaction('getInvestorsByPanNumber', panNumber);
        }


        else if (TmName){

             investorsRequestBuffer = await regnetContract.submitTransaction('getInvestorsByTmName', TmName);

        }

        else if (notificationKey){

             investorsRequestBuffer = await regnetContract.submitTransaction('getInvestorsByNotificationKey', notificationKey);

        }
        else{
            investorsRequestBuffer = await regnetContract.submitTransaction('getInvestors');
        }


       
        

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

        results.key = page

        results.limit = limit

        

        results.results = investorsRequest.slice(startIndex, endIndex)

        results.records = investorsRequest.length


        console.log('\n\n.....Get Investor Account Request Transaction Complete!');
        res.json(results)

    } catch (error) {

        console.log(`\n\n ${error.stack} \n\n`);

        res.status(400).send({
            msg: "no data present"
        })

    } finally {

        // Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

    }
}

