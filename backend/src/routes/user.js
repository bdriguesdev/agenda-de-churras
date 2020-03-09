const { Router } = require('express');

const {
    createUser,
    userLogin
} = require('../controllers/UserController');

const routes = Router();

routes.post('/', createUser);

routes.post('/login', userLogin);

module.exports = routes;