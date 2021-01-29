'use srtict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const channelSecret = Buffer.from(process.env.CHANNEL_SECRET);

const rawBodySaver = function(req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};
const app = express();
app.use(bodyParser.json({verify: rawBodySaver}));
app.use(bodyParser.raw({verify: rawBodySaver, type: '*/*'}));

app.post('/', (req, res) => {
  console.dir(req.headers);
  console.dir(req.body);
  const signature = crypto
    .createHmac('SHA256', channelSecret)
    .update(Buffer.from(req.rawBody)).digest('base64');
  console.log(`signature: ${signature}`);
  if (signature === req.headers['x-line-signature']) {
    res.send('OK');
  } else {
    res.status(403).send('Forbidden');
  }
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
console.log(`listened at port ${port}`);
app.listen(port);
