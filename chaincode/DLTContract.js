'use strict';

const {Contract} = require("fabric-contract-api");

class DLTContract extends Contract {

    constructor() {
        //providing a custom name for contract
        super("org.property-registration-network.user");
        this.investorData = [];
    }

    //instantiation function
    async instantiate(ctx) {

        console.log("user contract deployed successfully");
    }

    //function to request a new user
    async requestNewAccount(ctx, legalEntityName, sebiCertificateNumber, cinNumber, panNumber, sebiCertificate, cinCertificate, pan, logo, phoneNumber, isFirstExchangeAdmin, userName, email, password) {

        //key to uniquely identify the asset
        //ledger id
        const requestKey = ctx.stub.createCompositeKey("org.property-registration-network.user.request", [userName + "-" + panNumber]);

        //request asset
        let request = {
            createdAt: new Date(),
            legalEntityName: legalEntityName,
            sebiCertificateNumber: sebiCertificateNumber,
            cinNumber: cinNumber,
            panNumber: panNumber,
            sebiCertificate: sebiCertificate,
            cinCertificate: cinCertificate,
            pan: pan,
            logo: logo,
            phoneNumber: phoneNumber,
            isFirstExchangeAdmin: isFirstExchangeAdmin,
            userName: userName,
            email: email,
            password: password
        }

        //converting asset to buffer to store in blockchain
        let requestBuffer = Buffer.from(JSON.stringify(request));

        //storing asset on blockchain with the uniquely generated key
        await ctx.stub.putState(requestKey, requestBuffer);

        //return the asset after converting it to json
        return JSON.parse(requestBuffer.toString());
    }

    //function to view user request
    async viewAccountRequest(ctx, userName, panNumber) {

        //get the composite key of asset
        const userRequestAssetKey = ctx.stub.createCompositeKey("org.property-registration-network.user.request", [userName + "-" + panNumber]);

        //fetch the asset with that composite key
        let userRequestAsset = await ctx.stub.getState(userRequestAssetKey);

        //if asset not present
        if (userRequestAsset.length === 0) {

            throw new Error("User Request with specified request ID does not exist")
        }

        //convert the asset to json and return it
        return JSON.parse(userRequestAsset.toString());
    }


    //function to update user request
    async updateAccountRequest(ctx, userName, panNumber) {

        //get the composite key of asset
        const userRequestAssetKey = ctx.stub.createCompositeKey("org.property-registration-network.user.request", [userName + "-" + panNumber]);

        //fetch the asset with that composite key
        let userRequestAsset = await ctx.stub.getState(userRequestAssetKey);

        //if asset not present
        if (userRequestAsset.length === 0) {

            throw new Error("User Request with specified request ID does not exist")
        }


        //convert the buffer asset to json and return it
        let userRequestObject = JSON.parse(userRequestAsset.toString());

        console.log('user request before updating the status is: ', userRequestObject);

        //updating the status
        userRequestObject.status = "active";

        console.log('user request after updating the status is: ', userRequestObject);
        //converting asset to buffer to store in blockchain
        let requestBuffer = Buffer.from(JSON.stringify(userRequestObject));



        //storing asset on blockchain with the uniquely generated key
        await ctx.stub.putState(userRequestAssetKey, requestBuffer);

        return userRequestObject;

    }


    //function to create user
    //function to request a new investor
    async createInvestor(ctx, uccRequestId, uccTmId, uccTmName, uccPanExempt, uccPanNo, uccCountry, uccMobileNo, uccEmailId, uccMobileNoModified, uccEmailIdModified, uccDpId, uccClientId, uccInvestorCode, uccRequestType, uccNodeStatus, uccEmailStatus, uccMobileStatus, uccPanStatus, emailAttempts, mobileAttempts, isEmailEncrypted, isPhoneEncrypted, UTCNotification) {

        
    try{

//key to uniquely identify the asset
        //ledger id
        const requestKey = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccRequestId]);

        let request;

        let ledgerId1;
        let ledgerId2;


        //get investor
        let requestObject = ctx.stub.getState(requestKey)

        // if request id exists
        if(requestObject.length > 0){

            throw new Error("Investor Request with specified request ID already exist")
        
        }

        

        //if pan is present
        if (uccPanExempt === "true") {

            //create ledger id 1
            ledgerId1 = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccDpId + "-" + uccClientId]);
            //create ledger id 2
            ledgerId2 = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccDpId + "-" + uccEmailId + "-" + uccMobileNo + "-" + uccClientId]);


            //if this is the first investor
          //  if(this.investorData.length === 0){

                //request asset
            request = {
                uccRequestId: uccRequestId,
                uccTmId: uccTmId,
                uccTmName: uccTmName,
                uccPanExempt: uccPanExempt,
                uccPanNo:  '',
                uccCountry: uccCountry,
                uccMobileNo: uccMobileNo,
                uccEmailId: uccEmailId,
                uccMobileNoModified: uccMobileNoModified,
                uccEmailIdModified: uccEmailIdModified,
                uccDpId: uccDpId ,
                uccClientId: uccClientId ,
                uccInvestorCode: uccInvestorCode,
                uccRequestType: uccRequestType,
                uccNodeStatus: uccNodeStatus,
                uccEmailStatus: uccEmailStatus,
                uccMobileStatus: uccMobileStatus,
                uccPanStatus: uccPanStatus,
                emailAttempts: emailAttempts || "0",
                mobileAttempts: mobileAttempts || "0",
                ledgerId1: ledgerId1,
                ledgerId2: ledgerId2,
                isEmailEncrypted: isEmailEncrypted, 
                isPhoneEncrypted: isPhoneEncrypted, 
                UTCNotification: UTCNotification
            }

            this.investorData.push(request)


            //converting asset to buffer to store in blockchain
            let requestBuffer = Buffer.from(JSON.stringify(request));

            //storing asset on blockchain with the uniquely generated key
            await ctx.stub.putState(requestKey, requestBuffer);
console.log('**************', request)
            //return the asset after converting it to json
            return request;

        //    }

//             //go over the records of investors
//          for(let i = 0; i < this.investorData.length; i++){

//             if(this.investorData[i].ledgerId1 == ledgerId1 && this.investorData[i].uccEmailId == uccEmailId && this.investorData[i].uccMobileNo == uccMobileNo){

                
//             //request asset
//             request = {
//                 uccRequestId: uccRequestId,
//                 uccTmId: uccTmId,
//                 uccTmName: uccTmName,
//                 uccPanExempt: uccPanExempt,
//                 uccPanNo: uccPanNo || '',
//                 uccCountry: uccCountry,
//                 uccMobileNo: uccMobileNo,
//                 uccEmailId: uccEmailId,
//                 uccMobileNoModified: uccMobileNoModified,
//                 uccEmailIdModified: uccEmailIdModified,
//                 uccDpId: uccDpId || '',
//                 uccClientId: uccClientId || '',
//                 uccInvestorCode: uccInvestorCode,
//                 uccRequestType: uccRequestType,
//                 uccNodeStatus: uccNodeStatus,
//                 uccEmailStatus: "VERIFIED",
//                 uccMobileStatus: "VERIFIED",
//                 uccPanStatus: uccPanStatus,
//                 emailAttempts: emailAttempts || '0',
//                 mobileAttempts: mobileAttempts || '0',
//                 ledgerId1: ledgerId1,
//                 ledgerId2: ledgerId2,
//                 isEmailEncrypted: isEmailEncrypted, 
//                 isPhoneEncrypted: isPhoneEncrypted, 
//                 UTCNotification: UTCNotification
//             }

//             this.investorData.push(request)


//             //converting asset to buffer to store in blockchain
//             let requestBuffer = Buffer.from(JSON.stringify(request));

//             //storing asset on blockchain with the uniquely generated key
//             await ctx.stub.putState(requestKey, requestBuffer);

//             //return the asset after converting it to json
//             return request;
                  
//         }
        
//         else if(this.investorData[i].ledgerId1 == ledgerId1 && this.investorData[i].uccEmailId == uccEmailId && this.investorData[i].uccMobileNo != uccMobileNo){

                
//             //request asset
//    request = {
//        uccRequestId: uccRequestId,
//        uccTmId: uccTmId,
//        uccTmName: uccTmName,
//        uccPanExempt: uccPanExempt,
//        uccPanNo: uccPanNo ||'',
//        uccCountry: uccCountry,
//        uccMobileNo: uccMobileNo,
//        uccEmailId: uccEmailId,
//        uccMobileNoModified: uccMobileNoModified,
//        uccEmailIdModified: uccEmailIdModified,
//        uccDpId: uccDpId || '',
//        uccClientId: uccClientId || '',
//        uccInvestorCode: uccInvestorCode,
//        uccRequestType: uccRequestType,
//        uccNodeStatus: uccNodeStatus,
//        uccEmailStatus: "VERIFIED",
//        uccMobileStatus: "NOT VERIFIED",
//        uccPanStatus: uccPanStatus,
//        emailAttempts: emailAttempts || '0',
//        mobileAttempts: mobileAttempts || '0',
//        ledgerId1: ledgerId1,
//        ledgerId2: ledgerId2,
//        isEmailEncrypted: isEmailEncrypted, 
//        isPhoneEncrypted: isPhoneEncrypted, 
//        UTCNotification: UTCNotification
//    }

//    this.investorData.push(request)


//    //converting asset to buffer to store in blockchain
//    let requestBuffer = Buffer.from(JSON.stringify(request));

//    //storing asset on blockchain with the uniquely generated key
//    await ctx.stub.putState(requestKey, requestBuffer);

//    //return the asset after converting it to json
//    return request;

// }   else if(this.investorData[i].ledgerId1 == ledgerId1 && this.investorData[i].uccEmailId != uccEmailId && this.investorData[i].uccMobileNo == uccMobileNo){



//        //request asset
//        request = {
//         uccRequestId: uccRequestId,
//         uccTmId: uccTmId,
//         uccTmName: uccTmName,
//         uccPanExempt: uccPanExempt,
//         uccPanNo: uccPanNo ||'',
//         uccCountry: uccCountry,
//         uccMobileNo: uccMobileNo,
//         uccEmailId: uccEmailId,
//         uccMobileNoModified: uccMobileNoModified,
//         uccEmailIdModified: uccEmailIdModified,
//         uccDpId: uccDpId || '',
//         uccClientId: uccClientId || '',
//         uccInvestorCode: uccInvestorCode,
//         uccRequestType: uccRequestType,
//         uccNodeStatus: uccNodeStatus,
//         uccEmailStatus: "NOT VERIFIED",
//         uccMobileStatus: "VERIFIED",
//         uccPanStatus: uccPanStatus,
//         emailAttempts: emailAttempts || '0',
//         mobileAttempts: mobileAttempts || '0',
//         ledgerId1: ledgerId1,
//         ledgerId2: ledgerId2,
//         isEmailEncrypted: isEmailEncrypted, 
//         isPhoneEncrypted: isPhoneEncrypted, 
//         UTCNotification: UTCNotification
//         }
        
//         this.investorData.push(request)
        
        
//         //converting asset to buffer to store in blockchain
//         let requestBuffer = Buffer.from(JSON.stringify(request));
        
//         //storing asset on blockchain with the uniquely generated key
//         await ctx.stub.putState(requestKey, requestBuffer);
        
//         //return the asset after converting it to json
//           return request;
//     }
// }


            
} else if (uccPanExempt === "false") {
    console.log('**************', uccPanExempt)
            //create ledger id 1
            ledgerId1 = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccPanNo]);
            //create ledger id 2
            ledgerId2 = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccEmailId + "-" + uccMobileNo + "-" + uccPanNo]);

            //if this is the first investor
           // if(this.investorData.length === 0){

                //request asset
            request = {
                uccRequestId: uccRequestId,
                uccTmId: uccTmId,
                uccTmName: uccTmName,
                uccPanExempt: uccPanExempt,
                uccPanNo: uccPanNo ||'',
                uccCountry: uccCountry,
                uccMobileNo: uccMobileNo,
                uccEmailId: uccEmailId,
                uccMobileNoModified: uccMobileNoModified,
                uccEmailIdModified: uccEmailIdModified,
                uccDpId: uccDpId || '',
                uccClientId: uccClientId || '',
                uccInvestorCode: uccInvestorCode,
                uccRequestType: uccRequestType,
                uccNodeStatus: uccNodeStatus,
                uccEmailStatus: uccEmailStatus,
                uccMobileStatus: uccMobileStatus,
                uccPanStatus: uccPanStatus,
                emailAttempts: emailAttempts || '0',
                mobileAttempts: mobileAttempts || '0',
                ledgerId1: ledgerId1,
                ledgerId2: ledgerId2,
                isEmailEncrypted: isEmailEncrypted, 
                isPhoneEncrypted: isPhoneEncrypted, 
                UTCNotification: UTCNotification
            }

            this.investorData.push(request)


            //converting asset to buffer to store in blockchain
            let requestBuffer = Buffer.from(JSON.stringify(request));

            //storing asset on blockchain with the uniquely generated key
            await ctx.stub.putState(requestKey, requestBuffer);

            //return the asset after converting it to json
           return request;

       // }

//           //go over the records of investors
//          for(let i= 0; i < this.investorData.length; i++){

//             if(this.investorData[i].ledgerId1 == ledgerId1 && this.investorData[i].uccEmailId == uccEmailId && this.investorData[i].uccMobileNo == uccMobileNo){

                
//             //request asset
//             request = {
//                 uccRequestId: uccRequestId,
//                 uccTmId: uccTmId,
//                 uccTmName: uccTmName,
//                 uccPanExempt: uccPanExempt,
//                 uccPanNo: uccPanNo ||'',
//                 uccCountry: uccCountry,
//                 uccMobileNo: uccMobileNo,
//                 uccEmailId: uccEmailId,
//                 uccMobileNoModified: uccMobileNoModified,
//                 uccEmailIdModified: uccEmailIdModified,
//                 uccDpId: uccDpId || '',
//                 uccClientId: uccClientId || '',
//                 uccInvestorCode: uccInvestorCode,
//                 uccRequestType: uccRequestType,
//                 uccNodeStatus: uccNodeStatus,
//                 uccEmailStatus: "VERIFIED",
//                 uccMobileStatus: "VERIFIED",
//                 uccPanStatus: uccPanStatus,
//                 emailAttempts: emailAttempts || '0',
//                 mobileAttempts: mobileAttempts || '0',
//                 ledgerId1: ledgerId1,
//                 ledgerId2: ledgerId2,
//                 isEmailEncrypted: isEmailEncrypted, 
//                 isPhoneEncrypted: isPhoneEncrypted, 
//                 UTCNotification: UTCNotification
//             }

//             this.investorData.push(request)


//             //converting asset to buffer to store in blockchain
//             let requestBuffer = Buffer.from(JSON.stringify(request));

//             //storing asset on blockchain with the uniquely generated key
//             await ctx.stub.putState(requestKey, requestBuffer);

//             //return the asset after converting it to json
//             return request;
                  
//         }
        
//         else if(this.investorData[i].ledgerId1 == ledgerId1 && this.investorData[i].uccEmailId == uccEmailId && this.investorData[i].uccMobileNo != uccMobileNo){

                
//             //request asset
//    request = {
//        uccRequestId: uccRequestId,
//        uccTmId: uccTmId,
//        uccTmName: uccTmName,
//        uccPanExempt: uccPanExempt,
//        uccPanNo: uccPanNo||'',
//        uccCountry: uccCountry,
//        uccMobileNo: uccMobileNo,
//        uccEmailId: uccEmailId,
//        uccMobileNoModified: uccMobileNoModified,
//        uccEmailIdModified: uccEmailIdModified,
//        uccDpId: uccDpId || '',
//        uccClientId: uccClientId || '',
//        uccInvestorCode: uccInvestorCode,
//        uccRequestType: uccRequestType,
//        uccNodeStatus: uccNodeStatus,
//        uccEmailStatus: "VERIFIED",
//        uccMobileStatus: "NOT VERIFIED",
//        uccPanStatus: uccPanStatus,
//        emailAttempts: emailAttempts || '0',
//        mobileAttempts: mobileAttempts || '0',
//        ledgerId1: ledgerId1,
//        ledgerId2: ledgerId2,
//        isEmailEncrypted: isEmailEncrypted, 
//        isPhoneEncrypted: isPhoneEncrypted, 
//        UTCNotification: UTCNotification
//    }

//    this.investorData.push(request)


//    //converting asset to buffer to store in blockchain
//    let requestBuffer = Buffer.from(JSON.stringify(request));

//    //storing asset on blockchain with the uniquely generated key
//    await ctx.stub.putState(requestKey, requestBuffer);

//    //return the asset after converting it to json
//    return request;

// }   else if(this.investorData[i].ledgerId1 == ledgerId1 && this.investorData[i].uccEmailId != uccEmailId && this.investorData[i].uccMobileNo == uccMobileNo){



//        //request asset
//        request = {
//         uccRequestId: uccRequestId,
//         uccTmId: uccTmId,
//         uccTmName: uccTmName,
//         uccPanExempt: uccPanExempt,
//         uccPanNo: uccPanNo ||'',
//         uccCountry: uccCountry,
//         uccMobileNo: uccMobileNo,
//         uccEmailId: uccEmailId,
//         uccMobileNoModified: uccMobileNoModified,
//         uccEmailIdModified: uccEmailIdModified,
//         uccDpId: uccDpId || '',
//         uccClientId: uccClientId || '',
//         uccInvestorCode: uccInvestorCode,
//         uccRequestType: uccRequestType,
//         uccNodeStatus: uccNodeStatus,
//         uccEmailStatus: "NOT VERIFIED",
//         uccMobileStatus: "VERIFIED",
//         uccPanStatus: uccPanStatus,
//         emailAttempts: emailAttempts || '0',
//         mobileAttempts: mobileAttempts || '0',
//         ledgerId1: ledgerId1,
//         ledgerId2: ledgerId2,
//         isEmailEncrypted: isEmailEncrypted, 
//         isPhoneEncrypted: isPhoneEncrypted, 
//         UTCNotification: UTCNotification
//         }
        
//         this.investorData.push(request)
        
        
//         //converting asset to buffer to store in blockchain
//         let requestBuffer = Buffer.from(JSON.stringify(request));
        
//         //storing asset on blockchain with the uniquely generated key
//         await ctx.stub.putState(requestKey, requestBuffer);
        
//         //return the asset after converting it to json
//         return request;
//     }
// }
}

    }catch(err){

        console.log(err.stack)


    }
        
    }

    //function to create bulk investors
    async createInvestors(ctx,
                          uccTmId,
                          uccTmName,
                          uccPanExempt,
                          uccPanNo,
                          uccCountry,
                          uccMobileNo,
                          uccEmailId,
                          uccMobileNoModified,
                          uccEmailIdModified,
                          uccDpId,
                          uccClientId,
                          uccRequestId,
                          uccRequestType,
                          uccNodeStatus,
                          uccEmailStatus,
                          uccInvestorCode,
                          uccMobileStatus,
                          uccPanStatus,
                          emailAttempts,
                          mobileAttempts,
                          isEmailEncrypted, 
                          isPhoneEncrypted, 
                          UTCNotification) {


        //key to uniquely identify the asset
        //ledger id
        const requestKey = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccRequestId]);

        let request;
        console.log(typeof uccPanExempt, "abcd+++++++++")

        let ledgerId1;
        let ledgerId2;
        //if pan is present
        if (uccPanExempt) {

            //create ledger id 1
            ledgerId1 = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccDpId + "-" + uccClientId]);
            //create ledger id 2
            ledgerId2 = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccDpId + "-" + uccEmailId + "-" + uccMobileNo + "-" + uccClientId]);

            //request asset
            request = {
                uccRequestId: uccRequestId,
                uccTmId: uccTmId,
                uccTmName: uccTmName,
                uccPanExempt: uccPanExempt,
                uccPanNo: uccPanNo,
                uccCountry: uccCountry,
                uccMobileNo: uccMobileNo,
                uccEmailId: uccEmailId,
                uccMobileNoModified: uccMobileNoModified,
                uccEmailIdModified: uccEmailIdModified,
                uccDpId: uccDpId,
                uccClientId: uccClientId,
                uccInvestorCode: uccInvestorCode,
                uccRequestType: uccRequestType,
                uccNodeStatus: uccNodeStatus,
                uccEmailStatus: uccEmailStatus,
                uccMobileStatus: uccMobileStatus,
                uccPanStatus: uccPanStatus,
                emailAttempts: emailAttempts,
                mobileAttempts: mobileAttempts,
                ledgerId1: ledgerId1,
                ledgerId2: ledgerId2,
                isEmailEncrypted: isEmailEncrypted, 
                isPhoneEncrypted: isPhoneEncrypted, 
                UTCNotification: UTCNotification
            }


            this.investorData.push(request)


            //converting asset to buffer to store in blockchain
            let requestBuffer = Buffer.from(JSON.stringify(request));

            //storing asset on blockchain with the uniquely generated key
            await ctx.stub.putState(requestKey, requestBuffer);

            //return the asset after converting it to json
            return JSON.parse(requestBuffer.toString());
        } else if (uccPanExempt === false) {

            //create ledger id 1
            ledgerId1 = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccPanNo]);
            //create ledger id 2
            ledgerId2 = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccEmailId + "-" + uccMobileNo + "-" + uccPanNo]);

            //request asset
            request = {
                uccRequestId: uccRequestId,
                uccTmId: uccTmId,
                uccTmName: uccTmName,
                uccPanExempt: uccPanExempt,
                uccPanNo: uccPanNo,
                uccCountry: uccCountry,
                uccMobileNo: uccMobileNo,
                uccEmailId: uccEmailId,
                uccMobileNoModified: uccMobileNoModified,
                uccEmailIdModified: uccEmailIdModified,
                uccDpId: uccDpId,
                uccClientId: uccClientId,
                uccInvestorCode: uccInvestorCode,
                uccRequestType: uccRequestType,
                uccNodeStatus: uccNodeStatus,
                uccEmailStatus: uccEmailStatus,
                uccMobileStatus: uccMobileStatus,
                uccPanStatus: uccPanStatus,
                emailAttempts: emailAttempts,
                mobileAttempts: mobileAttempts,
                ledgerId1: ledgerId1,
                ledgerId2: ledgerId2,
                isEmailEncrypted: isEmailEncrypted,
                isPhoneEncrypted: isPhoneEncrypted, 
                UTCNotification: UTCNotification
            }


            this.investorData.push(request)

            //converting asset to buffer to store in blockchain
            let requestBuffer = Buffer.from(JSON.stringify(request));

            //storing asset on blockchain with the uniquely generated key
            await ctx.stub.putState(requestKey, requestBuffer);

            //return the asset after converting it to json
            return JSON.parse(requestBuffer.toString());

        }
    }

    //function to view investor request
    async viewInvestorRequest(ctx, uccRequestId) {

        //key to uniquely identify the asset
        //ledger id
        const requestKey = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccRequestId]);
        //fetch the asset with that composite key
        let investorRequestAsset = await ctx.stub.getState(requestKey);

        //if asset not present
        if (investorRequestAsset.length === 0) {

            throw new Error("Investor Request with specified request ID does not exist WOW")
        }

        //convert the asset to json and return it
        return JSON.parse(investorRequestAsset.toString());
    }


    //function to update investor request email
    async updateInvestorRequestEmail(ctx, uccRequestId, emailIdStatus) {

        //get the composite key of asset
        let investorRequestAssetKey = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccRequestId]);

        //fetch the asset with that composite key
        let investorRequestAsset = await ctx.stub.getState(investorRequestAssetKey);

        //if asset not present
        if (investorRequestAsset.length === 0) {

            throw new Error("Investor Request with specified request ID does not exist")
        }


        //convert the buffer asset to json and return it
        let investorRequestObject = JSON.parse(investorRequestAsset.toString());

        console.log('user request before updating the status is: ', investorRequestObject);

        //updating the email
        investorRequestObject.uccEmailStatus = emailIdStatus;

        console.log('user request after updating the status is: ', investorRequestObject);
        //converting asset to buffer to store in blockchain
        let requestBuffer = Buffer.from(JSON.stringify(investorRequestObject));

        //creating a new key for request
        investorRequestAssetKey = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccRequestId]);

        this.investorData.map((data)=>{
            if  (data.uccRequestId == uccRequestId){

                data.uccEmailStatus = emailIdStatus
            }
        })

        //storing asset on blockchain with the uniquely generated key
        await ctx.stub.putState(investorRequestAssetKey, requestBuffer);

        return investorRequestObject;

    }

    //function to update investor request mobile
    async updateInvestorRequestMobile(ctx, uccRequestId, mobileStatus) {

        //get the composite key of asset
        let investorRequestAssetKey = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccRequestId]);

        //fetch the asset with that composite key
        let investorRequestAsset = await ctx.stub.getState(investorRequestAssetKey);

        //if asset not present
        if (investorRequestAsset.length === 0) {

            throw new Error("Investor Request with specified request ID does not exist")
        }


        //convert the buffer asset to json and return it
        let investorRequestObject = JSON.parse(investorRequestAsset.toString());

        console.log('user request before updating the status is: ', investorRequestObject);

        //updating the email
        investorRequestObject.uccMobileStatus = mobileStatus;

        console.log('user request after updating the status is: ', investorRequestObject);
        //converting asset to buffer to store in blockchain
        let requestBuffer = Buffer.from(JSON.stringify(investorRequestObject));

        //creating a new key for request
        investorRequestAssetKey = ctx.stub.createCompositeKey("org.property-registration-network.investor.request", [uccRequestId]);

        this.investorData.map((data)=>{
            if  (data.uccRequestId == uccRequestId){

                data.uccMobileStatus = mobileStatus
            }
        })

        //storing asset on blockchain with the uniquely generated key
        await ctx.stub.putState(investorRequestAssetKey, requestBuffer);

        return investorRequestObject;

    }

    //function to return all the investors
    async getInvestors(ctx) {

        return this.investorData

    }

    //function to return all users with notification key
    async getInvestorsByNotificationKey(ctx,notificationKey){

        console.log(notificationKey)
        let investorData = this.investorData

        let resultArray = []

        for(let i=0; i< investorData.length; i++){

            console.log(investorData[i])

            if(investorData[i].UTCNotification === notificationKey){

                resultArray.push(investorData[i])
            }

        }

        return resultArray
    }

    //function to return all users with pan number
    async getInvestorsByPanNumber(ctx,panNumber){

        console.log(panNumber)
        let investorData = this.investorData

        let resultArray = []

        for(let i=0; i< investorData.length; i++){

            console.log(investorData[i])

            if(investorData[i].uccPanNo=== panNumber){

                resultArray.push(investorData[i])
            }

        }

        return resultArray
    }

    //function to return all users with Tm name
    async getInvestorsByTmName(ctx,TmName){

        console.log(TmName)
        let investorData = this.investorData

        let resultArray = []

        for(let i=0; i< investorData.length; i++){

            console.log(investorData[i])

        if (investorData[i].uccTmName === TmName){

                resultArray.push(investorData[i])
            }

        }

        return resultArray
    }

    //function to return all users with Tm name
    async getInvestorsByMobileNumber(ctx,mobileNumber){

        console.log(mobileNumber)
        let investorData = this.investorData

        let resultArray = []

        for(let i=0; i< investorData.length; i++){

            console.log(investorData[i])

            if (investorData[i].uccMobileNo === mobileNumber){

                resultArray.push(investorData[i])
            }

        }

        return resultArray
    }
}

module.exports = DLTContract;
