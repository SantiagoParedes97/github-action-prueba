const nodemailer = require("nodemailer")
const {updateTp,getTeachersMails} = require('./googleSpreadsheet')

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
    updateNote(payload,config){
        const author = payload.pusher.name;
        const repository = payload.repository.html_url;
        return updateTp(author,repository,config);
    }

    getTeachersMails(payload,config){
        const author = payload.pusher.name;
        console.log("Author: " + author);
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
        console.log(payload)
        const commitName = payload.head_commit.message;
        if (commitName && commitName.toLowerCase().includes("terminado")) {
            return this.sendMailToTeachers(payload,config).then(() => this.updateNote(payload,config))
        }
        return Promise.resolve();
    }
}

module.exports = new MailService()
