import React from 'react'
import FormBar from './FormBar.js'
import PokemonImage from './PokemonImage.js'

const PokemonCard = ({ pokemon, url }) => {

    const typeIcon = pokemon.types.map(type => {
        const url = "http://localhost:3001/Images/Types/" + type + ".png"
        return <PokemonImage type={type} url={url} />
    })

    return (
        <div className={`item ${pokemon.family}`} >
            <p key={pokemon.dexid} className='name'>{pokemon.dexid + "-" + pokemon.name + " " + pokemon.images.length}</p>
            <div className='typesImg'>{typeIcon}</div>
            <PokemonImage type={null} url={url} name={pokemon.name} />
            <FormBar dexid={pokemon.dexid} />
        </div>
    )
}

export default PokemonCard