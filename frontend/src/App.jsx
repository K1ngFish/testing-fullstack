import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

    const [locations, setLocations] = useState([])
    const [items, setItems] = useState([])
    const [location, setLocation] = useState(null)
    const [newLocation, setNewLocation] = useState()
    const [newItemName, setNewItemName] = useState()
    const [newItemLocation, setNewItemLocation] = useState(null)
    const [newItemImage, setNewItemImage] = useState()

    useEffect(() => {
        let url = 'http://127.0.0.1:8000/api/locations/?format=json'
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const result = [{

                }, ...data]
                setLocations([{'id' : null, 'name': 'Все места'}].concat(data))
            })
            .catch((err) => {
                console.log(err.message)
            }, [])
    }, []);

    useEffect(() => {
        let url = 'http://127.0.0.1:8000/api/items/?format=json'
        if (location) {
            url += '&location=' + location
        }
    fetch(url)
        .then((response) => response.json())
        .then((data) => {

            setItems(data)
        })
        .catch((err) => {
            console.log(err.message)
        }, [])
}, [location]);

const addLocation = async (name) => {
    await fetch('http://127.0.0.1:8000/api/locations/?format=json', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setLocations((prevLocations) => [...prevLocations, data]);
        setNewLocation('');
    })
    .catch((err) => {
        console.log(err.message);
    });
};
const handleLocationSubmit = (e) => {
   e.preventDefault();
   addLocation(newLocation);
};


const addItem = async (name, location, image) => {

    let data = new FormData()
    data.append('name', name)
    data.append('location', location)
    data.append('image', image)

    await fetch('http://127.0.0.1:8000/api/items/?format=json', {
        method: 'POST',
        body: data,
        // headers: {
        //     'Content-type': 'application/json; charset=UTF-8',
        // },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setItems((prevItems) => [...prevItems, data]);
        setNewItemName('');
        setNewLocation('')
    })
    .catch((err) => {
        console.log(err.message);
    });
};

const handleItemSubmit = (e) => {
   e.preventDefault();
   addItem(newItemName, newItemLocation, newItemImage);
};


  return (
      <>
          <div>
              <form onSubmit={handleLocationSubmit}>
                  <input
                      value={newLocation}
                      type="text"
                      placeholder="Название"
                      onChange={(e) => setNewLocation(e.target.value)}/>
                  <button>Добавить локацию</button>
              </form>
          </div>
          <div>
              <form onSubmit={handleItemSubmit} encType="multipart/form-data">
                  <input
                      value={newItemName}
                      type="text"
                      placeholder="Название"
                      onChange={(e) => setNewItemName(e.target.value)}/>
                  <input
                      type="file"
                      placeholder="Картинка"
                      onChange={(e) => setNewItemImage(e.target.files[0])}/>
                  <select
                      onChange={(e) => setNewItemLocation(e.target.value)}
                      value={newItemLocation}>
                      {locations.map((l) => {
                          return <option
                              key={l.id}
                              value={l.id}>
                              {l.name}
                          </option>
                      })}
                  </select>
                  <button>Добавить предмет</button>
              </form>
          </div>
          <h1>Locations</h1>
          <ul>
              {locations.map((l) => {
                  return <li key={l.id} onClick={() => setLocation(l.id)}>{l.name}</li>
              })}
          </ul>
          <h1>Items</h1>
          <ul>
              {items.map((i) => {
                  return <li className="list-group" key={i.id}>
                      {i.name}
                      {i.image ? <img className='image' src={i.image} alt=""/> : ''}
                  </li>
              })}
          </ul>
      </>
  )
}

export default App
