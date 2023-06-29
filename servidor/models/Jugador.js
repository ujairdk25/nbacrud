const mongoose = require('mongoose');

const JugadorSchema = mongoose.Schema({
    jugador: {
        type: String,
        required: true
    },

    posicion: {
        type: String,
        required: true
    },
    equipo: {
        type: String,
        required: true

    },
    anotaciones: {
        type: Number,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('Jugador', JugadorSchema);