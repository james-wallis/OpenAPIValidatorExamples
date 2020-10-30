const express = require('express')
const app = express()

app.get('/hello', (req, res) => {
  res.status(200).send('Hello World!')
});

app.post('/hello', (req, res) => {
  res.sendStatus(202);
});

app.get('/customcode', (req, res) => {
  res.status(418).send(`I'm a teapot`);
});

app.get('/object',(req, res) => {
  res.status(200).send({
    propertyShouldExist: true,
  });
});

module.exports = app;
