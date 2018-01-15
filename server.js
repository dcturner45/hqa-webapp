const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const md5 = require('md5');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = 80;

// (very) thin layer of protection from malicious incoming post requests
const passwordMd5 = 'cb72af8161b57de3951a8e8aa198baa0'

var currentQuestion = {
    question: "[Question will appear here]",
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
    if (md5(req.body.password) == passwordMd5) {
        console.log('got new question', req.body.questionData);
        currentQuestion = req.body.questionData;
        res.end();   
    }
    else {
        console.log('received post with invalid password')
        res.status(403).end('invalid password');
    }
});

app.listen(port, () => console.log('listening on port', port));