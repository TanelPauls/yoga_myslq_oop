const express = require('express');

module.exports = function (articleController) {
  const router = express.Router();

  router.get('/', articleController.getAllArticles.bind(articleController));
  router.get('/article/:slug', (req, res) => articleController.getArticleBySlug(req, res));

  return router;
};

