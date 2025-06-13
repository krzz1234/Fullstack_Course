const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

let posts = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', (req, res) => {
  const post = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content,
  };
  posts.unshift(post);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  res.render('edit', { post });
});

app.post('/edit/:id', (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === req.params.id);
  posts[postIndex].title = req.body.title;
  posts[postIndex].content = req.body.content;
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  posts = posts.filter((p) => p.id !== req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

