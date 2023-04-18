import React, { memo } from 'react'
import PokemonCard from './PokemonCard.js'
const { v4: uuid } = require('uuid')

const PokemonItem = ({ pokemon }) => {
    // Get base form ("pm[id].icon.png"), RegEx: removes the first 0s
    let baseForm = pokemon.images.find(image => {
        return image.filename === "pm" + pokemon.dexid.replace(/[0]*/, "") + ".icon.png" ||
            image.filename === "pm" + pokemon.dexid.replace(/[0]*/, "") + ".f.icon.png"
    })

    // Get the first of the multiple forms ("{ filename: "pm676.fNATURAL.icon.png", form: "NATURAL" }") 
    if (!baseForm) {
        baseForm = pokemon.images.find(img => {
            return pokemon.forms[0].form === pokemon.name + "_" + img.form ||
                pokemon.forms[0].form === img.form
        })
    }
    const baseFormURL = baseForm
        ? "http://localhost:3001/Images/Pokemon/Addressable Assets/" + baseForm.filename
        : ""

    const megaForm = pokemon.images.find(image => image.isMega)
    // 2 conditions: 1 for rendering 1 for scripting
    const megaFormURL = megaForm
        ? "http://localhost:3001/Images/Pokemon/Addressable Assets/" + megaForm.filename
        : ""


    const PokemonCards = () => { }
    // USE LOADING LAZY REACT https://www.youtube.com/watch?v=8viWcH5bUE4
    return (
        <>
            <PokemonCard
                pokemon={pokemon}
                url={baseFormURL}
            />
            {/* {megaForm && <PokemonCard pokemon={pokemon} url={megaFormURL} />} */}
        </>
    )
}

export default memo(PokemonItem)