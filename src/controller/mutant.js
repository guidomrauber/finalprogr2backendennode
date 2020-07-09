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
		
		//Uso promesas anidadas para hacer consultas anidadas
		Personas.countDocuments({}, (err, contador) => {
			
			Personas.countDocuments({mutante: true},(err, countV) => {
				let promedio = (countV*100)/contador
				let redondeo = Math.round(promedio)
				if (err) return res.status(503).send({Mensaje: 'Error al obtener datos'});
				if (!contador) return res.status(404).send({Mensaje: 'No hay registros'});
				return res.status(200).send({
					Total_Registrado: contador,
					Mutantes_Detectados: countV,
					Radio: `${redondeo}%`
				});
				
			})
			if (err) return res.status(503).send({Mensaje: 'Error al obtener datos'});			
			
	   });
	}
};

module.exports = controller;

//Se recomienda crear un fichero de rutas por cada uno de los controladores