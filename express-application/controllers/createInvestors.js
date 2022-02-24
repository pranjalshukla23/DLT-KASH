const helper = require('./getContractInstance.js')


const fs = require('fs');

async function delay(){

    setTimeout(()=>{
        console.log('delayed')
    },10000)
}
//helper function
const getResult = async (object) => {


    const regnetContract = await helper.getContractInstance();

    //await delay()


    // Create a new user account
    console.log('.....Create a new user account');
    const bulkData = await regnetContract.submitTransaction('createInvestors',
        object.uccTmId,
        object.uccTmName,
        object.uccPanExempt,
        object.uccPanNo,
        object.uccCountry,
        object.uccMobileNo,
        object.uccEmailId,
        object.uccMobileNoModified,
        object.uccEmailIdModified,
        object.uccDpId,
        object.uccClientId,
        object.uccRequestId,
        object.uccRequestType,
        object.uccNodeStatus,
        object.uccEmailStatus,
        object.uccInvestorCode,
        object.uccMobileStatus,
        object.uccPanStatus,
        object.emailAttempts,
        object.mobileAttempts,
        object.isEmailEncrypted,
        object.isPhoneEncrypted,
        object.UTCNotification);

    //await delay()

    // process response
    console.log('.....Processing Create User Account Transaction Response \n\n');
    let newUsers = JSON.parse(bulkData.toString());
    console.log('new users:',newUsers);
    console.log('\n\n.....Create User Account Transaction Complete!');

    return newUsers;


}

//create a user account
module.exports.createInvestors = async (req, res) => {



    try {

        req.setTimeout(660000)

        const inventoryData = req.body.investorsData;

        console.log('inventory data: ', inventoryData)

        console.log(inventoryData.length)


        let result = [];


        for(let i=0; i < inventoryData.length; i++){

            //console.log('object is:', inventoryData[i])

            //await delay()

            let data = await getResult(inventoryData[i])

            //await delay()

            //console.log('data is:', data)

            result.push(data)



        }

        console.log('array is:', result)

        console.log('length is: ', result.length)


        return res.status(200).send({
            message:'ok'
        })

    } catch (error) {

        console.log(`'The error is: \n\n ${error} \n\n`);
        console.log(error.stack)
       return res.status(400).send({
           message: error
       })

    } finally {

        // Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

    }
}


