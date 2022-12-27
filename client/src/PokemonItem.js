import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"

const PokemonItem = ({ pokemon }) => {
    const baseForm = pokemon.images.find(image => !image.filename.includes('.s.'))
    const baseFormURL = baseForm ?
        "http://localhost:3001/images/Pokemon/" + baseForm.filename :
        ""

    // USE LOADING LAZY REACT https://www.youtube.com/watch?v=8viWcH5bUE4
    return (
        <div className={`item ${pokemon.family}`}>
            <p className='name'>{pokemon.name}-{pokemon.images.length}</p>
            {(baseForm &&
                <LazyLoadImage
                    className='pokemonImg'
                    src={baseFormURL}
                    alt={pokemon.name}
                    loading={"lazy"}
                />
            )}
            {/* {pokemon.dexid} - {pokemon.name} {pokemon.region} */}
        </div>
    )
}

export default PokemonItem