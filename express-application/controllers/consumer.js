const {createInvestorHelper} = require('./createInvestorHelper')
const {performance} = require('perf_hooks');


let num = 0

const rabbit = require("amqplib");
const QUEUE_NAME = "INVESTORS_DATA_BUFF";
connection = rabbit.connect(
    "amqps://ozeiszoe:7gYRxai3pEeQQA5qwU78RUnaz1Y7QFvH@armadillo.rmq.cloudamqp.com/ozeiszoe"
);

const helper = require('./getContractInstance.js')


module.exports.startQueue = async () =>{
    connection.then(async (conn) => {

        var start = performance.now();
    
    
        const regnetContract = await helper.getContractInstance();
        const channel = await conn.createChannel();
        channel.consume(QUEUE_NAME, async (m) => {
            const investorObj = JSON.parse(m.content.toString());
            //console.log("<<<", investorObj, ">>>>");
    
            let investor = Promise.resolve(createInvestorHelper(investorObj, regnetContract))
    
            num ++;
            console.log(num)
    
            if (num == 2000){
                var end = performance.now();
                console.log(`Execution time: ${end - start} ms`);
                conn.close()
                process.exit(0)
            }
    
    
    
    
            // console.log(investor)
    
            /*setTimeout(function () {
                conn.close();
                console.log("Close");
                process.exit(0);
            }, 500)*/
        })
    });



}

