'use srtict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.dir(req.headers)
  console.dir(req.body);
  res.send('OK');
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
console.log(`listened at port ${port}`);
app.listen(port);
