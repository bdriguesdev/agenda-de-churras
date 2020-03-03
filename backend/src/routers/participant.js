const { Router } = require('express');

const Participant = require('../models/Participant');
const Churrasco = require('../models/Churrasco');

const router = Router();

router.post('/', async (request, response) => {
    try {
        const { name, value, churrascoId } = request.body;
        const user = request.isAuthorized;

        const churrasco = await Churrasco.findById(churrascoId);
        //findbyid não dá erro se não achar nada?
        if(!churrasco) {
            return response.json({
                error: 'Não existe nenhum churrasco com esse id.'
            });
        } else if(!user || churrasco.creator !== user.id) {
            return response.json({
                error: 'Você não tem permissão para adicionar um participante.'
            });
        }

        const participant = await Participant.create({
            name,
            value,
            churrasco: churrascoId
        }) ;

        //retornar o churrasco, correto?
        return response.json({
            participant
        });
    } catch (error) {
        return response.json({
            error: 'Ocorreu um erro, tente novamente mais tarde.'
        });
    }
});

//delete multiple participants
router.delete('/', async (request, response) => {
    try {
        const { ids, churascoId } = request.body;
        const user = request.isAuthorized;

        const churrasco = await Churrasco.findById(churascoId);
        if(!churrasco) {
            return response.json({
                error: 'Não existe nenhum churrasco com esse id.'
            });
        } else if(!user || churrasco.creator !== user.id) {
            return response.json({
                error: 'Você não tem permissão para adicionar um participante.'
            });
        }

        await Participant.deleteMany({ id: ids });

        return response.json({
            message: "Todos os participantes selecionados foram deletados."
        })
    } catch (error) {
        return response.json({
            error: 'Ocorreu um erro, tente novamente mais tarde.'
        });
    }
});

