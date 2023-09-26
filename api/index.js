function laCajaDePandora(numero) {
  // proximamente escribiremos codigo aqui
  if (numero % 2 === 0) {
    return numero.toString(2); // Convierte a binario si es par
  } else {
    return numero.toString(16); // Convierte a hexadecimal si es impar
  }
}

console.log(laCajaDePandora(17))
