const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = 80;

var currentQuestion = {
    question: "Test Question?",
    answers: [
        ['Answer 1', 0, 0],
        ['Answer 2', 0, 0],
        ['Answer 3', 0, 0]
    ]
};

app.get('/currentQuestion', function(req, res) {
    res.send(currentQuestion);
});

app.get('/', function(req, res) {
    fs.readFile('html/currentQuestionPage.html', function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.contentType('text/html');
            res.send(data);
        }
    });
});

app.post('/newQuestion', function(req, res) {
    console.log('got new question', req.body);
    currentQuestion = req.body;
    res.end();   
});

app.listen(port, () => console.log('listening on port', port));