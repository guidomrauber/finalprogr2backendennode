'use strict'
//const readMatrix = require('../scripts/mutant_adn_comprobacion')

const middleware = {
    
    matrix: function(req, res, next){
        let params = req.body
        let adn = params.adn
        let cuadrada = true
        
        
        for (var tamaño = 0; tamaño < adn.length; tamaño++) {
			if (adn.length != adn[tamaño].length) {
				cuadrada = false
			}
        }  
            
        if (cuadrada == true) {
            return next();
        }
        else{
            return res.status(503).send({Alerta: 'No es una matriz cuadrada'});
        }

			
    },
    adnCaracter: function(req, res, next){
        
        let params = req.body
        let adn = params.adn
        let cadenaADN = []
        for(let x = 0;x < adn.length; x++)  {
            for(let y = 0;y < adn.length; y++) {
                if(adn[x].charAt(y) != 'A' && adn[x].charAt(y) != 'C' && adn[x].charAt(y) != 'G' && adn[x].charAt(y) != 'T'){
                    cadenaADN.push('caracter incorrecto')
                }
            }   
        }
        if(cadenaADN.length >= 1){
            return res.status(503).send({Alerta: 'La secuencia de ADN solo puede contener A - C - G - T'});
        }else{
            next()
        }
        
    },
    
    rows: function(adn,filaC){
        
        let inicio= 0;
        while(inicio < adn.length){			
            //FILAS
            for (var i = 0; i < adn.length; i++) {			
				if (
							adn[inicio].charAt(i) == adn[inicio].charAt(i+1) &&
							adn[inicio].charAt(i+1) == adn[inicio].charAt(i+2) && 
							adn[inicio].charAt(i+2) == adn[inicio].charAt(i+3) 
							)
						{
							filaC.push( (inicio+1) + '° Fila ' )		
						}
					} 
            inicio++
        }
    },
    
    col: function(adn,columnaC){
        let inicio= 0;
        while(inicio < adn.length){
            //COLUMNAS
            for (var j = 0; j < adn.length; j++) {					
				if (adn[j+(3)] != undefined) {			
				    if (
                        adn[j].charAt(inicio) == adn[j+1].charAt(inicio) &&
                        adn[j+1].charAt(inicio) == adn[j+2].charAt(inicio) &&
                        adn[j+2].charAt(inicio) == adn[j+3].charAt(inicio)
                       )
                    {
				            columnaC.push( (inicio+1) +  '° Col ' )
                    }			
				}	
            } 
            inicio++
        }
    },
    
    rigth: function(adn,diagonalD){
        //DIAGONAL DERECHA
				for (let x = 0; x < adn.length -3; x++) {
					for (let y = 0; y < adn.length -3; y++) {
						if (adn[y+(3)] != undefined) {
							if (
								adn[y  ].charAt(x  ) == adn[y+1].charAt(x+1) &&
								adn[y+1].charAt(x+1) == adn[y+2].charAt(x+2) && 
								adn[y+2].charAt(x+2) == adn[y+3].charAt(x+3) 
								)
							{
								diagonalD.push( "|" + (y+1) + ',' + (x+1) + '|' )
									
							}
						}
					}
				}
    },
    
    left: function(adn,diagonalI){
        //DIAGONAL IZQUIERDA
                for (let xi = 0; xi < adn.length; xi++) {
                    for (let yi = 0; yi < adn.length; yi++) {
                        if (adn[yi+3] != undefined) {
                            if (
                                adn[yi  ].charAt(xi  ) == adn[yi+1].charAt(xi-1) &&
                                adn[yi+1].charAt(xi-1) == adn[yi+2].charAt(xi-2) && 
                                adn[yi+2].charAt(xi-2) == adn[yi+3].charAt(xi-3) 
                                )
                            {
                                diagonalI.push( "|" + (xi+1) + ',' + (yi+1) + '|' )							
                            }

                        }
                    }
                }
    },
    isMutant: function(req, res, next){

        let params = req.body;
        let filaC = []
        let columnaC = []
		let diagonalD = []
		let diagonalI = []

		let tipoPersona = false;
		let adn = params.adn
        
        middleware.rows(adn,filaC)
        middleware.col(adn,columnaC)
        middleware.rigth(adn,diagonalD)
        middleware.left(adn,diagonalI)
        
        if (
            filaC.length >= 2 || columnaC.length >= 2  ||  diagonalD.length >= 2 || diagonalI.length >= 2 ||
            (columnaC.length+filaC.length+diagonalD.length+diagonalI.length >= 2)
            ){
				tipoPersona = true
            }
        
        if (tipoPersona == true) {
            return next()
        }
        else{
            res.redirect(307, '../person');
        }
    }
}
module.exports = middleware