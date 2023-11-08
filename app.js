const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

const messages = ["React", "Vue", "Angular"];


app.get('/data', (req, res) => {
    res.send(messages);
    
});

app.post('/data', (req, res) => {
    let msg = req.body;
    // res.send('Got a POST request')
    console.log(msg);
    messages.push(msg.name);
    res.json(msg);
    console.log(messages);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

module.exports = app;