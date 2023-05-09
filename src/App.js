import './App.css';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import maplibregl from "maplibre-gl"
import useFetch from './hooks/useFetch';
import Geocode from "react-geocode";

//components
import Modal from './components/Modal';
import Info from './components/Info';
import { useState } from 'react';



//geocode
Geocode.setApiKey("AIzaSyAFo2NPFepHjZpvC9KWRCY5lBtLYkHehtE");
Geocode.setLanguage("da");
Geocode.setLocationType("ROOFTOP");

function App() {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const {loading, data, error} = useFetch("https://api.mediehuset.net/erasmus_worldmap/activities")

  const handleOpen = (item) => {
    setModalContent(item)
    setShowModal(true)
  }
  const handleClose = () => {
    setModalContent(null)
    setShowModal(false)
  }
  return (
    <div className="App">
      <Info data={data}/>
      <Map mapLib={maplibregl}
        initialViewState={{
          longitude: 8.90,
          latitude: 48.78,
          zoom: 3
        }}
        style={{
          width: "75%",
          height: "100vh"
        }}
        mapStyle={`https://api.maptiler.com/maps/dataviz/style.json?key=${process.env.REACT_APP_SECRET_MAP}`}
      >
        {data && data.map(item => (
          <Marker longitude={Number(item.lng)} latitude={Number(item.lat)} color='#ba1f1f' onClick={() => handleOpen(item)} key={item.id}/>
        ))}  
      </Map>
      {showModal && <Modal item={modalContent} handleClose={handleClose} />}
    </div>
  );
}

export default App;
