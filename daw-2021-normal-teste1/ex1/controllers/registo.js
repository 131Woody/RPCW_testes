var Registo = require('../models/registo') //import do modelo
const mongoose = require('mongoose') 

module.exports.listar = () =>{ //=> Devolve a lista dos batismos, com os campos: _id, date, title e ref;
    return Registo
        .find({},{date:1,title:1, ref:1} ) // -> projeção
        .exec()
}


module.exports.listarPorAno = (a) =>{ 
    var ano = new RegExp(a)
    return Registo
        .find({date : ano} ) // -> projeção
        .exec()
}

module.exports.consultar = (id) =>{
    //console.log(id)
    return Registo
        .findOne({_id: id}) // -> seleção
        .exec()
}

//por acabar
//module.exports.listarNomes = () =>{
//    return Registo
//        .find()
//}

// Devolve uma lista de triplos em que cada triplo tem a seguinte estrutura: 
//{_id, pai, mae}; 

module.exports.listarProgenitores = function(){
    return Registo
        .find({},{_id:1, pai:1 , mae:1}) // -> projeção
        .exec()
}

