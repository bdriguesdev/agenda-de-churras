const { Router } = require('express');

const Churrasco = require('../models/Churrasco');
const convertErrorsObjToArr = require('../utils/convertErrorsObjToArr');

const routes = Router();

routes.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const churrasco = await Churrasco.findById(id).populate('participants');
        if(!churrasco) {
            return response.status(400).json({
                errors: ['Nenhum churrasco foi encontrado com esse id.']
            });
        }

        return response.status(200).json({
            churrasco
        });
    } catch (error) {
        return response.status(500).json({
            errors: ['Ocorreu um erro, por favor tente novamente mais tarde.']
        });
    }
});

routes.get('/', async (request, response) => {
    try {
        const churrascos = await Churrasco.find({ date: { $gte: new Date() } }).sort('date');

        return response.status(200).json({
            churrascos
        });
    } catch (error) {
        return response.status(500).json({
            errors: ['Ocorreu um erro, por favor tente novamente mais tarde.']
        });
    }
});

routes.post('/', async (request, response) => {
    try {
        const { title, date, description, foodPrice, foodAndDrinkPrice } = request.body;
        const user = request.isAuthorized;

        if(!user) {
            return response.status(401).json({
                errors: ['Você não tem permissão para fazer isso.']
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
        if (error.name === 'ValidationError') {
            const errors = convertErrorsObjToArr(error.errors);
            return response.status(422).json({
                errors
            });
        }
        return response.status(500).json({
            errors: ['Ocorreu um erro, por favor tente novamente mais tarde.']
        });
    }
});

routes.patch('/:id', async (request, response) => {
    try {
        const { title, description, foodPrice, foodAndDrinkPrice, date } = request.body;
        const { id } = request.params;
        const user = request.isAuthorized;

        if(!user) {
            return response.status(401).json({
                errors: ['Você não tem permissão para fazer isso.']
            });
        }

        const churrasco = await Churrasco.findById(id).populate('participants');

        if(!user || churrasco.creator.toString() !== user.id) {
            return response.status(401).json({
                errors: ['Você não tem permissão para fazer isso.']
            });
        }

        Object.assign(churrasco, { title, description, foodPrice, foodAndDrinkPrice, date });
        await churrasco.save();
        
        return response.status(200).json({
            churrasco
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = convertErrorsObjToArr(error.errors);
            return response.status(422).json({
                errors
            });
        }
        return response.status(500).json({
            errors: ['Ocorreu um erro, por favor tente novamente mais tarde.']
        });
    }
});

routes.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const user = request.isAuthorized;

        if(!user) {
            return response.status(401).json({
                errors: ['Você não tem permissão para fazer isso.']
            });
        }

        const churrasco = await Churrasco.findById(id);
        if(!churrasco) {
            return response.status(400).json({
                errors: ['Não existe nenhum churrasco com esse id.']
            });
        } else if(churrasco.creator.toString() !== user.id) {
            return response.status(401).json({
                errors: ['Você não é o criador desse churras para poder deletar o mesmo.']
            });
        }

        await churrasco.deleteOne();

        return response.status(200).json({
            churrasco
        });
    } catch (error) {
        return response.status(500).json({
            errors: ['Ocorreu um erro, por favor tente novamente mais tarde.']
        });
    }
});

module.exports = routes;