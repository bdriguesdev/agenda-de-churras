const { Router } = require('express');

const Participant = require('../models/Participant');
const Churrasco = require('../models/Churrasco');
const convertErrorsObjToArr = require('../utils/convertErrorsObjToArr');

const routes = Router();

routes.post('/', async (request, response) => {
    try {
        const { name, value, churrascoId } = request.body;
        const user = request.isAuthorized;

        const churrasco = await Churrasco.findById(churrascoId);
        if(!churrasco) {
            return response.status(400).json({
                errors: ['Não existe nenhum churrasco com esse id.']
            });
        } else if(!user || churrasco.creator.toString() !== user.id) {
            return response.status(401).json({
                errors: ['Você não tem permissão para adicionar um participante.']
            });
        }

        const participant = await Participant.create({
            name,
            value,
            churrasco: churrascoId
        }) ;

        return response.status(201).json({
            participant
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = convertErrorsObjToArr(error.errors);
            return response.status(422).json({
                errors
            });
        }
        return response.status(500).json({
            errors: ['Ocorreu um erro, tente novamente mais tarde.']
        });
    }
});

//delete multiple participants
routes.delete('/', async (request, response) => {
    try {
        const { ids, churrascoId } = request.body;
        const user = request.isAuthorized;

        const churrasco = await Churrasco.findById(churrascoId);
        if(!churrasco) {
            return response.status(400).json({
                errors: ['Não existe nenhum churrasco com esse id.']
            });
        } else if(!user || churrasco.creator.toString() !== user.id) {
            return response.status(401).json({
                errors: ['Você não tem permissão para deletar um participante.']
            });
        }

        await Participant.deleteMany({ _id: { $in: ids } });

        await Churrasco.updateOne({_id: churrascoId}, { $pullAll: { participants: ids } });

        return response.status(200).json({
            message: "Todos os participantes selecionados foram deletados.",
            ids
        });
    } catch (error) {
        return response.status(500).json({
            errors: ['Ocorreu um erro, tente novamente mais tarde.']
        });
    }
});

module.exports = routes;