import React, { memo, useEffect } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"

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