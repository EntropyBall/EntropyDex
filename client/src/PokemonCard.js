import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"

const PokemonCard = ({ pokemon, url }) => {
    const types = pokemon.types.map(type => {
        return <LazyLoadImage
            src={"http://localhost:3001/Images/Types/" + type + ".png"}
            alt={type}
            width="20"
            length="20"
        />
    })
    console.log(types)
    return (
        <div className={`item ${pokemon.family}`}>
            <p className='name'>{pokemon.dexid}-{pokemon.name}-{pokemon.images.length}</p>
            <div className='typesImg'>{types}</div>
            <LazyLoadImage
                className='pokemonImg'
                src={url}
                alt={pokemon.name}
                loading={"lazy"}
            />
        </div>
    )
}

export default PokemonCard