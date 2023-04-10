import './App.css'
import React, { useState, useEffect } from "react"
import axios from 'axios'
import PokemonItem from './PokemonItem.js'
import { FormContext } from './FormContext.js'
import { AccountContext } from './AccountContext.js'
import NavBar from './NavBar'
const { v4: uuid } = require('uuid')

function App() {
  const [pokemons, setPokemons] = useState([])
  const [accounts, setAccounts] = useState([{
    name: "EntropyBall",
    selected: true
  }, {
    name: "EntropyBalI",
    selected: false
  }])
  // Nested map ('Entropy', ("0001", { lucky: true }))
  const form = new Map()

  useEffect(() => {
    // Local Endpoint API
    axios.get('http://localhost:3001/getPokemons')
      .then((response) => {
        setPokemons(response.data)
        // setLocalStorage here
      })
      .catch(err => console.log(err))

    // For each account create a Map and set the map
    accounts.map(account => {
      if (localStorage.getItem(account.name)) {
        form.set(account.name, JSON.parse(localStorage.getItem(account.name)))
      }
      form.set(account.name, new Map())
    })
    console.log(form)
  }, [])
  const PokemonItems = (pokemons.map(pokemon => {
    return <PokemonItem key={uuid()} pokemon={pokemon} />
  }))

  /* === HTML === */
  return (
    <>
      <AccountContext.Provider value={{ accounts, setAccounts }}>
        <NavBar accounts={accounts} />
        <div className='items'>
          <FormContext.Provider value={form}>
            {PokemonItems}
          </FormContext.Provider>
        </div>
      </AccountContext.Provider>
    </>
  );
}

export default App;