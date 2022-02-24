const fs = require('fs'); // FileSystem Library
const { FileSystemWallet, X509WalletMixin } = require('fabric-network'); // Wallet Library provided by Fabric
const path = require('path'); // Support library to build filesystem paths in NodeJs

const crypto_materials = path.resolve(__dirname, '../network/crypto-config'); // Directory where all Network artifacts are stored

// A wallet is a filesystem path that stores a collection of Identities
const wallet = new FileSystemWallet('./identity/users');


module.exports.addToWallet = async(req, res) =>{

    //get certificate path
    const certificatePath = req.body.certificatePath;

    //get private key path
    const privateKeyPath = req.body.privateKeyPath;

    // Main try/catch block
    try {

        // Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
        const certificate = fs.readFileSync(certificatePath).toString();
        // IMPORTANT: Change the private key name to the key generated on your computer
        const privatekey = fs.readFileSync(privateKeyPath).toString();

        // Load credentials into wallet
        //giving a label
        const identityLabel = 'USER_ADMIN';
        //creating an identity with label, certificate  and private key
        const identity = X509WalletMixin.createIdentity('usersMSP', certificate, privatekey);

        //storing the identity to wallet with identity label
        await wallet.import(identityLabel, identity);

        res.send({
            msg: 'user identity added to wallet'
        })

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
        throw new Error(error);
    }
}

/*
main('/home/upgrad/workspace/Final-hyperledger-fabric-folder/property-registration/network/crypto-config/peerOrganizations/users.property-registration-network.com/users/Admin@users.property-registration-network.com/msp/signcerts/Admin@users.property-registration-network.com-cert.pem','/home/upgrad/workspace/Final-hyperledger-fabric-folder/property-registration/network/crypto-config/peerOrganizations/users.property-registration-network.com/users/Admin@users.property-registration-network.com/msp/keystore/b8bd8cb2ad607eafb92b356d043e32b082b656f04edab21080f38d0e2d269b3a_sk').then(() => {
    console.log('User identity added to wallet.');
});*/
