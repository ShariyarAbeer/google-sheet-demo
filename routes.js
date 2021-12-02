const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController.js');
const FormController = require('./controllers/FormController')




router.post('/account/create', UserController.createAccount);
router.post('/account/login', UserController.loginAccount);
router.post('/account/logout', UserController.logout);


router.post('/form/create', FormController.createForm);
router.post('/form/steps/new', FormController.fromItemAdd);



module.exports = router;