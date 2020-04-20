const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




app.post('/webhooks', (req,res) => {
    console.log("request: ")
    console.log(req)
    res.send('ok')
});

app.listen(9001, () => {
    console.log("servidor levantado")
});