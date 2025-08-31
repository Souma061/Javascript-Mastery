require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/instagram', (req, res) => {
  res.send('Hello this is Instagram');
});
app.get('/login', (req, res) => {
  res.send('<h1>Login Page</h1>');
});
app.get('/xhamster', (req, res) => {
  res.send('<h2>Video is loading...</h2>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
