const nodemailer = require('nodemailer');

// Create a transporter
module.exports.transporter = nodemailer.createTransport({
  service: 'gmail', // Use your preferred email service
  auth: {
    user: process.env.NODEMAILER_EMAIL, // Your email
    pass: process.env.NODEMAILER_PASS // Your email account password or app-specific password
  }
});

// Create email template
module.exports.createEmailTemplate = (email, name, company, position, message)=> {
  return `
    <div style="margin: 24px;">
    email: ${email}
    name: ${name}
    company: ${company}
    position: ${position}
    message: ${message}
    </div>
  `;
};