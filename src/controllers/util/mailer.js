const nodemailer = require('nodemailer');
const mailer = {}

// CONFIG CONNECTION SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'amanecer.ccrb@gmail.com',
        pass: 'ocvm ngne rjbr uonr',
    },
})

mailer.sendMail = (p_to, p_subject, p_body) => {
    // EMAIL CONFIG
    const mailOptions = {
        to: p_to,
        subject: p_subject,
        text: p_body, // Cuerpo en texto plano
        // O también puedes enviar contenido HTML:
        // html: '<p>Contenido HTML aquí</p>',
    }
    //SEND EMAIL
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('❌ Error sending email: ', error);
        }
        console.log('✅ Email sended');
    })
}

module.exports = mailer