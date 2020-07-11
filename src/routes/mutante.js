const express = require('express');
const mutantController = require('../controller/mutant');
const mutantMW = require('../middleware/mutant');
const router = express.Router();

const mysqlConnection  = require('../database.js');

//accedemos con get al metodo del controlador


router.post('/mutant',mutantMW.matrix ,mutantMW.adnCaracter, mutantMW.isMutant);


// get all stats

router.get('/stats', (req,res) => {
  
  mysqlConnection.query('SELECT  condicion,COUNT(*) AS mutante FROM mutante GROUP BY condicion ',(err, rows, fields) => {
    if(!err) {
      res.json(rows);
      
    } else {
      console.log(err);
    }
  }); 
  
});
// GET all mutante
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM mutante', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An mutante
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM mutante WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An mutante
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM mutante WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'id mutante eliminado'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An mutante
router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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
