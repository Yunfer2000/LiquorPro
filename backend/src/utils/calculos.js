function calcularSubtotal(cantidad, precioUnitario) {
  const cantidadNumero = Number(cantidad);
  const precioNumero = Number(precioUnitario);

  if (
    Number.isNaN(cantidadNumero) ||
    Number.isNaN(precioNumero) ||
    cantidadNumero < 0 ||
    precioNumero < 0
  ) {
    throw new Error('La cantidad y el precio deben ser números válidos y no negativos');
  }

  return cantidadNumero * precioNumero;
}

function calcularTotal(detalles) {
  if (!Array.isArray(detalles)) {
    throw new Error('Los detalles deben ser un arreglo');
  }

  return detalles.reduce((total, detalle) => {
    return total + calcularSubtotal(detalle.cantidad, detalle.precioUnitario);
  }, 0);
}

module.exports = {
  calcularSubtotal,
  calcularTotal
};