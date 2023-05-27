import React, { useState, useEffect } from 'react';
import './Home.css';
import IMG1 from '../../assets/img2.png';
import IMG2 from '../../assets/img1.png';
import IMG3 from '../../assets/img4.png';
import IMG4 from '../../assets/img5.png';

const Home = () => {
  const [entradas, setEntradas] = useState([]);
  const [fondos, setFondos] = useState([]);
  const [postres, setPostres] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showAlcoholic, setShowAlcoholic] = useState(true);

  const getEntradas = async () => {
    const response = await fetch('http://localhost:8080/entradas/');
    const data = await response.json();
    setEntradas(data);
  };

  const getFondos = async () => {
    const response = await fetch('http://localhost:8080/fondos/');
    const data = await response.json();
    setFondos(data);
  };

  const getPostres = async () => {
    const response = await fetch('http://localhost:8080/postres/');
    const data = await response.json();
    setPostres(data);
  };

  const getBebidas = async () => {
    const response = await fetch('http://localhost:8080/bebidas/');
    const data = await response.json();
    setBebidas(data);
    console.log(data);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleFilterAlcoholicChange = (event) => {
    setShowAlcoholic(event.target.value === 'alcoholic');
  };

  const filteredBebidas = showAlcoholic
  ? bebidas.filter((bebida) => bebida.tieneAlcohol)
  : bebidas.filter((bebida) => !bebida.tieneAlcohol);

  useEffect(() => {
    getEntradas();
    getFondos();
    getPostres();
    getBebidas();
  }, []);


  return (
    <div>
      <div className='background-wave'>
        <h1 className='title'>Menú</h1>
        <div className='filter-container'>
        <select value={selectedFilter} onChange={handleFilterChange} className='filter-select'>
          <option value=''>Sin filtrar</option>
          <option value='entradas'>Entradas</option>
          <option value='segundos'>Segundos</option>
          <option value='postres'>Postres</option>
          <option value='bebidas'>Bebidas</option>
        </select>
        </div>
      </div>

      {(selectedFilter === '' || selectedFilter === 'entradas') && (
        <div className='food-container'>
          <h2 className='title'>Entradas</h2>
          <div className='food-container-list'>
            <div className='food-container-content'>
              {entradas.map(entrada => (
                <div className='food-container-item' key={entrada.id}>
                  <div className='food-title'>
                    <h3 className='name'>{entrada.nombre}</h3>
                    <p className='price'>S/{entrada.precio}</p>
                  </div>
                  <p className='description'>{entrada.descripcion}</p>
                </div>
              ))}
            </div>
            <div className='food-container-image'>
              <img src={IMG1} alt='img1' className='img1' />
            </div>
          </div>
        </div>
      )}

      {(selectedFilter === '' || selectedFilter === 'segundos') && (
        <div className='food-container'>
          <h2 className='title'>Segundos</h2>
          <div className='food-container-list'>
            <div className='food-container-image'>
              <img src={IMG2} alt='img1' className='img1' />
            </div>
            <div className='food-container-content'>
              {fondos.map(fondos => (
                <div className='food-container-item' key={fondos.id}>
                  <div className='food-title'>
                    <h3 className='name'>{fondos.nombre}</h3>
                    <p className='price'>S/{fondos.precio}</p>
                  </div>
                  <p className='description'>{fondos.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(selectedFilter === '' || selectedFilter === 'postres') && (
        <div className='food-container'>
          <h2 className='title'>Postres</h2>
          <div className='food-container-list'>
            <div className='food-container-content'>
              {postres.map(postre => (
                <div className='food-container-item' key={postre.id}>
                  <div className='food-title'>
                    <h3 className='name'>{postre.nombre}</h3>
                    <p className='price'>S/{postre.precio}</p>
                  </div>
                  <p className='description'>{postre.descripcion}</p>
                </div>
              ))}
            </div>
            <div className='food-container-image'>
              <img src={IMG3} alt='img1' className='img1' />
            </div>
          </div>
        </div>
      )}

      {(selectedFilter === '' || selectedFilter === 'bebidas') && (
        <div className='food-container'>
          <h2 className='title'>Bebidas</h2>
          <div className='filter-alcoholic'>
            <button
              type='radio'
              name='filter'
              value='alcoholic'
              checked={showAlcoholic}
              onClick={handleFilterAlcoholicChange}
            >Con Alcohol</button>
            <button
              type='radio'
              name='filter'
              value='non-alcoholic'
              checked={!showAlcoholic}
              onClick={handleFilterAlcoholicChange}
            > Sin Alcohol</button>
        </div>
          <div className='food-container-list'>
            <div className='food-container-image'>
              <img src={IMG4} alt='img1' className='img1' />
            </div>
            <div className='food-container-content'>
              {filteredBebidas.map(bebida => (
                <div className='food-container-item' key={bebida.id}>
                  <div className='food-title'>
                    <h3 className='name'>{bebida.nombre}</h3>
                    <p className='price'>S/{bebida.precio}</p>
                  </div>
                  <p className='description'>{bebida.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className='background-wave-footer'></div>
    </div>
  );
};

export default Home;
