const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const sanitizeHtml = require('sanitize-html');
const config = require('./config');
const path = require("path");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const sanitizedMessage = sanitizeHtml(message);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.password
            }
        });

        const mailOptions = {
            from: email,
            to: 'receiver-email@gmail.com',
            subject: `Message from ${name}: ${subject}`,
            text: sanitizedMessage
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.send('Sent Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});