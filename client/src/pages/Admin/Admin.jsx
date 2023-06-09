import React, { useState, useEffect, useContext } from 'react';
import './Admin.css';
import Table from '../../components/Tables/Tables';
import { AuthContext } from '../../components/AuthContext/AuthContext';

const Admin = () => {
  const [entradas, setEntradas] = useState([]);
  const [fondos, setFondos] = useState([]);
  const [postres, setPostres] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [showAgregarPlatoForm, setShowAgregarPlatoForm] = useState(false);
  const [tipoPlato, setTipoPlato] = useState('');
  const [nuevoPlato, setNuevoPlato] = useState({
    nombre: '',
    precio: '',
    disponible: true,
    descripcion: '',
    tieneAlcohol: false
  });
  const [editMode, setEditMode] = useState(false);
  const [editedPlato, setEditedPlato] = useState({
    id: '',
    nombre: '',
    precio: '',
    disponible: true,
    descripcion: '',
    tieneAlcohol: false
  });
  const {logout} = useContext(AuthContext);

  const handleEditPlato = (plato, tipo) => {
    setEditMode(true);
    setEditedPlato(plato);
    setTipoPlato(tipo);
  };

  const handleSaveEdit = async (tipo) => {
    try {
      const response = await fetch(`http://localhost:8080/${tipo}/edit-dish/${editedPlato.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedPlato)
        
      });
console.log(editedPlato)
      if (response.ok) {
        // Actualiza la lista de platos después de guardar los cambios
        fetchData(`http://localhost:8080/${tipo}/complete`, setStateByTipo(tipo));

        // Restablece el modo de edición y el plato editado
        setEditMode(false);
        setEditedPlato({
          id: '',
          nombre: '',
          precio: '',
          disponible: true,
          descripcion: '',
          tieneAlcohol: false
        });
      } else {
        console.error('Error al guardar los cambios del plato');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud PUT:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedPlato({
      id: '',
      nombre: '',
      precio: '',
      disponible: true,
      descripcion: '',
      tieneAlcohol: false
    });
  };

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

      if (response.ok) {
        // Actualiza la lista de platos después de agregar uno nuevo
        fetchData(`http://localhost:8080/${tipo}/`, setStateByTipo(tipo));

        // Restablece el formulario y el estado
        setNuevoPlato({
          nombre: '',
          precio: '',
          disponible: true,
          descripcion: '',
          tieneAlcohol: false
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

  const handleAgregarPlato = (tipo) => {
    setNuevoPlato({
      nombre: '',
      precio: '',
      disponible: true,
      descripcion: '',
      tieneAlcohol: false
    });
    setShowAgregarPlatoForm(true);
    setTipoPlato(tipo);
  };

  const handleChangeNuevoPlato = (campo, valor) => {
    setNuevoPlato((prevState) => ({
      ...prevState,
      [campo]: valor
    }));
  };

  const handleChangeEditedPlato = (campo, valor) => {
    setEditedPlato((prevState) => ({
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
    fetchData('http://localhost:8080/entradas/complete', setEntradas);
    fetchData('http://localhost:8080/fondos/complete', setFondos);
    fetchData('http://localhost:8080/postres/complete', setPostres);
    fetchData('http://localhost:8080/bebidas/complete', setBebidas);
  }, []);

  return (
    <div className='admin'>
      <h1>Administrador</h1>
      <button className='logout' onClick={logout}>Cerrar sesión</button>
      <Table
        platos={entradas}
        tipo='entradas'
        handleAgregarPlato={handleAgregarPlato}
        deleteDish={deleteDish}
        showAgregarPlatoForm={showAgregarPlatoForm}
        setShowAgregarPlatoForm={setShowAgregarPlatoForm}
        tipoPlato={tipoPlato}
        nuevoPlato={nuevoPlato}
        handleChangeNuevoPlato={handleChangeNuevoPlato}
        agregarPlato={agregarPlato}
        handleEditPlato={handleEditPlato}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        editMode={editMode}
        editedPlato={editedPlato}
        handleChangeEditedPlato={handleChangeEditedPlato}
      />

      {/* Fondos */}
      <Table
      platos={fondos}
      tipo='fondos'
      handleAgregarPlato={handleAgregarPlato}
      deleteDish={deleteDish}
      showAgregarPlatoForm={showAgregarPlatoForm}
      setShowAgregarPlatoForm={setShowAgregarPlatoForm}
      tipoPlato={tipoPlato}
      nuevoPlato={nuevoPlato}
      handleChangeNuevoPlato={handleChangeNuevoPlato}
      agregarPlato={agregarPlato}
      handleEditPlato={handleEditPlato}
      handleSaveEdit={handleSaveEdit}
      handleCancelEdit={handleCancelEdit}
      editMode={editMode}
      editedPlato={editedPlato}
      handleChangeEditedPlato={handleChangeEditedPlato}
    />

      {/* Postres */}
      <Table
      platos={postres}
      tipo='postres'
      handleAgregarPlato={handleAgregarPlato}
      deleteDish={deleteDish}
      showAgregarPlatoForm={showAgregarPlatoForm}
      tipoPlato={tipoPlato}
      setShowAgregarPlatoForm={setShowAgregarPlatoForm}
      nuevoPlato={nuevoPlato}
      handleChangeNuevoPlato={handleChangeNuevoPlato}
      agregarPlato={agregarPlato}
      handleEditPlato={handleEditPlato}
      handleSaveEdit={handleSaveEdit}
      handleCancelEdit={handleCancelEdit}
      editMode={editMode}
      editedPlato={editedPlato}
      handleChangeEditedPlato={handleChangeEditedPlato}
    />

    
      {/* Bebidas */} 
      <Table
      platos={bebidas}
      tipo='bebidas'
      handleAgregarPlato={handleAgregarPlato}
      deleteDish={deleteDish}
      showAgregarPlatoForm={showAgregarPlatoForm}
      setShowAgregarPlatoForm={setShowAgregarPlatoForm}
      tipoPlato={tipoPlato}
      nuevoPlato={nuevoPlato}
      handleChangeNuevoPlato={handleChangeNuevoPlato}
      agregarPlato={agregarPlato}
      showTieneAlcohol={true}
      handleEditPlato={handleEditPlato}
      handleSaveEdit={handleSaveEdit}
      handleCancelEdit={handleCancelEdit}
      editMode={editMode}
      editedPlato={editedPlato}
      handleChangeEditedPlato={handleChangeEditedPlato}
    />
    </div>
  );
};

export default Admin;
