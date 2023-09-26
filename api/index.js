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



function esaMelendez(){
  return {nombre:"Esaú", edad:33, nacionalidad: "Mexican"}

function holaSoyDiose {
  return {
    nombre: "diose",
    edad: 23,
    nacionalidad: "Venezolana"
  }
}