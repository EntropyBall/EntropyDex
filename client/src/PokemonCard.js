import React, { useContext, useEffect, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import { FormContext } from './FormContext.js'
import FormBar from './FormBar.js'

const PokemonCard = ({ pokemon, url }) => {

    const typeIcon = pokemon.types.map(type => {
        return <LazyLoadImage
            src={"http://localhost:3001/Images/Types/" + type + ".png"}
            alt={type}
            width="20"
            length="20"
        />
    })

    return (
        <div className={`item ${pokemon.family}`} >
            <p className='name'>{pokemon.dexid}-{pokemon.name}-{pokemon.images.length}</p>
            <div className='typesImg'>{typeIcon}</div>
            <LazyLoadImage
                className='pokemonImg'
                src={url}
                alt={pokemon.name}
                loading={"lazy"}
            />
            <FormBar dexid={pokemon.dexid} />
        </div>
    )
}

export default PokemonCard