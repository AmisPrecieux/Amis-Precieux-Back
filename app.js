const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./connection')
const app = express()
const port = 3000
const Game = require('./models/Game')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())
app.use(bodyParser.json())

const messages = ["React", "Vue", "Angular"];


app.get('/datagame', (req, res) => {
    res.send(messages);
    
});
//récupértion des kpi pour les jeux 
app.post('/datagame',async(req, res) => {
    const {victory, length, NbrMoove} = req.body;

    try {
        const newPost = await Game.create({victory, length, NbrMoove});
        res.json(newPost);
    } catch (error) {
        res.status(500).send(error);
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

module.exports = app;