const express = require('express');

module.exports = function (userController) {
  const router = express.Router();

  router.post('/users/register', (req, res) => userController.register(req, res));

  return router;
};