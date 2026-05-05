const nodemailer = require('nodemailer');
require('dotenv').config();

const testEmail = async () => {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    console.log(`Using User: ${smtpUser}`);
    console.log('Attempting connection to SMTP...');

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 10000,
    });

    try {
        console.log('Verifying transporter...');
        await transporter.verify();
        console.log('✅ Transporter is ready to take our messages');

        const mailOptions = {
            from: `"Wave Mind Debug" <${smtpUser}>`,
            to: smtpUser, // Send to self for test
            subject: 'Debug Email',
            text: 'This is a debug email to test connectivity.',
        };

        console.log('Sending test email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Message sent: %s', info.messageId);
    } catch (error) {
        console.error('❌ SMTP Error:', error);
    }
};

testEmail();
