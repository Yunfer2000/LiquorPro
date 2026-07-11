jest.mock('../src/config/prisma', () => ({
  proveedor: {
    findUnique: jest.fn()
  },
  cliente: {
    findUnique: jest.fn()
  },
  producto: {
    findUnique: jest.fn()
  },
  $transaction: jest.fn()
}));

const prisma = require('../src/config/prisma');

const {
  crearCompra
} = require('../src/services/compra.service');

const {
  crearVenta
} = require('../src/services/venta.service');

describe('Pruebas unitarias de compras e inventario', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('registra una compra y aumenta el stock de los productos', async () => {
    prisma.proveedor.findUnique.mockResolvedValue({
      id: 1,
      nombre: 'Proveedor de prueba',
      estado: true
    });

    const compraCreada = {
      id: 1,
      proveedorId: 1,
      total: 100
    };

    const tx = {
      compra: {
        create: jest.fn().mockResolvedValue(compraCreada)
      },
      producto: {
        update: jest.fn().mockResolvedValue({})
      }
    };

    prisma.$transaction.mockImplementation(async (callback) => {
      return callback(tx);
    });

    const datos = {
      proveedorId: 1,
      detalles: [
        {
          productoId: 10,
          cantidad: 2,
          precioUnitario: 20
        },
        {
          productoId: 11,
          cantidad: 3,
          precioUnitario: 20
        }
      ]
    };

    const resultado = await crearCompra(datos);

    expect(resultado).toEqual(compraCreada);

    expect(tx.compra.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          proveedorId: 1,
          total: 100
        })
      })
    );

    expect(tx.producto.update).toHaveBeenCalledTimes(2);

    expect(tx.producto.update).toHaveBeenCalledWith({
      where: {
        id: 10
      },
      data: {
        stock: {
          increment: 2
        }
      }
    });

    expect(tx.producto.update).toHaveBeenCalledWith({
      where: {
        id: 11
      },
      data: {
        stock: {
          increment: 3
        }
      }
    });
  });

  test('rechaza la compra cuando el proveedor no existe', async () => {
    prisma.proveedor.findUnique.mockResolvedValue(null);

    const datos = {
      proveedorId: 999,
      detalles: [
        {
          productoId: 1,
          cantidad: 2,
          precioUnitario: 10
        }
      ]
    };

    await expect(crearCompra(datos)).rejects.toThrow(
      'Proveedor no encontrado'
    );

    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  test('rechaza una compra sin productos', async () => {
    prisma.proveedor.findUnique.mockResolvedValue({
      id: 1,
      estado: true
    });

    await expect(
      crearCompra({
        proveedorId: 1,
        detalles: []
      })
    ).rejects.toThrow(
      'La compra debe tener al menos un producto'
    );

    expect(prisma.$transaction).not.toHaveBeenCalled();
  });
});

describe('Pruebas unitarias de ventas e inventario', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('registra una venta y disminuye el stock de los productos', async () => {
    prisma.cliente.findUnique.mockResolvedValue({
      id: 1,
      nombre: 'Cliente de prueba',
      estado: true
    });

    prisma.producto.findUnique
      .mockResolvedValueOnce({
        id: 10,
        nombre: 'Producto A',
        stock: 20,
        estado: true
      })
      .mockResolvedValueOnce({
        id: 11,
        nombre: 'Producto B',
        stock: 15,
        estado: true
      });

    const ventaCreada = {
      id: 1,
      clienteId: 1,
      total: 85
    };

    const tx = {
      venta: {
        create: jest.fn().mockResolvedValue(ventaCreada)
      },
      producto: {
        update: jest.fn().mockResolvedValue({})
      }
    };

    prisma.$transaction.mockImplementation(async (callback) => {
      return callback(tx);
    });

    const datos = {
      clienteId: 1,
      detalles: [
        {
          productoId: 10,
          cantidad: 2,
          precioUnitario: 20
        },
        {
          productoId: 11,
          cantidad: 3,
          precioUnitario: 15
        }
      ]
    };

    const resultado = await crearVenta(datos);

    expect(resultado).toEqual(ventaCreada);

    expect(tx.venta.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          clienteId: 1,
          total: 85
        })
      })
    );

    expect(tx.producto.update).toHaveBeenCalledTimes(2);

    expect(tx.producto.update).toHaveBeenCalledWith({
      where: {
        id: 10
      },
      data: {
        stock: {
          decrement: 2
        }
      }
    });

    expect(tx.producto.update).toHaveBeenCalledWith({
      where: {
        id: 11
      },
      data: {
        stock: {
          decrement: 3
        }
      }
    });
  });

  test('rechaza una venta cuando el stock es insuficiente', async () => {
    prisma.cliente.findUnique.mockResolvedValue({
      id: 1,
      estado: true
    });

    prisma.producto.findUnique.mockResolvedValue({
      id: 10,
      nombre: 'Ron Cartavio',
      stock: 2,
      estado: true
    });

    const datos = {
      clienteId: 1,
      detalles: [
        {
          productoId: 10,
          cantidad: 5,
          precioUnitario: 30
        }
      ]
    };

    await expect(crearVenta(datos)).rejects.toThrow(
      'Stock insuficiente para Ron Cartavio. Disponible: 2'
    );

    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  test('rechaza la venta cuando el cliente no existe', async () => {
    prisma.cliente.findUnique.mockResolvedValue(null);

    const datos = {
      clienteId: 999,
      detalles: [
        {
          productoId: 10,
          cantidad: 1,
          precioUnitario: 20
        }
      ]
    };

    await expect(crearVenta(datos)).rejects.toThrow(
      'Cliente no encontrado'
    );

    expect(prisma.$transaction).not.toHaveBeenCalled();
  });
});