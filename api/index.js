function laCajaDePandora(numero) {
  return numero % 2 === 0 
    ? numero.toString(2) 
    : numero.toString(16);
}
