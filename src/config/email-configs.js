const nodemailer = require('nodemailer');


       

        const transporter = nodemailer.createTransport({
            service: "Gmail",
    
       
            auth: {
              user: "airlinemanagement98@gmail.com",
              pass: "rlzvbuwervouviac",
            },
          });
          
        // console.log(transporter);
        
module.exports = transporter
// createConnection()