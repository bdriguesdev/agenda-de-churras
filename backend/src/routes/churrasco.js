const { Router } = require('express');

const {
    getChurrasco,
    getAllChurrascos,
    createChurrasco,
    updateChurrasco,
    deleteChurrasco
} = require('../controllers/ChurrascoController');

const routes = Router();

routes.get('/:id', getChurrasco);

routes.get('/', getAllChurrascos);

routes.post('/', createChurrasco);

routes.patch('/:id', updateChurrasco);

routes.delete('/:id', deleteChurrasco);

module.exports = routes;