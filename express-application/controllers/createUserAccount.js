const helper = require('./getContractInstance.js')

//create a user account
module.exports.createUserAccount= async (req,res) =>{

    const {legalEntityName,sebiCertificateNumber, cinNumber, panNumber, sebiCertificate, cinCertificate,pan, logo, phoneNumber, isFirstExchangeAdmin, userName, email, password } = req.body;

    try {

        const regnetContract = await helper.getContractInstance();

        // Create a new user account
        console.log('.....Create a new user account');
        const userBuffer = await regnetContract.submitTransaction('requestNewAccount',legalEntityName,sebiCertificateNumber, cinNumber, panNumber, sebiCertificate, cinCertificate,pan, logo, phoneNumber, isFirstExchangeAdmin, userName, email, password );

        // process response
        console.log('.....Processing Create User Account Transaction Response \n\n');
        let newUser = JSON.parse(userBuffer.toString());
        console.log(newUser);
        console.log('\n\n.....Create User Account Transaction Complete!');
        return res.status(200).send(newUser);

    } catch (error) {

        console.log(`\n\n ${error} \n\n`);
        return res.status(400).send({
            message: "execution failed"
        })

    } finally {

        // Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

    }
}