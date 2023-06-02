import React, { useState, useEffect } from 'react';
import './Admin.css';
import Table from '../../components/Tables/Tables';

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
  const [editMode, setEditMode] = useState(false);
  const [editedPlato, setEditedPlato] = useState(null);
  const handleEditPlato = (plato) => {
    setEditMode(true);
    setEditedPlato(plato);
  };
  const handleSaveEdit = (updatedPlato) => {
    // Lógica para guardar los cambios del plato editado
    // Actualizar el estado de los platos
    setNuevoPlato((prevPlatos) =>
      prevPlatos.map((plato) =>
        plato.id === updatedPlato.id ? updatedPlato : plato
      )
    );
    setEditMode(false);
    setEditedPlato(null);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedPlato(null);
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
    fetchData('http://localhost:8080/entradas/complete', setEntradas);
    fetchData('http://localhost:8080/fondos/complete', setFondos);
    fetchData('http://localhost:8080/postres/complete', setPostres);
    fetchData('http://localhost:8080/bebidas/complete', setBebidas);
  }, []);

  return (
    <div className='admin'>
      <h1>Administrador</h1>

      <Table
      platos={entradas}
      tipo='entradas'
      handleAgregarPlato={handleAgregarPlato}
      deleteDish={deleteDish}
      showAgregarPlatoForm={showAgregarPlatoForm}
      setShowAgregarPlatoForm={setShowAgregarPlatoForm}
      nuevoPlato={nuevoPlato}
      handleChangeNuevoPlato={handleChangeNuevoPlato}
      agregarPlato={agregarPlato}
      handleEditPlato={handleEditPlato}
      handleSaveEdit={handleSaveEdit}
      handleCancelEdit={handleCancelEdit}
      editMode={editMode}
      editedPlato={editedPlato}
    />

      {/* Fondos */}
      <Table
      platos={fondos}
      tipo='fondos'
      handleAgregarPlato={handleAgregarPlato}
      deleteDish={deleteDish}
      showAgregarPlatoForm={showAgregarPlatoForm}
      setShowAgregarPlatoForm={setShowAgregarPlatoForm}
      nuevoPlato={nuevoPlato}
      handleChangeNuevoPlato={handleChangeNuevoPlato}
      agregarPlato={agregarPlato}
      handleEditPlato={handleEditPlato}
      handleSaveEdit={handleSaveEdit}
      handleCancelEdit={handleCancelEdit}
      editMode={editMode}
      editedPlato={editedPlato}
    />

      {/* Postres */}
      <Table
      platos={postres}
      tipo='postres'
      handleAgregarPlato={handleAgregarPlato}
      deleteDish={deleteDish}
      showAgregarPlatoForm={showAgregarPlatoForm}
      setShowAgregarPlatoForm={setShowAgregarPlatoForm}
      nuevoPlato={nuevoPlato}
      handleChangeNuevoPlato={handleChangeNuevoPlato}
      agregarPlato={agregarPlato}
      handleEditPlato={handleEditPlato}
      handleSaveEdit={handleSaveEdit}
      handleCancelEdit={handleCancelEdit}
      editMode={editMode}
      editedPlato={editedPlato}
    />

    
      {/* Bebidas */} 
      <Table
      platos={bebidas}
      tipo='bebidas'
      handleAgregarPlato={handleAgregarPlato}
      deleteDish={deleteDish}
      showAgregarPlatoForm={showAgregarPlatoForm}
      setShowAgregarPlatoForm={setShowAgregarPlatoForm}
      nuevoPlato={nuevoPlato}
      handleChangeNuevoPlato={handleChangeNuevoPlato}
      agregarPlato={agregarPlato}
      showTieneAlcohol={true}
      handleEditPlato={handleEditPlato}
      handleSaveEdit={handleSaveEdit}
      handleCancelEdit={handleCancelEdit}
      editMode={editMode}
      editedPlato={editedPlato}
    />

    </div>
  );
};

export default Admin;
