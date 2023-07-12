class EmailService {
    send(email, message) {
        console.log(`Sending email to ${email} | Message: ${message}`);
    }
}

module.exports = EmailService;