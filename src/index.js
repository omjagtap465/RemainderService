const express = require('express')
const apiRoutes = require('./routes')
const bodyParser = require('body-parser');
const { ServerConfig } = require('./config');
const {sendEmail,fetchPendingEmails} = require('./services/email-service')
const cron = require('node-cron');
const {createChannel,subscribeMessage} = require('./utills/message-queue')
const {REMAINDER_BINDING_KEY} = require('./config/Server-config')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes)
app.listen(ServerConfig.PORT, async(req, res) => {
  const channel  = await createChannel()
  subscribeMessage(channel,REMAINDER_BINDING_KEY)

    // cron.schedule('*/1 * * * *',async () => {
    //     console.log('running a task every minute');
    //     const pendingmails  = await fetchPendingEmails({status:"PENDING"})
    //     // console.log("PENDING",pendingmails);
    //     pendingmails.forEach((email) => {
    //        console.log(email.id,email.recepientEmail,email.subject,email.content);
    //        sendEmail({
    //         from: "airlinemanagement98@gmail.com",
    //         to: email.recepientEmail,
    //         subject: email.subject,
    //         text: email.content,
    
    //     },email)
    //     });
    //   });
    console.log(`Sucessfully started the server on ${ServerConfig.PORT}`);
})