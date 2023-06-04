import React from 'react';

const Table = ({
  platos,
  tipo,
  tipoPlato,
  handleAgregarPlato,
  deleteDish,
  showAgregarPlatoForm,
  nuevoPlato,
  handleChangeNuevoPlato,
  agregarPlato,
  setShowAgregarPlatoForm,
  showTieneAlcohol,
  handleEditPlato,
  handleSaveEdit,
  handleCancelEdit,
  editMode,
  editedPlato,
  handleChangeEditedPlato,
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
            {showTieneAlcohol && tipo === 'bebidas' && <th>Tiene Alcohol</th>}
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
              {showTieneAlcohol && tipo === 'bebidas' && <td>{plato.tieneAlcohol ? 'Sí' : 'No'}</td>}
              <td>
                <button className='btn-edit' onClick={() => handleEditPlato(plato, tipo)}>Editar</button>
                <button className='btn-delete' onClick={() => deleteDish(plato.id, tipo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {showAgregarPlatoForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar Nuevo Plato a {tipoPlato}</h3>
            <div className="form">
              <label>Nombre:</label>
              <input
                type='text'
                value={nuevoPlato.nombre}
                onChange={(e) =>
                  handleChangeNuevoPlato('nombre', e.target.value)
                }
              />
              <label>Precio:</label>
              <input
                type='number'
                value={nuevoPlato.precio}
                onChange={(e) =>
                  handleChangeNuevoPlato('precio', parseInt(e.target.value))
                }
              />
              <label>Disponible:</label>
              <select
                value={nuevoPlato.disponible}
                onChange={(e) =>
                  handleChangeEditedPlato('disponible' ,e.target.value === 'true')
                }
              >
                <option value={true}>Disponible</option>
                <option value={false}>No disponible</option>
              </select>
              <label>Descripción:</label>
              <input
                type='text'
                value={nuevoPlato.descripcion}
                onChange={(e) =>
                  handleChangeNuevoPlato('descripcion', e.target.value)
                }
              />
              {showTieneAlcohol && tipoPlato === 'bebidas' && (
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
              )}
              <div className="button-group">
                <button onClick={() => agregarPlato(tipoPlato)}>Agregar</button>
                <button onClick={() => setShowAgregarPlatoForm(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editMode && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Plato</h3>
            <div className="form">
              <label>ID:</label>
              <input type='text' value={editedPlato.id} readOnly />
              <label>Nombre:</label>
              <input
                type='text'
                value={editedPlato.nombre}
                onChange={(e) =>
                  handleChangeEditedPlato('nombre' ,e.target.value)
                }
              />
              <label>Precio:</label>
              <input
                type='number'
                value={editedPlato.precio}
                onChange={(e) =>
                  handleChangeEditedPlato( 'precio' ,parseInt(e.target.value))
                }
              />
              <label>Disponible:</label>
              <select
                value={editedPlato.disponible}
                onChange={(e) =>
                  handleChangeEditedPlato('disponible' ,e.target.value === 'true')
                }
              >
                <option value={true}>Disponible</option>
                <option value={false}>No disponible</option>
              </select>
              <label>Descripción:</label>
              <input
                type='text'
                value={editedPlato.descripcion}
                onChange={(e) => 
                  handleChangeEditedPlato('descripcion' ,e.target.value)
                }
              />
              {tipoPlato === 'bebidas' && (
                <>
                  <label>Tiene alcohol:</label>
                  <select
                    value={editedPlato.tieneAlcohol}
                    onChange={(e) => handleChangeEditedPlato('tieneAlcohol', e.target.value === 'true')}
                  >
                    <option value='true'>Sí</option>
                    <option value='false'>No</option>
                  </select>
                </>
              )}
              
              <div className="button-group">
                <button onClick={() => handleSaveEdit(tipoPlato)}>Guardar</button>
                <button onClick={() => handleCancelEdit()}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
