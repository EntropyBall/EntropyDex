import './App.css'
import React, { useState, useEffect } from "react"
import axios from 'axios'
import PokemonItem from './PokemonItem.js'
import { FormContext } from './FormContext.js'
import { AccountContext } from './AccountContext.js'
import NavBar from './NavBar'
const { v4: uuid } = require('uuid')

const App = () => {
  const [pokemons, setPokemons] = useState([])
  const accounts = [{
    name: "EntropyBall",
    team: "Valor",
    selected: true
  }, {
    name: "EntropyBalI",
    team: "Mystic",
    selected: false
  }]
  accounts.forEach(a => console.log(a.name, a.selected))
  // Nested map ('Entropy', ("0001", { lucky: true }))
  const form = new Map()
  accounts.forEach(account => {
    form.set(account.name, new Map())
  })
  // Update forms from localStorage
  const currentAccount = accounts.find(account => account.selected)
  const arrayStorage = JSON.parse(localStorage.getItem(currentAccount.name))
  const mapStorage = new Map(arrayStorage)
  form.set(currentAccount.name, mapStorage)

  useEffect(() => {
    // Local Endpoint API
    axios.get('http://localhost:3001/getPokemons')
      .then((response) => {
        setPokemons(response.data)
      })
      .catch(err => console.log(err))
    // Retrieve  & set accounts from DB
  }, [])




  const PokemonItems = (pokemons.map(pokemon => {
    return <PokemonItem key={uuid()} pokemon={pokemon} />
  }))

  /* === HTML === */
  return (
    <>
      <AccountContext.Provider value={accounts}>
        <FormContext.Provider value={form}>
          <NavBar />
          <div className='items'>
            {PokemonItems}
          </div>
        </FormContext.Provider>
      </AccountContext.Provider>
    </>
  );
}

export default App;