const {
  calcularSubtotal,
  calcularTotal
} = require('../src/utils/calculos');

describe('Pruebas unitarias de cálculos comerciales', () => {
  test('calcula correctamente el subtotal de un producto', () => {
    const resultado = calcularSubtotal(3, 20);

    expect(resultado).toBe(60);
  });

  test('calcula correctamente el total de varios productos', () => {
    const detalles = [
      {
        cantidad: 2,
        precioUnitario: 10
      },
      {
        cantidad: 3,
        precioUnitario: 15
      }
    ];

    const resultado = calcularTotal(detalles);

    expect(resultado).toBe(65);
  });

  test('convierte valores numéricos recibidos como texto', () => {
    const resultado = calcularSubtotal('4', '12.5');

    expect(resultado).toBe(50);
  });

  test('rechaza cantidades negativas', () => {
    expect(() => calcularSubtotal(-1, 20)).toThrow(
      'La cantidad y el precio deben ser números válidos y no negativos'
    );
  });

  test('rechaza una lista de detalles inválida', () => {
    expect(() => calcularTotal(null)).toThrow(
      'Los detalles deben ser un arreglo'
    );
  });
});