const { Router } = require('express');

const Churrasco = require('../models/Churrasco');

const routes = Router();

routes.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const churrasco = await Churrasco.findById(id);
        if(!churrasco) {
            return response.status(400).json({
                error: 'Nenhum churrasco foi encontrado com esse id.'
            });
        }

        return response.status(200).json({
            churrasco
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Ocorreu um erro, por favor tente novamente mais tarde.'
        });
    }
});

routes.get('/', async (request, response) => {
    try {
        const churrascos = await Churrasco.find();

        return response.status(200).json({
            churrascos
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Ocorreu um erro, por favor tente novamente mais tarde.'
        });
    }
});

routes.post('/', async (request, response) => {
    try {
        const { title, date, description, foodPrice, foodAndDrinkPrice } = request.body;
        const user = request.isAuthorized;

        if(!user) {
            return response.status(401).json({
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

        return response.status(201).json({
            churrasco
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Ocorreu um erro, por favor tente novamente mais tarde.'
        });
    }
});

routes.patch('/:id', async (request, response) => {
    try {
        const { title, description, foodPrice, foodAndDrinkPrice } = request.body;
        const { id } = request.params;
        const user = request.isAuthorized;

        if(!user) {
            return response.status(401).json({
                error: 'Você não tem permissão para fazer isso.'
            });
        }

        const churrasco = await Churrasco.findById(id);

        if(!user || churrasco.creator.toString() !== user.id) {
            return response.status(401).json({
                error: 'Você não tem permissão para fazer isso.'
            });
        }

        Object.assign(churrasco, { title, description, foodPrice, foodAndDrinkPrice });
        await churrasco.save();
        
        return response.status(200).json({
            churrasco
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Ocorreu um erro, por favor tente novamente mais tarde.'
        });
    }
});

routes.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const user = request.isAuthorized;

        if(!user) {
            return response.status(401).json({
                error: 'Você não tem permissão para fazer isso.'
            });
        }

        const churrasco = await Churrasco.findById(id);
        if(!churrasco) {
            return response.status(400).json({
                error: 'Não existe nenhum churrasco com esse id.'
            });
        } else if(churrasco.creator.toString() !== user.id) {
            return response.status(401).json({
                error: 'Você não é o criador desse churras para poder deletar o mesmo.'
            });
        }

        await churrasco.deleteOne();

        return response.status(200).json({
            churrasco
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Ocorreu um erro, por favor tente novamente mais tarde.'
        });
    }
});

module.exports = routes;