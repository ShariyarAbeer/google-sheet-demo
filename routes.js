const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController.js');




router.post('/account/create', UserController.createAccount);
router.post('/account/login', UserController.loginAccount);
router.post('/account/logout', UserController.logout);



module.exports = router;