import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

    const [locations, setLocations] = useState([])
    const [items, setItems] = useState([])

    const [location, setLocation] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/locations/?format=json')
            .then((response) => response.json())
            .then((data) => {
                setLocations(data)
            })
            .catch((err) => {
                console.log(err.message)
            }, [])
    }, []);

    useEffect(() => {
    fetch('http://127.0.0.1:8000/api/items/?format=json')
        .then((response) => response.json())
        .then((data) => {

            setItems(data)
        })
        .catch((err) => {
            console.log(err.message)
        }, [])
}, []);

  return (
      <>
          <h1>Locations</h1>
          <ul>
              {locations.map((l) => {
                  return <li key={l.id}>{l.name}</li>
              })}
          </ul>
          <h1>Items</h1>
          <ul>
              {items.map((i) => {
                  return <li key={i.id}>{i.name}</li>
              })}
          </ul>
      </>
  )
}

export default App
