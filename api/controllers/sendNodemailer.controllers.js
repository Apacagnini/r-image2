const nodemailer = require('nodemailer');

const sendNodemailer = async (req, res, next) => {
    const { fullName, email, message } = req.body;

    //Validations
    if (!fullName || !email || !message) {
        res.send({ok:false});
        return
    }

    //Configurar transportador SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.NODEMAILER_TRANSPORTER_USER,
            pass: process.env.NODEMAILER_TRANSPORTER_PASS
        }
    });

    //Configurar correo electrónico
    const mailOptions = {
        from: email,
        to: process.env.NODEMAILER_MAILOPTIONS_ADDRESSEE,
        subject: 'Formulario de contacto',
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

module.exports = { sendNodemailer }
