import React, { useContext, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import FormContext from './formContext.js'

const PokemonCard = ({ pokemon, url }) => {
    const form = useContext(FormContext)
    const types = pokemon.types.map(type => {
        return <LazyLoadImage
            src={"http://localhost:3001/Images/Types/" + type + ".png"}
            alt={type}
            width="20"
            length="20"
        />
    })
    const addLucky = (dexid) => {
    }
    const removeLucky = (dexid) => {
        setLuckies(prev => {
            const newState = new Map(prev)
            newState.delete(dexid)
            return newState
        })
    }
    const handleClickLucky = (dexid) => {
        // save/remove to local storage

        setLuckies(prev => {
            console.log(prev)
            const newMap = new Map([...prev, [dexid, true]])
            console.log(newMap)
            return newMap
        })
        // show/hide lucky
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
            {/* Use context form here */}
            <p className='lucky'>Lucky pokemon</p>
        </div>
    )
}

export default PokemonCard