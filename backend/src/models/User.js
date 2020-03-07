const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Você deve informar o seu email.'],
        minlength: [5, 'O seu email deve conter entre 5 a 35 caracteres.'],
        maxlength: [35, 'O seu email deve conter entre 5 a 35 caracteres.'],
        validate: {
            validator: function(email) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
            },
            message: "Você deve informar um email válido."
        }
    },
    password: {
        type: String,
        required: [true, 'Você deve informar uma senha.']
    },
    firstName: {
        type: String,
        required: [true, 'Você deve informar o seu nome.'],
        minlength: [3, 'O seu nome deve conter entre 3 a 35 caracteres.'],
        maxlength: [35, 'O seu nome deve conter entre 3 a 35 caracteres.'],
        validate: {
            validator: function(firstName) {
                return /^[a-záàâãéèêíïóôõöúçñ]+$/i.test(firstName);
            },
            message: "Você deve informar um nome válido."
        }
    },
    lastName: {
        type: String,
        required: [true, 'Você deve informar o seu sobrenome.'],
        minlength: [3, 'O seu sobrenome deve conter entre 3 a 60 caracteres.'],
        maxlength: [60, 'O seu sobrenome deve conter entre 3 a 60 caracteres.'],
        validate: {
            validator: function(lastName) {
                return /^[a-záàâãéèêíïóôõöúçñ ]+$/i.test(lastName);
            },
            message: "Você deve informar um sobrenome válido."
        }
    },
    churrascos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Churrasco"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);