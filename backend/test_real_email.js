const sendEmail = require('./utils/email');
require('dotenv').config();

async function testEmail() {
  console.log('Testing email delivery with current credentials...');
  await sendEmail(
    'htripathi9324@gmail.com', 
    'Test Email - Wave Mind', 
    'This is a test email to verify your SMTP configuration.', 
    '<b>This is a test email</b> to verify your SMTP configuration.'
  );
  process.exit(0);
}

testEmail();
