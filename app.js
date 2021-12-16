const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ejs = require('ejs');

const Post = require('./models/Post');
const postControllers = require('./controllers/postCotrollers');
const pageController = require('./controllers/pageController');

const app = express();

// connect db
mongoose
  .connect(
    'mongodb+srv://hodo:F8FCdWu84Lam_ve@cluster0.20khx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.log(err);
  });

// template engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/', postControllers.getAllPosts);
app.get('/posts/:id', postControllers.getPost);
app.post('/add_post', postControllers.createPost);
app.put('/posts/:id', postControllers.updatePost);
app.delete('/posts/:id', postControllers.deletePost);

app.get('/add_post', pageController.getPostPage);
app.get('/about', pageController.getAboutPage);
app.get('/posts/edit_post/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} nolu portta çalışıyor...`);
});
