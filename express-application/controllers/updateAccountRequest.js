const helper = require('./getContractInstance')
const {helperViewAccountRequest} = require('./helperViewAccountRequest');
module.exports.updateAccountRequest = async(req,res) => {

    try {
        const {name,pan} = req.body;

        const regnetContract = await helper.getContractInstance();



        // Create a new user account
        console.log('.....Get the request of user');

        let currentUserRequest = await helperViewAccountRequest(name,pan);

        console.log('user request before updating the status is: ', currentUserRequest);

        let trails = [];
        trails.push(currentUserRequest);
        const userRequestBuffer = await regnetContract.submitTransaction('updateAccountRequest',name,pan);

        // process response
        console.log('.....Processing Update User Account Request Transaction Response \n\n');
        let userRequest = JSON.parse(userRequestBuffer.toString());
        currentUserRequest = await helperViewAccountRequest(name,pan);
        trails.push(currentUserRequest);
        console.log('User request after updating the status is:',userRequest);
        console.log(trails);
        console.log('\n\n.....Get Updated User Account Request Transaction Complete!');
        return res.status(200).send({
            user_trails:trails
        })

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

