import './App.css';
import Info from './components/Info';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import maplibregl from "maplibre-gl"
import useFetch from './hooks/useFetch';
import CustomMarker from './components/CustomMarker';
import Geocode from "react-geocode";
import { useState } from 'react';


//geocode
Geocode.setApiKey("AIzaSyAFo2NPFepHjZpvC9KWRCY5lBtLYkHehtE");
Geocode.setLanguage("da");
Geocode.setLocationType("ROOFTOP");

function App() {
  const [data, setdata] = useState(null)
  const {loading, data, error} = useFetch("https://api.mediehuset.net/erasmus_worldmap/activities")
  
  console.log(data.items);

  return (
    <div className="App">
      <Info />
      <Map mapLib={maplibregl}
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 1
        }}
        style={{
          width: "50%",
          height: "100vh"
        }}
        mapStyle={`https://api.maptiler.com/maps/dataviz/style.json?key=TzQlNDtjzgOYYQaCLylb`}
      >
        {/* {data && sorted.map(item => (
            <Marker latitude={item.lat} longitude={item.lng} key={item.id} onClick={() => handleModal(item)} style={{
              cursor: "pointer"
            }}/>
        ))} */}
      </Map>
    </div>
  );
}

export default App;
