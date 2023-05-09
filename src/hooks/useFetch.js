import React, { useEffect, useState } from 'react'
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_TOKEN);
Geocode.setLanguage("da");
Geocode.setLocationType("ROOFTOP");

const  useFetch = (url) => {
    const [loading, setLoading] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

       const fetchData = async () => {
        setLoading(true)

        try{
            const res =  await fetch(url)
            if(!res.ok){
                throw new Error(res.statusText)
            }
            const json = await res.json()

            const sorted =  json.items.map(async (item) => {
                const asyncFunc = async () => {

                    const geo = await Geocode.fromAddress(item.country)
                    const { lat, lng } = geo.results[0].geometry.location

                    return { lat, lng }
                }

                const { lat, lng } = await asyncFunc()

                return {...item, lat, lng}
            })

            Promise.all(sorted).then((data) => setData(data))

            setLoading(false)
            setError(null)
        } catch(err) {
            setLoading(false)
            setError("Could not fetch the data")
            console.log(err.message);
        }
       }

        //fetch data
       fetchData()
    }, [url])

    return { loading, data, error}
}

export default useFetch
