import React, { useContext, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import { FormContext, FormSetContext } from './FormContext.js'

const PokemonCard = ({ pokemon, url }) => {
    const [isLucky, setIsLucky] = useState(false)
    const form = useContext(FormContext)
    const setForm = useContext(FormSetContext)
    const typeIcon = pokemon.types.map(type => {
        return <LazyLoadImage
            src={"http://localhost:3001/Images/Types/" + type + ".png"}
            alt={type}
            width="20"
            length="20"
        />
    })

    const handleAddLucky = (dexid) => {
        // save/remove to local storage
        setIsLucky(true)
        setForm(prev => prev.set(dexid, { lucky: true }))
        console.log(form)
        // show/hide lucky
    }
    const handleRemoveLucky = (e, dexid) => {
        e.stopPropagation()
        // save/remove to local storage
        setIsLucky(false)
        setForm(prev => prev.set(dexid, { lucky: false }))
        console.log(form)
        // show/hide lucky
    }
    return (
        <div className={`item ${pokemon.family}`} onClick={() => handleAddLucky(pokemon.dexid)}>
            <p className='name'>{pokemon.dexid}-{pokemon.name}-{pokemon.images.length}</p>
            <div className='typesImg'>{typeIcon}</div>
            <LazyLoadImage
                className='pokemonImg'
                src={url}
                alt={pokemon.name}
                loading={"lazy"}
            />
            {/* Use context form here */}
            {isLucky && <p className='lucky' onClick={(e) => handleRemoveLucky(e, pokemon.dexid)}>Lucky pokemon</p>}
        </div>
    )
}

export default PokemonCard