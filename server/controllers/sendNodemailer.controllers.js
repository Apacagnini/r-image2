const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const send = async (req, res, next) => {
    const { fullName, email, message } = req.body;

    //Validations
    if (!fullName || !email || !message) {
        res.send({ok:false});
        return
    }

    //Configure SMTP transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.NODEMAILER_TRANSPORTER_USER,
            pass: process.env.NODEMAILER_TRANSPORTER_PASS
        }
    });

    //Set up email
    const mailOptions = {
        from: email,
        to: process.env.NODEMAILER_MAILOPTIONS_ADDRESSEE,
        subject: 'Contact Form',
        text: `
    FullName: ${fullName}\n
    Email: ${email}\n 
    Message: ${message}`
    };

    try {
        //Sending mail
        await transporter.sendMail(mailOptions);
        res.send({ok:true});
    } catch (error) {
        console.log('Error sending mail: ',error);
        res.send({ok:false});
    }
}

module.exports = { send };
