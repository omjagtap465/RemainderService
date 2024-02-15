const transporter = require('../config/email-configs')
const EmailRepository = require('../repositories/email-repository')
let emailrepository = new EmailRepository()
const sendEmail = async (emaildata,email) => {

     transporter.sendMail(emaildata,async (err,data) =>{
        if (err) { 
          console.log('Sending to ' +' failed: ' + err);
          return;
        } else { 
         await emailrepository.updateTicket(email.id,{status:"SUCCESS"})
        }
    });

}
const createNotificationTicket = async (data) => {
    try {
        const response = await emailrepository.createNotificationTicket(data)
        return response
    } catch (error) {
        throw error
    }
}
const fetchPendingEmails = async (data) => {
    try {
        const response = await emailrepository.fetchPendingEmails(data)
        return response
    } catch (error) {
        throw error
    }
}


module.exports = { sendEmail, createNotificationTicket,fetchPendingEmails }