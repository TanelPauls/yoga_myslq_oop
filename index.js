const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const articleControllerClass = require('./controllers/article.js');
const articleController = new articleControllerClass();

const articleRoutes = require('./routes/articles.js')(articleController);

app.use('/', articleRoutes);

app.listen(4013, ()=>{
    console.log('App is started at http://localohost:4013')
})
