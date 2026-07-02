import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Productos from '../pages/Productos';
import Clientes from '../pages/Clientes';
import Proveedores from '../pages/Proveedores';
import Categorias from '../pages/Categorias';
import Compras from '../pages/Compras';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/compras"
          element={
            <PrivateRoute>
              <Compras />
            </PrivateRoute>
          }
        />

        <Route
          path="/categorias"
          element={
            <PrivateRoute>
              <Categorias />
            </PrivateRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/proveedores"
          element={
            <PrivateRoute>
              <Proveedores />
            </PrivateRoute>
          }
        />

        <Route
          path="/productos"
          element={
            <PrivateRoute>
              <Productos />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}