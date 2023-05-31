import React from 'react';

const Table = ({
  platos,
  tipo,
  handleAgregarPlato,
  deleteDish,
  showAgregarPlatoForm,
  nuevoPlato,
  handleChangeNuevoPlato,
  agregarPlato,
  setShowAgregarPlatoForm,
  showTieneAlcohol
}) => {
  return (
    <>
      <div className='table-name'>
        <h2>{tipo.toUpperCase()}</h2>
        <button className='btn-add' onClick={() => handleAgregarPlato(tipo)}>
          Agregar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Descripción</th>
            {showTieneAlcohol && <th>Tiene Alcohol</th>}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {platos.map((plato) => (
            <tr key={plato.id}>
              <td>{plato.id}</td>
              <td>{plato.nombre}</td>
              <td>{plato.precio}</td>
              <td>{plato.disponible ? 'Disponible' : 'No disponible'}</td>
              <td>{plato.descripcion}</td>
                {showTieneAlcohol && <td>{plato.tieneAlcohol ? 'Sí' : 'No'}</td>}
              <td>
                <button className='btn-edit'>Editar</button>
                <button
                  className='btn-delete'
                  onClick={() => deleteDish(plato.id, tipo)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {showAgregarPlatoForm && (
            <tr>
              <td></td>
              <td>
                <input
                  type='text'
                  value={nuevoPlato.nombre}
                  onChange={(e) =>
                    handleChangeNuevoPlato('nombre', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type='number'
                  value={nuevoPlato.precio}
                  onChange={(e) =>
                    handleChangeNuevoPlato('precio', parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <select
                  value={nuevoPlato.disponible}
                  onChange={(e) =>
                    handleChangeNuevoPlato('disponible', e.target.value)
                  }
                >
                  <option value={true}>Disponible</option>
                  <option value={false}>No disponible</option>
                </select>
              </td>
              <td>
                <input
                  type='text'
                  value={nuevoPlato.descripcion}
                  onChange={(e) =>
                    handleChangeNuevoPlato('descripcion', e.target.value)
                  }
                />
              </td>
              {showTieneAlcohol && ( 
              <td>
                <label>
                  Tiene Alcohol:
                  <input
                    type='checkbox'
                    checked={nuevoPlato.tieneAlcohol}
                    onChange={(e) =>
                      handleChangeNuevoPlato({
                        ...nuevoPlato,
                        tieneAlcohol: e.target.checked
                      })
                    }
                  />
                </label>
              </td>
            )}
              <td colSpan={2}>
                <button onClick={() => agregarPlato(tipo)}>Agregar</button>
                <button onClick={() => setShowAgregarPlatoForm(false)}>
                  Cancelar
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
