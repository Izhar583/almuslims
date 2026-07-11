const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Simple parser for .env
const envPath = path.join(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
  console.error('.env file not found at:', envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    env[key] = val;
  }
});

const host = env.SMTP_HOST || 'smtp.gmail.com';
const port = parseInt(env.SMTP_PORT || '587', 10);
const user = env.SMTP_USER;
const pass = env.SMTP_PASSWORD;
const receiver = env.CONTACT_RECEIVER_EMAIL;

console.log('Testing SMTP with settings:');
console.log('Host:', host);
console.log('Port:', port);
console.log('User:', user);
console.log('Password length:', pass ? pass.length : 0);
console.log('Receiver:', receiver);

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP Connection Verification Failed:');
    console.error(error);
  } else {
    console.log('SMTP Connection is ready to take our messages!');
    
    // Let's try sending a test message
    transporter.sendMail({
      from: `"Test AlMuslims" <${user}>`,
      to: receiver,
      subject: "Test Email from AlMuslims Setup",
      text: "If you receive this, SMTP is working perfectly!"
    }, (err, info) => {
      if (err) {
        console.error('Failed to send test email:', err);
      } else {
        console.log('Test email sent successfully!', info);
      }
    });
  }
});
