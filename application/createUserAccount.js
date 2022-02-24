const helper = require('./getContractInstance')
async function createUserAccount(name, pan, email, phone, legalEntity, cin) {

    try {

        const regnetContract = await helper.getContractInstance();

        // Create a new user account
        console.log('.....Create a new user account');
        const userBuffer = await regnetContract.submitTransaction('requestNewAccount',name,pan,email,phone, legalEntity, cin);

        // process response
        console.log('.....Processing Create User Account Transaction Response \n\n');
        let newUser = JSON.parse(userBuffer.toString());
        console.log(newUser);
        console.log('\n\n.....Create User Account Transaction Complete!');
        return newUser;

    } catch (error) {

        console.log(`\n\n ${error} \n\n`);
        throw new Error(error);

    } finally {

        // Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

    }
}
createUserAccount('Aakash Sahu','pan2126364', 'connect@aakashbansal.com','916713233333','admin','123abc').then(() => {
    console.log('User Account Created');
});
