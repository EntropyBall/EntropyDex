import React, { memo } from 'react'

const PokemonImage = memo(function PokemonImage({ type, url, name }) {
    if (type) {
        return (
            <img
                loading={"lazy"}
                src={url}
                alt={type}
                width="20"
                length="20"
            />
        )
    }
    return (
        <div className='pokemonImage'>
            <img
                loading={"lazy"}
                src={url}
                alt={name}
            />
        </div>
    )
})

export default PokemonImage