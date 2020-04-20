const express = require('express');
const bodyParser = require('body-parser');
const http = require('http')
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
var port=Number(process.env.PORT || 3000);
server.listen(port, () => {
    console.log("servidor levantado")
});