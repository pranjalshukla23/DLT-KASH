const helper = require("./getContractInstance");
module.exports.helperViewAccountRequest = async(name,pan) => {

    try {


        const regnetContract = await helper.getContractInstance();

        // Create a new user account
        console.log('.....Get the request of user');
        const userRequestBuffer = await regnetContract.submitTransaction('viewAccountRequest',name,pan);

        // process response
        console.log('.....Processing Get User Account Request Transaction Response \n\n');
        let userRequest = JSON.parse(userRequestBuffer.toString());
        console.log('The user request is :', userRequest);
        console.log('\n\n.....Get User Account Request Transaction Complete!');
        return userRequest

    } catch (error) {

        console.log(`\n\n ${error} \n\n`);
        throw new Error(error);

    } finally {

        // Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

    }
}