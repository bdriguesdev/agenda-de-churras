const mongoose = require('mongoose');

const Churrasco = require('./Churrasco');

const ParticipantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Você precisa informar o nome do participante.'],
        minlength: [2, 'O nome do participante conter entre 2 a 40 caracteres.'],
        maxlength: [40, 'O nome do participante conter entre 2 a 40 caracteres.'],
    },
    value: {
        type: Number,
        required: [true, 'Você precisa informar o valor que o participante irá contribuir.'],
        min: [0, 'O participante precisa contribuir com um valor igual ou superior à 0.'],
        max: [999, 'O participante precisa contribuir com um valor igual ou inferior à 999.']
    },
    churrasco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Churrasco'
    }
}, { timestamps: true });

ParticipantSchema.pre('remove', function(next) {
    Churrasco.update(
        { participants : this._id}, 
        { $pull: { participants: this._id } },
        { multi: true })  
    .exec();
    next();
}); 

module.exports = mongoose.model('Participant', ParticipantSchema);