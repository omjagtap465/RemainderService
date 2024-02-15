const { createNotificationTicket } = require('../services/email-service')
const create = async (req, res) => {
    try {
        console.log(req.body);
        const response = await createNotificationTicket(req.body);
        return res.status(200).json({
            data: response,
            err: {}
        });
    } catch (error) {
        console.error("Error creating notification ticket:", error);
        return res.status(500).json({
            data: null,
            err: "Internal server error"
        });
    }
    

}
module.exports = {
    create
}