import './App.css';
import Map, { Marker } from 'react-map-gl';
import maplibregl from "maplibre-gl"
import useFetch from './hooks/useFetch';

//components
import Modal from './components/Modal';
import Info from './components/Info';
import { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const {loading, data, error} = useFetch("https://api.mediehuset.net/erasmus_worldmap/activities")

  let timeOut;

  const handleOpen = (item) => {
    setModalContent(item)
    setShowModal(true)
    timeOut = setTimeout(() => {
      setModalContent(null)
      setShowModal(false)
    }, 300000);
  }
  const handleClose = () => {
    clearTimeout(timeOut)
    setModalContent(null)
    setShowModal(false)
  }

  return (
    <div className="App">
      <Info data={data} handleOpen={handleOpen}/>
      <Map mapLib={maplibregl}
        initialViewState={{
          longitude: 8.90,
          latitude: 48.78,
          zoom: 2.6
        }}
        style={{
          width: "75%",
          height: "100vh"
        }}
        mapStyle={`https://api.maptiler.com/maps/dataviz/style.json?key=${process.env.REACT_APP_SECRET_MAP}`}
      >
        {error && <p>{error}</p>}
        {data && data.map(item => (
          <Marker longitude={Number(item.lng)} latitude={Number(item.lat)} color='#ba1f1f' onClick={() => handleOpen(item)} key={item.id} style={{cursor: "pointer"}}/>
        ))}  
      </Map>
      {showModal && <Modal item={modalContent} handleClose={handleClose}/>}
    </div>
  );
}

export default App;
