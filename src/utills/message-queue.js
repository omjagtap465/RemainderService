
const  amqp = require('amqplib');
const {MESSAGE_BROKER_URL,EXCHANGE_NAME,REMAINDER_SERVICE} = require('../config/Server-config')
const createChannel = async () => {

    try {
        
        const connection = await amqp.connect(MESSAGE_BROKER_URL)
        const channel =await connection.createChannel()
        await channel.assertExchange(EXCHANGE_NAME,'direct',false)
        return channel 
    } catch (error) {
        throw error
        
    }
}
    const subscribeMessage = async(channel,binding_key) => {
        try {
            const q = await channel.assertQueue("REMAINDER_QUEUE")
            await channel.bindQueue(q.queue, EXCHANGE_NAME, binding_key);
            channel.consume(q.queue, function(msg) {
                if(msg.content) {
                    console.log(" [x] %s", msg.content.toString());
                  }
                  channel.ack(msg)
              },)
        } catch (error) {
            throw error
        }
    }
const publishMessage  = async (channel,binding_key,message) => {

    try {
       const q = await channel.assertQueue("REMAINDER_QUEUE")
        await channel.sendToQueue(q.queue, binding_key, Buffer.from(message))
    } catch (error) {
        throw error
    }
}
module.exports = {createChannel,subscribeMessage}
