const express = require('express');
const mutantMW = require('../middleware/mutant');
const router = express.Router();
const cors = require('cors');
const mysqlConnection  = require('../database.js');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  req.header('Access-Control-Allow-Origin', '*');
  next();
});

router.post('/mutant', (req,res) =>{
 res= mutantMW.isMutant();
 if(res == true) {
  res.send('es mutante');
  router.post('/agregar');
 
}
else {
  res.send('no es mutante');
  router.post('/agregar');
}
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api trabajando');
});
// get all stats

router.get('/stats', (req,res) => {
  
  mysqlConnection.query('SELECT  condicion,COUNT(*) AS total FROM mutante GROUP BY condicion ',(err, rows, fields) => {
    var total = [];
    total[0]= rows[0].total;
    total[1] = rows[1].total;
    if(!err) {
      res.json(rows);
     
    } else {
      console.log(err);
    }
  }); 
}); 

// GET all mutante
router.get('/mutante', (req, res) => {
  mysqlConnection.query('SELECT * FROM mutante', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});



// INSERT An mutante
router.post('/agregar', (req, res) => {
  const dna = req[0].body+req[1].body+req[2].body+req[3].body+req[4].body+req[5].body;
  if(res == true){
    condicion="mutante";
  }
  else{
    condicion="no mutante";
  }
  console.log(id, dna, condicion);
  const query = `
    SET @id = ?;
    SET @dna = ?;
    SET @condicion = ?;
    CALL mutanteAddOrEdit(@id, @dna, @condicion);
  `;
  mysqlConnection.query(query, [id, dna, condicion], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'emutante salvado'});
    } else {
      console.log(err);
    }
  });

});

// actualizar mutante

router.put('/update/:id', (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @dna = ?;
    SET @condicion = ?;
    CALL mutanteAddOrEdit(@id, @dna, @condicion);
  `;
  mysqlConnection.query(query, [id, dna, condicion], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'mutante actualizado'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
