function laCajaDePandora(numero) {
if (typeof numero !== 'number' || isNaN(numero)) {
    return "Por favor, ingresa un número válido.";
  }
  
  return numero % 2 === 0 
    ? numero.toString(2) 
    : numero.toString(16);
}

console.log(laCajaDePandora(17)) 

const leopoldo = ()=>{
    return {
        nombre: 'Leopoldo',
        edad: 35,
        nacionalidad: "venezolano"
    }
}

function seba(){
  return {nombre:"Sebastian", edad:36, nacionalidad: "Argentino"}

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
