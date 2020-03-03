const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Você deve informar o seu email.'],
        minlength: [5, 'O seu email deve conter entre 5 a 35 caracteres.'],
        maxlength: [35, 'O seu email deve conter entre 5 a 35 caracteres.']
    },
    date: {
        type: Date,
        required: [true, 'Você deve informar a data do churras.']
    },
    password: {
        type: String,
        required: [true, 'Você deve informar uma senha.'],
        minlength: [6, 'A sua senha deve conter entre 6 a 40 caracteres.'],
        maxlength: [40, 'A sua senha deve conter entre 6 a 40 caracteres.']
    },
    firstName: {
        type: String,
        required: [true, 'Você deve informar o seu nome.'],
        minlength: [3, 'O seu nome deve conter entre 3 a 35 caracteres.'],
        maxlength: [35, 'O seu nome deve conter entre 3 a 35 caracteres.']
    },
    lastName: {
        type: String,
        required: [true, 'Você deve informar o seu sobrenome.'],
        minlength: [3, 'O seu sobrenome deve conter entre 3 a 60 caracteres.'],
        maxlength: [60, 'O seu sobrenome deve conter entre 3 a 60 caracteres.']
    },
    churrascos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Churrasco"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);