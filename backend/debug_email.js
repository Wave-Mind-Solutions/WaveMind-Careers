const { Resend } = require('resend');
require('dotenv').config();

const testEmail = async () => {
    const apiKey = process.env.RESEND_API_KEY;

    console.log('Attempting connection to Resend API...');
    if (!apiKey) {
        console.error('❌ Error: RESEND_API_KEY is not set in environment.');
        return;
    }

    const resend = new Resend(apiKey);

    try {
        const sender = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
        // Note: Unless a custom domain is verified in Resend, you can only send emails
        // to the email address used to sign up (wavemindsolutions@gmail.com).
        const recipient = 'wavemindsolutions@gmail.com'; 

        console.log(`Sending debug email from "${sender}" to "${recipient}"...`);
        const response = await resend.emails.send({
            from: `Wave Mind Debug <${sender}>`,
            to: recipient,
            subject: 'Resend Debug Email',
            html: '<p>Congrats on sending your <strong>first email via Resend</strong>!</p>',
        });

        if (response.error) {
            console.error('❌ Resend API Error:', response.error.message);
        } else {
            console.log('✅ Message sent successfully! ID:', response.data.id);
        }
    } catch (error) {
        console.error('❌ Resend Client Error:', error);
    }
};

testEmail();
