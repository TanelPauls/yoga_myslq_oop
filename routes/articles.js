const express = require('express');

module.exports = function (articleController) {
  const router = express.Router();

  router.get('/', articleController.getAllArticles.bind(articleController));
  router.get('/article/:slug', (req, res) => articleController.getArticleBySlug(req, res));
  router.post('/article/create', (req,res) => articleController.createNewArticle(req, res));

  return router;
};