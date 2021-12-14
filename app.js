const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');

const Post = require('./models/Post');

const app = express();

// connect db
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// template engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const post = await Post.find({});
  res.render('index', {
    post: post,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.post('/add_post', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} nolu portta çalışıyor...`);
});
