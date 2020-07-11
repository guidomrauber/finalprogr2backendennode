/* Es una especie de clase que va a tener una serie de metodos 
	o acciones que va a poder hacer relacionada con la entidad de projets*/

	'use strict'


	var controller = {
	
	
		
		//TEST
		////////////////////////////////////////////////////////////////////////////////////////////////////
		test: function(req , res) {
			var respuestaTest = res.status(200).send({
				message: 'Test para probar la API'
			});
	
			return respuestaTest;
		},
	
		//Metodo GETALL
		///////////////////////////////////////////////////////////////////////////////////////////////////
		estadistica: function(req, res){
			
			var userdata = 'mutante';

var sql = 'SELECT COUNT(*) as mutante FROM mutante WHERE age = ?'
connection.query(sql, [userdata], function(err, rows, fields) {
  if (err) throw err;
  console.log('Query result: ', rows);
});
		}
	};
	
	module.exports = controller;
	
	//Se recomienda crear un fichero de rutas por cada uno de los controladores
