const express = require('express');
const bodyParser = require('body-parser');
const http = require('http')
const app = express();
const server = http.Server(app);
const GithubWebHook = require('express-github-webhook');
const webhookHandler = GithubWebHook({ path: '/webhooks' });
const mailService = require('./MailService');
const config = require('./config')

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
webhookHandler.on('*', function (event, repo, data) {
    return mailService.sendMail(event,config)
});
app.use(webhookHandler)

app.get('/', (req,res) => {
    res.send("OK")
});


var port=Number(process.env.PORT || 3000);
server.listen(port, () => {
    console.log("servidor levantado")
});