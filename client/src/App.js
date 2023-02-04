import './App.css'
import React, { useState, useEffect } from "react"
import axios from 'axios'
import PokemonItem from './PokemonItem.js'
const { v4: uuid } = require('uuid')

function App() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    // Local Endpoint API
    axios.get('http://localhost:3001/getPokemons')
      .then((response) => {
        setPokemons(response.data)
        // setLocalStorage here
      })
      .catch(err => console.log(err))
  }, [])
  const PokemonItems = (pokemons.map(pokemon => {
    return <PokemonItem key={uuid()} pokemon={pokemon} />
  }))

  /* === HTML === */
  return (
    <div className='items'>
      {PokemonItems}
    </div>
  );
}

export default App;