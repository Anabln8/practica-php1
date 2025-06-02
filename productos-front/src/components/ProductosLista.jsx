import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function ProductosLista() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProductos = async () => {
    setError('');
    try {
      const response = await api.get('/productos');
      setProductos(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('No se pudo cargar la lista de productos');
      }
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleEditar = (id) => navigate(`/productos/editar/${id}`);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await api.delete(`/productos/${id}`);
      fetchProductos();
    } catch {
      setError('Error al eliminar el producto');
    }
  };

  return (
    <div className="container">
      <h2>Lista de Productos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => navigate('/productos/nuevo')}>Crear Producto</button>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEditar(p.id)}>Editar</button>
                <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
