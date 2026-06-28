const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const productoRoutes = require('./routes/producto.routes');
const proveedorRoutes = require('./routes/proveedor.routes');
const clienteRoutes = require('./routes/cliente.routes');
const compraRoutes = require('./routes/compra.routes');
const ventaRoutes = require('./routes/venta.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'LiquorPro API funcionando correctamente'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/dashboard', dashboardRoutes);

module.exports = app;