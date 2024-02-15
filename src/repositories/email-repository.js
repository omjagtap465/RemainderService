const {NotificationTicket}  = require('../models')
class EmailRepository{
    async createNotificationTicket(data){
        try {
            const response  = await  NotificationTicket.create(data)
            return response
            
        } catch (error) {
            console.log(error);
            throw error 
        }
    }
    async fetchPendingEmails(data){
        try {
            const response  = await  NotificationTicket.findAll({
                where:{
                    status:data.status
                }
            })
            return response
            
        } catch (error) {
            console.log(error);
            throw error 
        }
    }
    async updateTicket(id,data){
        try {
            console.log(id,data);
            const response  = await  NotificationTicket.findByPk(id)
            if(response.status)
            {
                response.status = data.status
            }
            response.save()
            console.log(response);
            return response
            
        } catch (error) {
            console.log(error);
            throw error 
        }
    }
}
module.exports = EmailRepository