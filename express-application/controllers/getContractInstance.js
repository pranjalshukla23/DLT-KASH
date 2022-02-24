const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
let gateway;

async function delay(){

    setTimeout(()=>{
        console.log('delayed')
    },700000)
}
async function getContractInstance() {

    // A gateway defines which peer is used to access Fabric network
    // It uses a common connection profile (CCP) to connect to a Fabric Peer
    // A CCP is defined manually in file connection-profile-mhrd.yaml
    gateway = new Gateway();

    // A wallet is where the credentials to be used for this transaction exist
    // Credentials for user MHRD_ADMIN was initially added to this wallet.
    const wallet = new FileSystemWallet('/home/upgrad/workspace/Final-hyperledger-fabric-folder/property-registration/express-application/identity/users');

    // What is the username of this Client user accessing the network?
    const fabricUserName = 'USER_ADMIN';

    // Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.
    let connectionProfile = yaml.safeLoad(fs.readFileSync('/home/upgrad/workspace/Final-hyperledger-fabric-folder/property-registration/express-application/controllers/common-connection-profile.yaml', 'utf8'));

    // Set connection options; identity and wallet
    let connectionOptions = {
        wallet: wallet,
        identity: fabricUserName,
        discovery: { enabled: false, asLocalhost: true }
    };

    // Connect to gateway using specified parameters
    console.log('.....Connecting to Fabric Gateway');
    await gateway.connect(connectionProfile, connectionOptions);

    //await delay()

    // Access certification channel
    console.log('.....Connecting to channel - registrationchannel');
    const channel = await gateway.getNetwork('registrationchannel');

    //await delay()
    // Get instance of deployed Certnet contract
    // @param Name of chaincode
    // @param Name of smart contract
    console.log('.....Connecting to Regnet Smart Contract');
    return channel.getContract('regnet', 'org.property-registration-network.user');
}
async function disconnect() {
    console.log('.....Disconnecting from Fabric Gateway');
    await gateway.disconnect();
}

module.exports.getContractInstance = getContractInstance;
module.exports.disconnect = disconnect;