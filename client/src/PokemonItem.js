import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"

const PokemonItem = ({ pokemon }) => {
    // USE LOADING LAZY REACT https://www.youtube.com/watch?v=8viWcH5bUE4
    return (
        <div className={`item ${pokemon.family}`}>

            {(pokemon.images.length &&
                <LazyLoadImage
                    className='pokemonImg'
                    src={"http://localhost:3001/images/Pokemon/" + pokemon.images[0].filename}
                    // src={"/images/Pokemon/" + pokemon.images[0].filename}
                    alt="pokemon.images[1]"
                />)}
            {/* {pokemon.dexid} - {pokemon.name} {pokemon.region} */}
        </div>
    )
}

export default PokemonItem