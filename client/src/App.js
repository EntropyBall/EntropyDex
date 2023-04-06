import './App.css'
import React, { useState, useEffect } from "react"
import axios from 'axios'
import PokemonItem from './PokemonItem.js'
import FormContext from './formContext.js'
const { v4: uuid } = require('uuid')

function App() {
  const [pokemons, setPokemons] = useState([])
  const [form, setForm] = useState(new Map())

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
      <FormContext.Provider value={form}>
        {PokemonItems}
      </FormContext.Provider>
    </div>
  );
}

export default App;