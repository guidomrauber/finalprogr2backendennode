'use strict'


let adn = 
[
'AAAATA',
'TACTGT',
'GGTGGA',
'ATTGvA',
'AaACCG',
'AGGGAT',
];

        let cadenaADN = []
        for(let x = 0;x < adn.length; x++)  {
            for(let y = 0;y < adn.length; y++) {
                if(adn[x].charAt(y) != 'A' && adn[x].charAt(y) != 'C' && adn[x].charAt(y) != 'G' && adn[x].charAt(y) != 'T'){
                    cadenaADN.push('caracter incorrecto')
                }
                else{
                    
                }
            }
            
        }
        console.log(cadenaADN)

//Objeto a Json
var adnJSON = JSON.stringify(adn);
//Json a Objeto
var obj = JSON.parse(adnJSON)

let mutante;

function matriz(adn) {
	let cuadrada = true
	for (var tamaño = 0; tamaño < adn.length; tamaño++) {
		if (adn.length != adn[tamaño].length) {
			cuadrada = false
		}
	}
	return cuadrada;
}


function isMutant(adn) {

	let esCuadrada = matriz(adn);
	mutante = false	
	if (esCuadrada) {

		let filaC = []
		let columnaC = []
		let diagonalD = []
		let diagonalI = []
		let inicio = 0;

		/*document.write('<center><h2>Matriz de: ' + adn.length+'x'+adn[0].length+'</center></h2><hr>')
		adn.forEach(element => document.write(element + '<br>'));*/

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

			//COLUMNAS
			for (var j = 0; j < adn.length; j++) {		
				
				if (adn[j+(3)] != undefined) {
					
					if (adn[j].charAt(inicio) == adn[j+1].charAt(inicio)){
					
						if (adn[j+1].charAt(inicio) == adn[j+2].charAt(inicio)) {

							if (adn[j+2].charAt(inicio) == adn[j+3].charAt(inicio)) {

								columnaC.push( (inicio+1) +  '° Col ' )

							}
						}			
					}
				}	

			} 

			//filaC2.push(filaC)
			//document.write("<br>")
			inicio++
		}

		if (filaC.length >= 2 || columnaC.length >= 2 || diagonalD.length >= 2 || (columnaC.length+filaC.length+diagonalD.length >= 2)) {
			mutante = true
		}

		console.log('Filas: ' + filaC)
		console.log('Columnas: ' + columnaC)
		console.log('Diagonal(I a D): ' + diagonalD)
		console.log('Diagonal(D a I): ' + diagonalI)
	}
	else{
		console.log('Ingrese una matriz cuadrada, actualmente no lo es')
	}
	
	

	return mutante

}

isMutant(adn)


console.log(mutante)






