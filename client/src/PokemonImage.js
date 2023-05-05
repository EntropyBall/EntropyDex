import React, { useEffect } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"

const PokemonImage = ({ type, url, name }) => {
    useEffect(() => {
        if (name === 'BULBASAUR') {

            console.log("render in pokemon image for the first time")
        }
    }, [])
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
        <div className='pokemonImage'>
            <LazyLoadImage
                src={url}
                alt={name}
                loading={"lazy"}
            />
        </div>
    )
}

export default PokemonImage