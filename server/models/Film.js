const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    titulo:{
        type: String,
        unique: true
    },
    image:{
        data: Buffer,
        contentType: String
    },
    descripcion: String,
    ano: Number,
    duracion: Number,
    genero: String,
    director: String,
    precio: Number
})


const Film = mongoose.model('Film', filmSchema);
module.exports = Film;