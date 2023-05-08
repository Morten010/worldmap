import Geocode from "react-geocode";
import React, { useEffect, useState } from 'react'

Geocode.setApiKey("AIzaSyAFo2NPFepHjZpvC9KWRCY5lBtLYkHehtE");
Geocode.setLanguage("da");
Geocode.setLocationType("ROOFTOP");


export default function useFindLocation(location) {
    const [data, setData] = useState(null)
    useEffect(() => {

        Geocode.fromAddress(location).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setData({lat, lng})
            },
            (error) => {
              console.error(error);
              console.log("here is the error ",location);
            }
        );

    }, [])
    
    return {data}
}


