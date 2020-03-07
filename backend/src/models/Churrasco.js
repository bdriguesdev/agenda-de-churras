const mongoose = require('mongoose');

const ChurrascoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Você deve informar um título para o churrasco.'],
        minlength: [3, 'O título do churrasco deve conter entre 3 a 30 caracteres.'],
        maxlength: [30, 'O título do churrasco deve conter entre 3 a 30 caracteres.'],
        validate: {
            validator: function(name) {
                return /^[a-záàâãéèêíïóôõöúçñ 0-9]+$/i.test(name);
            },
            message: "Você deve informar um título válido: a-z, A-Z e 0-9."
        }
    },
    date: {
        type: Date,
        required: [true, 'Você deve informar a data do churras.'],
        validate: {
            validator: function(date) {
                return date >= new Date();
            },
            message: "Você deve informar uma data válida, a mesma não pode ser no passado."
        }
    },
    description: {
        type: String,
        required: [true, 'Você deve informar uma descripção para o churrasco.'],
        minlength: [5, 'A descrição do churrasco deve conter entre 5 a 300 caracteres.'],
        maxlength: [300, 'A descrição do churrasco deve conter entre 5 a 300 caracteres.'],
        validate: {
            validator: function(description) {
                return /^[a-záàâãéèêíïóôõöúçñ 0-9?!.,;:-_><@#$%&*]+$/i.test(description);
            },
            message: "Você deve informar um descrição válida."
        }
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

ChurrascoSchema.pre('save', async function(next) {
    await mongoose.model('User').updateOne(
        { churrascos : { $in: [ this._id ] } }, 
        { $push: { churrascos: this._id } }
    );
    next();
});

ChurrascoSchema.pre('deleteOne', async function(next) {
    await mongoose.model('User').updateOne(
        { churrascos : { $in: [ this._id ] } }, 
        { $pull: { churrascos: this._id } }
    );
    // { multi: true }
    next();
});

module.exports = mongoose.model('Churrasco', ChurrascoSchema);