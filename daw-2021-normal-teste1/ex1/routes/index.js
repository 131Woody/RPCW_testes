var express = require('express');
const { acceptsEncodings } = require('express/lib/request');
var router = express.Router();
var Registo = require('../controllers/registo')
/* GET home page. */

//Devolve a lista dos batismos, com os campos: _id, date, title e ref;
router.get('/api/batismos', function(req, res, next) {
  if(req.query['ano'] != undefined){

    Registo.listarPorAno(req.query['ano'])
     .then(dados => {
       res.status(200).jsonp(dados)
     })
     .catch( e => {
       res.status(504).jsonp({erro : e})
     })
  }
  
  else{
    Registo.listar() 
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch( e => {
        res.status(500).jsonp({erro : e})
      })
  }
});


router.get('/api/batismos/batisado', function(req, res, next) {

  var reg = /º \d+: (.+?)\. Pai:/
  var batisados = []
  Registo.listar() 
    .then(dados => {
      dados.forEach(e => {
        let names = e.title.match(reg)
        batisados.push({nome : names[1]})
      });
      batisados.sort()
      res.status(200).jsonp(batisados)
     })
     .catch( e => {
       res.status(501).jsonp({erro : e})
    })
});

router.get('/api/batismos/progenitores', function(req, res, next) {

  Registo.listarProgenitores() 
  .then(dados => {
    res.status(200).jsonp(dados)
   })
   .catch( e => {
     res.status(502).jsonp({erro : e})
  })
});

router.get('/api/batismos/stats', function(req, res, next) {

  var reg = /^(\d+)/
  var stats = {}
  Registo.listar() 
  .then(dados => {

    dados.forEach(e => {
      let ano = e.date.match(reg)[1]
      if(stats[ano] != undefined){
        stats[ano]+=1
      }
      else{
        stats[ano] = 1
      }
    });
    res.status(200).jsonp(stats)
   })
   .catch( e => {
     res.status(505).jsonp({erro : e})
  })
});

//Devolve a informação completa de um batismo;

router.get('/api/batismos/:id', function(req, res, next) {
  var id = req.params.id 
  console.log(typeof(id))
  Registo.consultar(id) 
    .then(dados => {
      res.status(200).jsonp(dados)
     })
     .catch( e => {
       res.status(503).jsonp({erro : e})
    })
});



module.exports = router;
