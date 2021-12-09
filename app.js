const express = require('express');

const app = express();
const port = 3000;

// template engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
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

app.listen(port, () => {
  console.log(`Sunucu ${port} nolu portta çalışıyor...`);
});
