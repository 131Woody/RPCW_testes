var mongoose =  require('mongoose') 

var registoSchema = new mongoose.Schema({
    _id: String,
    date: String,
    title: String,
    ref: String,
    pai: String,
    mae: String
})

//o primeiro é o id da coleção do mongo, e o schema que o modelo vai compilar com o módulo "model"
module.exports = mongoose.model('registo', registoSchema) 