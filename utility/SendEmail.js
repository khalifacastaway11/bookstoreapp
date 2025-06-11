// filepath: d:\Projects\bookstoreapp\utils\sendEmail.js
const nodemailer = require('nodemailer');

// const sendEmail = async (to, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'www.khalifacastaway@gmail.com', // Replace with your email
//       pass: 'asd100200', // Replace with your email password
//     },
//   });

//   const mailOptions = {
//     from: 'www.khalifacastaway@gmail.com',
//     to,
//     subject,
//     text,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// module.exports = sendEmail;