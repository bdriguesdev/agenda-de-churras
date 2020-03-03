const { Router } = require('express');

const Churrasco = require('../models/Churrasco');

const router = Router();

router.get('/:id');

router.get('/');

router.post('/', async (request, response) => {
    try {
        const { title, date, description, foodPrice, foodAndDrinkPrice } = request.body;
        const user = request.isAuthorized;

        if(!user) {
            return response.json({
                error: 'Você não tem permissão para fazer isso.'
            });
        }

        const churrasco = await Churrasco.create({
            title,
            description,
            date,
            foodPrice,
            foodAndDrinkPrice,
            creator: user.id
        });

        return response.json({
            churrasco: {
                ...churrasco,
                creator: user.id
            }
        });
    } catch (error) {
        return response.json({
            error: 'Ocorreu um erro, tente novamente mais tarde.'
        });
    }
});

router.patch('/:id', async (request, response) => {
    try {
        const { title, description, foodPrice, foodAndDrinkPrice } = request.body;
        const user = request.isAuthorized;

        if(!user) {
            return response.json({
                error: 'Você não tem permissão para fazer isso.'
            });
        }

        Churrasco.findById(modelId).then((churrasco) => {
            if(churrasco.creator !== user.id) {
                return response.json({
                    error: 'Você não tem permissão para fazer isso.'
                });
            }
            return Object.assign(churrasco, { title, description, foodPrice, foodAndDrinkPrice });
        }).then((churrasco) => {
            return churrasco.save();
        }).then((churrasco) => {
            return res.json({
                churrasco
            });
        }).catch((err) => {
            res.send(err);
        });
        
    } catch (error) {
        return response.json({
            error: 'Ocorreu um erro, tente novamente mais tarde.'
        });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const user = request.isAuthorized;

        if(!user) {
            return response.json({
                error: 'Não existe nenhum churrasco com esse id.'
            });
        }

        const churrasco = Churrasco.findById(id);
        if(!churrasco) {
            return response.json({
                error: 'Não existe nenhum churrasco com esse id.'
            });
        } else if(churrasco.creator !== user.id) {
            return response.json({
                error: 'Você não é o criador desse churras para poder deletar o mesmo.'
            });
        }

        churrasco.remove();

        return response.json({
            churrasco
        });
    } catch (error) {
        return response.json({
            error: 'Ocorreu um erro, tente novamente mais tarde.'
        });
    }
});