const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const articleControllerClass = require('./controllers/article.js');
const articleController = new articleControllerClass();

const authorControllerClass = require('./controllers/author.js');
const authorController = new authorControllerClass();

const articleRoutes = require('./routes/articles.js')(articleController);
const authorRoutes = require('./routes/authors.js')(authorController);

app.use('/', articleRoutes);
app.use('/author', authorRoutes);

app.listen(4013, ()=>{
    console.log('App is started at http://localohost:4013')
})
