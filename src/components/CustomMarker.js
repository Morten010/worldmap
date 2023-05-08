import React from 'react'
import { Marker } from 'react-map-gl'
import useFindLocation from '../hooks/useFindLocation'

export default function CustomMarker({item}) {
    const {lat, lng} = useFindLocation(`${item.city}, ${item.country}`)
    console.log(`${item.city}, ${item.country}`);
    if(!lng){
        return
    }
    console.log(lat, lng);
  return <Marker latitude={lat} longitude={lng} color='#61dbfb'/>   
}
