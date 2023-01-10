import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"

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
    const baseFormURL = baseForm ? "http://localhost:3001/images/Pokemon/" + baseForm.filename : ""

    // USE LOADING LAZY REACT https://www.youtube.com/watch?v=8viWcH5bUE4
    return (
        <div className={`item ${pokemon.family}`}>
            <p className='name'>{pokemon.name}-{pokemon.images.length}</p>
            <LazyLoadImage
                className='pokemonImg'
                src={baseFormURL}
                alt={pokemon.name}
                loading={"lazy"}
            />
        </div>
    )
}

export default PokemonItem