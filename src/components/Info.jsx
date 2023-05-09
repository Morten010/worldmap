import React from 'react'

export default function Info({data}) {
  
  return (
    <div className='info'>
        <h1>PRAKTIK I UDLANDET</h1>
        {data && data.map(item => (
          <div className="card" key={item.id}>
            <p>{new Date().toLocaleString("da-DK", {weekday: "long", day: "numeric", month: "long", year: "numeric"})}</p>
            <img src={item.images[0].filename} alt={item.images[0].title} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  )
}
