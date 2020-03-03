const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = Router();

router.post('/', async (request, response) => {
    try {
        const { email, password, firstName, lastName } = request.body;

        const usersWithSameEmail = User.find({ email });
        if(usersWithSameEmail.length > 0) {
            return response.json({
                error: "Já existe um usuário cadastrado com esse email."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        return response.json({
            user: {
                email,
                firstName,
                lastName
            }
        });

    } catch (error) {
        return response.json({
            error: "Ocorreu um erro, tente novamente mais tarde."
        })   
    }
});

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = User.findOne({ email });
        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if(!user || !isPasswordEqual) {
            return response.json({
                    error: "Email e/ou senha inválido(s)."
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_KEY
        );

        return response.json({
            token,
            id: user.id
        });
        
    } catch (error) {
        return response.json({
            error: "Ocorreu um erro, tente novamente mais tarde."
        });
    }
});

module.exports = router;