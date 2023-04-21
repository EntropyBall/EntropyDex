import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"

const PokemonImage = ({ type, url, name }) => {
    if (type) {
        return (
            <LazyLoadImage
                src={url}
                alt={type}
                width="20"
                length="20"
            />
        )
    }
    return (
        <LazyLoadImage
            className='pokemonImage'
            src={url}
            alt={name}
            loading={"lazy"}
        />
    )
}

export default PokemonImage