const express = require('express');

module.exports = function (userController) {
  const router = express.Router();

  router.get('/users/register', (req, res) => userController.registerPage(req, res));
  router.post('/users/register', (req, res) => userController.register(req, res));
  router.post('/users/login', (req, res) => userController.login(req, res));

  return router;
};