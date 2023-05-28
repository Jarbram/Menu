import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [entradas, setEntradas] = useState([]);
  const [fondos, setFondos] = useState([]);
  const [postres, setPostres] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [showAgregarPlatoForm, setShowAgregarPlatoForm] = useState(false);
  const [nuevoPlato, setNuevoPlato] = useState({
    nombre: '',
    precio: parseInt(''),
    disponible: true,
    descripcion: '',
    tieneAlcohol: false
  });

  const fetchData = async (url, setState) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setState(data);
      } else {
        console.error(`Error al obtener datos de ${url}`);
      }
    } catch (error) {
      console.error(`Error al realizar la solicitud GET a ${url}:`, error);
    }
  };

  const agregarPlato = async (tipo) => {
    try {
      const response = await fetch(`http://localhost:8080/${tipo}/add-dish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPlato)
      });
      console.log(nuevoPlato)

      if (response.ok) {
        // Actualiza la lista de platos después de agregar uno nuevo
        fetchData(`http://localhost:8080/${tipo}/`, setStateByTipo(tipo));

        // Restablece el formulario y el estado
        setNuevoPlato({
          nombre: '',
          precio: '',
          disponible: true,
          descripcion: ''
        });
        setShowAgregarPlatoForm(false);
      } else {
        console.error('Error al agregar el plato');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
    }
  };

  const setStateByTipo = (tipo) => {
    switch (tipo) {
      case 'entradas':
        return setEntradas;
      case 'fondos':
        return setFondos;
      case 'postres':
        return setPostres;
      case 'bebidas':
        return setBebidas;
      default:
        return () => {};
    }
  };

  const handleAgregarPlato = (tipoPlato) => {
    setNuevoPlato({
      nombre: '',
      precio: '',
      disponible: true,
      descripcion: ''
    });
    setShowAgregarPlatoForm(true);
  };

  const handleChangeNuevoPlato = (campo, valor) => {
    setNuevoPlato((prevState) => ({
      ...prevState,
      [campo]: valor
    }));
  };

  const deleteDish = async (id, tipo) => {  
    try {
      const response = await fetch(`http://localhost:8080/${tipo}/delete-dish/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Actualiza la lista de platos después de eliminar uno
        fetchData(`http://localhost:8080/${tipo}/`, setStateByTipo(tipo));
      } else {
        console.error('Error al eliminar el plato');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud DELETE:', error);
    }
  };

  useEffect(() => {
    fetchData('http://localhost:8080/entradas/', setEntradas);
    fetchData('http://localhost:8080/fondos/', setFondos);
    fetchData('http://localhost:8080/postres/', setPostres);
    fetchData('http://localhost:8080/bebidas/', setBebidas);
  }, []);

  return (
    <div className='admin'>
      <h1>Administrador</h1>
      <div className='table-name'>
        <h2>ENTRADAS</h2>
        <button className='btn-add' onClick={() => handleAgregarPlato('entradas')}>Agregar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {entradas.map((entrada) => (
            <tr key={entrada.id}>
              <td>{entrada.id}</td>
              <td>{entrada.nombre}</td>
              <td>{entrada.precio}</td>
              <td>{entrada.disponible ? 'Disponible' : 'No disponible'}</td>
              <td>{entrada.descripcion}</td>
              <td>
                <button className='btn-edit'>Editar</button>
                <button className='btn-delete' onClick={() => deleteDish(entrada.id, 'entradas')}>Eliminar</button>
              </td>
            </tr>
          ))}
          {showAgregarPlatoForm && (
            <tr>
              <td></td>
              <td><input type="text" value={nuevoPlato.nombre} onChange={(e) => handleChangeNuevoPlato('nombre', e.target.value)} /></td>
              <td><input type="int" value={nuevoPlato.precio} onChange={(e) => handleChangeNuevoPlato('precio', parseInt(e.target.value))} /></td>
              <td>
                <select value={nuevoPlato.disponible} onChange={(e) => handleChangeNuevoPlato('disponible', e.target.value)}>
                  <option value={true}>Disponible</option>
                  <option value={false}>No disponible</option>
                </select>
              </td>
              <td><input type="text" value={nuevoPlato.descripcion} onChange={(e) => handleChangeNuevoPlato('descripcion', e.target.value)} /></td>
              <td colSpan={2}>
                <button onClick={() => agregarPlato('entradas')}>Agregar</button>
                <button onClick={() => setShowAgregarPlatoForm(false)}>Cancelar</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Fondos */}
      <div className='table-name'>
        <h2>FONDOS</h2>
        <button className='btn-add' onClick={() => handleAgregarPlato('fondos')}>Agregar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fondos.map((fondo) => (
            <tr key={fondo.id}>
              <td>{fondo.id}</td>
              <td>{fondo.nombre}</td>
              <td>{fondo.precio}</td>
              <td>{fondo.disponible ? 'Disponible' : 'No disponible'}</td>
              <td>{fondo.descripcion}</td>
              <td>
                <button className='btn-edit'>Editar</button>
                <button className='btn-delete' onClick={() => deleteDish(fondo.id, 'fondos')}>Eliminar</button>
              </td>
            </tr>
          ))}
          {showAgregarPlatoForm && (
            <tr>
              <td></td>
              <td><input type="text" value={nuevoPlato.nombre} onChange={(e) => handleChangeNuevoPlato('nombre', e.target.value)} /></td>
              <td><input type="int" value={nuevoPlato.precio} onChange={(e) => handleChangeNuevoPlato('precio', parseInt(e.target.value))} /></td>
              <td>
                <select value={nuevoPlato.disponible} onChange={(e) => handleChangeNuevoPlato('disponible', e.target.value)}>
                  <option value={true}>Disponible</option>
                  <option value={false}>No disponible</option>
                </select>
              </td>
              <td><input type="text" value={nuevoPlato.descripcion} onChange={(e) => handleChangeNuevoPlato('descripcion', e.target.value)} /></td>
              <td colSpan={2}>
                <button onClick={() => agregarPlato('fondos')}>Agregar</button>
                <button onClick={() => setShowAgregarPlatoForm(false)}>Cancelar</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Postres */}
      <div className='table-name'>
        <h2>POSTRES</h2>
        <button className='btn-add' onClick={() => handleAgregarPlato('postres')}>Agregar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {postres.map((postre) => (
            <tr key={postre.id}>
              <td>{postre.id}</td>
              <td>{postre.nombre}</td>
              <td>{postre.precio}</td>
              <td>{postre.disponible ? 'Disponible' : 'No disponible'}</td>
              <td>{postre.descripcion}</td>
              <td>
                <button className='btn-edit'>Editar</button>
                <button className='btn-delete' onClick={() => deleteDish(postre.id, 'postres')}>Eliminar</button>
              </td>
            </tr>
          ))}
          {showAgregarPlatoForm && (
            <tr>
              <td></td>
              <td><input type="text" value={nuevoPlato.nombre} onChange={(e) => handleChangeNuevoPlato('nombre', e.target.value)} /></td>
              <td><input type="int" value={nuevoPlato.precio} onChange={(e) => handleChangeNuevoPlato('precio', parseInt(e.target.value))} /></td>
              <td>
                <select value={nuevoPlato.disponible} onChange={(e) => handleChangeNuevoPlato('disponible', e.target.value)}>
                  <option value={true}>Disponible</option>
                  <option value={false}>No disponible</option>
                </select>
              </td>
              <td><input type="text" value={nuevoPlato.descripcion} onChange={(e) => handleChangeNuevoPlato('descripcion', e.target.value)} /></td>
              <td colSpan={2}>
                <button onClick={() => agregarPlato('postres')}>Agregar</button>
                <button onClick={() => setShowAgregarPlatoForm(false)}>Cancelar</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Bebidas */}
      <div className='table-name'>
        <h2>BEBIDAS</h2>
        <button className='btn-add' onClick={() => handleAgregarPlato('bebidas')}>Agregar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Descripción</th>
            {showAgregarPlatoForm && <th>Tiene Alcohol</th>}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bebidas.map((bebida) => (
            <tr key={bebida.id}>
              <td>{bebida.id}</td>
              <td>{bebida.nombre}</td>
              <td>{bebida.precio}</td>
              <td>{bebida.disponible ? 'Disponible' : 'No disponible'}</td>
              <td>{bebida.descripcion}</td>
              {showAgregarPlatoForm && <td>{bebida.tieneAlcohol ? 'Sí' : 'No'}</td>} 
              <td>
                <button className='btn-edit'>Editar</button>
                <button className='btn-delete' onClick={() => deleteDish(bebida.id, 'bebidas')}>Eliminar</button>
              </td>
            </tr>
          ))}
          {showAgregarPlatoForm && (
            <tr>
              <td></td>
              <td><input type="text" value={nuevoPlato.nombre} onChange={(e) => handleChangeNuevoPlato('nombre', e.target.value)} /></td>
              <td><input type="int" value={nuevoPlato.precio} onChange={(e) => handleChangeNuevoPlato('precio', parseInt(e.target.value))} /></td>
              <td>
                <select value={nuevoPlato.disponible} onChange={(e) => handleChangeNuevoPlato('disponible', e.target.value)}>
                  <option value={true}>Disponible</option>
                  <option value={false}>No disponible</option>
                </select>
              </td>
              <td><input type="text" value={nuevoPlato.descripcion} onChange={(e) => handleChangeNuevoPlato('descripcion', e.target.value)} /></td>
              <td>
              <label>
              Tiene Alcohol:
              <input type="checkbox" checked={nuevoPlato.tieneAlcohol} onChange={(e) => setNuevoPlato({ ...nuevoPlato, tieneAlcohol: e.target.checked })} />
            </label>
              </td>
              <td colSpan={2}>
                <button onClick={() => agregarPlato('bebidas')}>Agregar</button>
                <button onClick={() => setShowAgregarPlatoForm(false)}>Cancelar</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
