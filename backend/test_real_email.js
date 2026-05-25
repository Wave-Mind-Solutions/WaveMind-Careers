const sendEmail = require('./utils/email');
require('dotenv').config();

async function testEmail() {
  console.log('Testing email delivery with Resend API configuration...');
  
  // Note: During Resend onboarding, you can only send emails to the email address
  // you registered with (e.g. wavemindsolutions@gmail.com or htripathi9324@gmail.com).
  const recipient = process.env.TEST_RECIPIENT || 'htripathi9324@gmail.com';
  
  const result = await sendEmail(
    recipient, 
    'Test Email - Wave Mind (Resend)', 
    'This is a test email to verify your Resend API configuration.', 
    '<b>This is a test email</b> to verify your Resend API configuration.'
  );
  
  console.log('Test result:', result);
  process.exit(0);
}

testEmail();
