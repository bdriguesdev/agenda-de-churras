const mongoose = require('mongoose');

const User = require('./User');
const Participant = require('./Participant');

const ChurrascoSchema =  new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Você deve informar um título para o churrasco.'],
        minlength: [3, 'O título do churrasco deve conter entre 3 a 30 caracteres.'],
        maxlength: [30, 'O título do churrasco deve conter entre 3 a 30 caracteres.']
    },
    date: {
        type: Date,
        required: [true, 'Você deve informar a data do churras.']
    },
    description: {
        type: String,
        required: [true, 'Você deve informar uma descripção para o churrasco.'],
        minlength: [5, 'A descrição do churrasco deve conter entre 5 a 300 caracteres.'],
        maxlength: [300, 'A descrição do churrasco deve conter entre 5 a 300 caracteres.']
    },
    foodPrice: {
        type: Number,
        required: [true, 'Você deve informar uma sugestão de valor para as pessoas que apenas vão comer.'],
        max: [200, 'Você não acha que esse valor é muito elevado para um churrasco? o.o'],
        min: [1, 'Você precisa ao menos informar um valor igual ou superior à 1 real.']
    },
    foodAndDrinkPrice: {
        type: Number,
        required: [true, 'Você deve informar uma sugestão de valor para as pessoas que vão comer e beber.'],
        max: [200, 'Você não acha que esse valor é muito elevado para um churrasco? o.o'],
        min: [1, 'Você precisa ao menos informar um valor igual ou superior à 1 real.']
    }, 
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Participant'
        }
    ]
}, { timestamps: true });

ChurrascoSchema.pre('remove', function(next) {
    User.updateOne(
        { churrascos : this._id}, 
        { $pull: { churrascos: this._id } },
        { multi: true }
    ).exec();
    Participant.remove({ churrasco: this._id }).exec();
    next();
});

module.exports = mongoose.model('Churrasco', ChurrascoSchema);