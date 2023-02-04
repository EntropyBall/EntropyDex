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
    const handleClickLucky = (dexid) => {
        // save/remove to local storage
        // show/hide lucky
        console.log(dexid)
    }
    return (
        <div className={`item ${pokemon.family}`} onClick={() => handleClickLucky(pokemon.dexid)}>
            <p className='name'>{pokemon.dexid}-{pokemon.name}-{pokemon.images.length}</p>
            <div className='typesImg'>{types}</div>
            <LazyLoadImage
                className='pokemonImg'
                src={url}
                alt={pokemon.name}
                loading={"lazy"}
            />
            <p className='lucky'>Lucky pokemon</p>
        </div>
    )
}

export default PokemonCard