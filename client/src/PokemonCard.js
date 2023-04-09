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
        setForm(prev => {
            prev.set(dexid, { lucky: true })
            localStorage.setItem('form', JSON.stringify(Array.from(prev)))
            return prev
        })

        console.log(form)
        // show/hide lucky
    }
    /**
     * Set lucky form to false
     * Save into localStorage
     * Remove key from map if all properties of the object value is false
     * 
     * @param {*} e 
     * @param {*} dexid 
     */
    const handleRemoveLucky = (e, dexid) => {
        e.stopPropagation()
        // save/remove to local storage
        setIsLucky(false)
        setForm(prev => {
            if (prev.has(dexid)) {
                const forms = prev.get(dexid)
                prev.set(dexid, { ...forms, lucky: false })
                // check if localStorage is available before calling
                // https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#test_du_support_et_disponibilit%C3%A9
                localStorage.setItem('form', JSON.stringify(Array.from(prev)))
            }
            return prev
            // TODO: delete object if all property on object are false
        })
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
            {form.get(pokemon.dexid) &&
                <p className='lucky' onClick={(e) => handleRemoveLucky(e, pokemon.dexid)}>Lucky pokemon</p>
            }
        </div>
    )
}

export default PokemonCard