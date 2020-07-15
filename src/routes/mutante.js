const express = require('express');
const mutantController = require('../controller/mutant');
const mutantMW = require('../middleware/mutant');
const router = express.Router();
const cors = require('cors');
const mysqlConnection  = require('../database.js');


router.post('/mutant',mutantMW.adnCaracter,mutantMW.isMutant);

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api trabajando');
});
// get all stats

router.get('/stats', (req,res) => {
  
  mysqlConnection.query('SELECT  condicion,COUNT(*) AS total FROM mutante GROUP BY condicion ',(err, rows, fields) => {
    var total=[];
    total[0]= rows[0].total;
    total[1]= rows[1].total;
    if(!err) {
      res.json(total);
      
      
    } else {
      console.log(err);
    }
  }); 
  
});
// GET all mutante
router.get('/mutante', (req, res) => {
  mysqlConnection.query('SELECT * FROM mutante', (err, rows, fields) => {
    if(!err) {
      res.json(rows.total);
    } else {
      console.log(err);
    }
  });  
});



// INSERT An mutante
router.post('/agregar', (req, res) => {
  const {id, dna, condicion} = req.body;
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
