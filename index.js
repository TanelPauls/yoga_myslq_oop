require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false
}))

const articleControllerClass = require('./controllers/article.js');
const articleController = new articleControllerClass();

const authorControllerClass = require('./controllers/author.js');
const authorController = new authorControllerClass();

const userControllerClass = require('./controllers/user.js');
const userController = new userControllerClass();

const articleRoutes = require('./routes/articles.js')(articleController);
const authorRoutes = require('./routes/authors.js')(authorController);
const userRoutes = require('./routes/users.js')(userController);

app.use('/', articleRoutes);
app.use('/author', authorRoutes);
app.use('/', userRoutes);

app.listen(4013, ()=>{
    console.log('App is started at http://localhost:4013')
})
