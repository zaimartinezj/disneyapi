const sgMail = require('@sendgrid/mail')

const sendEmail = async (email, name) => {

    try {

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: `${email}`, // Change to your recipient
            from: 'zaidamartinezjarse@gmail.com', // Change to your verified sender
            subject: 'Welcome to Disney API!',
            text: `Bienvenido/a ${name}`,
            html: `<strong> Bienvenido/a ${name}</strong>`,
        }

        await sgMail.send(msg);

        console.log("Email sent")

    } catch (error) {
        console.error(error)

    }
}

module.exports = sendEmail;