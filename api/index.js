function laCajaDePandora(numero) {
  return numero % 2 === 0 
    ? numero.toString(2) 
    : numero.toString(16);
}

const leopoldo = ()=>{
    return {
        nombre: 'Leopoldo',
        edad: 35,
        nacionalidad: "venezolano"
    }
}