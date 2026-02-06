const express = require('express');

module.exports = function (authorController) {
  const router = express.Router();

  router.get('/:id', (req, res) => authorController.getAuthorById(req, res));

  return router;
};