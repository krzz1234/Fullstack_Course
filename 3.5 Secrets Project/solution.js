import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

let userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function passwordCheck(req, res, next) {
  const password = req.body['password'];
  if (password === 'ILoveProgramming') {
    userIsAuthorised = true;
  }
  next();
}

app.post('/check', passwordCheck, (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(path.join(__dirname, 'public', 'secret.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
