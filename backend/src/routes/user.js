const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const convertErrorsObjToArr = require('../utils/convertErrorsObjToArr');
const { passwordValidator } = require('../utils/validators');

const routes = Router();

routes.post('/', async (request, response, next) => {
    try {
        const { email, password, firstName, lastName } = request.body;

        passwordValidator(password);

        const usersWithSameEmail = await User.find({ email });
        if(usersWithSameEmail.length > 0) {
            return response.status(400).json({
                errors: ["Já existe um usuário cadastrado com esse email."]
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        return response.status(201).json({
            user: {
                _id: user.id,
                email,
                firstName,
                lastName,
                churrascos: user.churrascos
            }
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = convertErrorsObjToArr(error.errors);
            return response.status(422).json({
                errors
            });
        }
        return response.status(500).json({
            errors: ["Ocorreu um erro, por favor tente novamente mais tarde."]
        })   
    }
});

routes.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({ email });
        if(!user ) {
            return response.status(400).json({
                    errors: ["Email e/ou senha inválido(s)."]
            });
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if(!isPasswordEqual) {
            return response.status(400).json({
                    errors: ["Email e/ou senha inválido(s)."]
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_KEY
        );

        return response.status(201).json({
            token,
            user: {
                _id: user.id,
                email: user.email,
                churrascos: user.churrascos,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
        
    } catch (error) {
        return response.status(500).json({
            errors: ["Ocorreu um erro, por favor tente novamente mais tarde."]
        });
    }
});

module.exports = routes;