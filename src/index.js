const express = require('express');
const bodyParser = require('body-parser');
const http = require('http')
const app = express();
const server = http.Server(app);
var GithubWebHook = require('express-github-webhook');
var webhookHandler = GithubWebHook({ path: '/webhooks' });


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
webhookHandler.on('*', function (event, repo, data) {
    console.log("Evento: " + event)
    console.log("repo: " + repo)
    console.log("data: " + JSON.stringify(data))
});
app.use(webhookHandler)

app.get('/', (req,res) => {
    res.send("OK")
});


var port=Number(process.env.PORT || 3000);
server.listen(port, () => {
    console.log("servidor levantado")
});