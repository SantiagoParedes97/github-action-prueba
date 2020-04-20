const core = require('@actions/core');
const github = require('@actions/github');
const nodemailer = require("nodemailer")

const payload = github.context.payload;
const commitName = payload.head_commit.message;
const url = payload.repository.clone_url;
const author = payload.head_commit.author.name;
const mailOptions = (from, to) => {
    return {
        from: from,
        to: to,
        subject: "La persona " + author + " termino el trabajo practico",
        text: payload.repository.clone_url
    };
}

const getTeachersMails = () => {
    const getTeachersMails = require('./googleSpreadsheet')
    console.log("Author: " + author)
    const teachersMails = getTeachersMails(author);
    return teachersMails;
}

const sendMailToTeachers = async () => {
    try {
        const username = core.getInput("username", {required: true})
        const password = core.getInput("password", {required: true})
        const from = core.getInput("from", {required: true})

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
        const tutorsMails = await getTeachersMails()
        const tutorsMailsSerialized = tutorsMails.join(',')
        const info = await transport.sendMail(mailOptions(from, tutorsMailsSerialized))
    } catch (error) {
        core.setFailed(error.message)
    }

}

async function main() {

    if (commitName.includes("terminado")) {
        sendMailToTeachers();
    }
}

main()
