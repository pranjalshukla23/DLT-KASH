

const {startQueue} =   require('./consumer');


module.exports.verifyQueueData = async(req,res) => {

    try {

        await startQueue()

       return res.status(200).send({
           msg:"queue data added"
       })

    } catch (error) {

        console.log(`\n\n ${error} \n\n`);

        res.status(400).send({
            msg: "execution failed"
        })
    }
}

