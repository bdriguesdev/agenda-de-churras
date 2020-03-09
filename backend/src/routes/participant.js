const { Router } = require('express');

const {
    createParticipant,
    deleteMultipleParticipants
} = require('../controllers/ParticipantController');

const routes = Router();

routes.post('/', createParticipant);

//delete multiple participants
routes.delete('/', deleteMultipleParticipants);

module.exports = routes;