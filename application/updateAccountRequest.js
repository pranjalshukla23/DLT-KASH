const helper = require('./getContractInstance')
const viewAccountRequest = require('./viewAccountRequest');
async function updateAccountRequest(name, pan) {

    try {

        const regnetContract = await helper.getContractInstance();



        // Create a new user account
        console.log('.....Get the request of user');

        let currentUserRequest = await viewAccountRequest(name,pan);

        console.log('user request before updating the status is: ', currentUserRequest);

        let trails = [];
        trails.push(currentUserRequest);
        const userRequestBuffer = await regnetContract.submitTransaction('updateAccountRequest',name,pan);

        // process response
        console.log('.....Processing Update User Account Request Transaction Response \n\n');
        let userRequest = JSON.parse(userRequestBuffer.toString());
        currentUserRequest = await viewAccountRequest(name,pan);
        trails.push(currentUserRequest);
        console.log('User request after updating the status is:',userRequest);
        console.log(trails);
        console.log('\n\n.....Get Updated User Account Request Transaction Complete!');
        return userRequest;

    } catch (error) {

        console.log(`\n\n ${error} \n\n`);
        throw new Error(error);

    } finally {

        // Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

    }
}
updateAccountRequest('Aakash Sahu','pan2126364').then(() => {
    console.log('Updated User Account Request Fetched');
});