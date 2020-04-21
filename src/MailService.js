const nodemailer = require("nodemailer")


class MailService {
    mailOptions(from, to,payload){
        const author = payload.head_commit.author.name;
        return {
            from: from,
            to: to,
            subject: "La persona " + author + " termino el trabajo practico",
            text: payload.repository.clone_url
        };
    }

    getTeachersMails(payload,config){
        const author = payload.head_commit.author.name;
        console.log("Author: " + author);
        const getTeachersMails = require('./googleSpreadsheet')
        return getTeachersMails(author,config);
    }
    sendMailToTeachers(payload,config){
        const {username, password, from} = config;

        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: username,
                pass: password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        return this.getTeachersMails(payload,config)
            .then(tutorsMails => tutorsMails.join(','))
            .then((tutorsMailsSerialized) => transport.sendMail(this.mailOptions(from, tutorsMailsSerialized,payload)))
    }

    sendMail(payload, config){
        const commitName = payload.head_commit.message;
        console.log(commitName);
        if (commitName && commitName.toLowerCase().includes("terminado")) {
            return this.sendMailToTeachers(payload,config);
        }
        return Promise.resolve();
    }
}

module.exports = new MailService()
