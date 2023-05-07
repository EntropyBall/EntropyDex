import React from 'react'
import PokemonImage from './PokemonImage'

const PokemonTitle = ({ dexid, name, types, images }) => {

    const typeIcon = types.map(type => {
        const url = "http://localhost:3001/Images/Types/" + type + ".png"
        return <PokemonImage key={type} type={type} url={url} />
    })

    return (
        <div className='pokemonTitle'>
            <p className='name'>{name}</p>
            <div className='typesImg'>{typeIcon}</div>
        </div>
    )
}

export default PokemonTitle