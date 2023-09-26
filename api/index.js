function laCajaDePandora(numero) {
if (typeof numero !== 'number' || isNaN(numero)) {
    return "Por favor, ingresa un número válido.";
  }

  if (numero % 2 === 0) {
    return numero.toString(2);
  } else {
    return numero.toString(16);
  }
}

console.log(laCajaDePandora(17)) 

let miNombre= ()=>{
  return miSer= {
    nombre : 'JUAN MANUEL MONTOYA GIRALDO',
    nacionalidad : 'Colombiano',
    edad : 24
  }
}

function David() {
  return {
    nombre: "David",
    edad: 32,
    nacionalidad: "argentino"
}

function esaMelendez(){
  return {nombre:"Esaú", edad:33, nacionalidad: "Mexican"}

function holaSoyDiose {
  return {
    nombre: "diose",
    edad: 23,
    nacionalidad: "Venezolana"
  }