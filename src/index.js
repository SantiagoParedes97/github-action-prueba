const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = http.Server(app);


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', (req,res) => {
    res.send("OK")
});


app.post('/webhooks', (req,res) => {
    console.log("request: ")
    console.log(req)
    res.send('ok')
});

server.listen(8080, () => {
    console.log("servidor levantado")
});