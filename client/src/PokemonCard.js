import React from 'react'
import PokemonFormBar from './PokemonFormBar.js'
import PokemonImage from './PokemonImage.js'
import PokemonTitle from './PokemonTitle.js'

const PokemonCard = ({ pokemon, url, accounts, forms }) => {
    return (
        <div className={`pokemonCard ${pokemon.family}`} >
            <PokemonFormBar
                dexid={pokemon.dexid}
                accounts={accounts}
                forms={forms}
            />
            <PokemonTitle
                dexid={pokemon.dexid}
                name={pokemon.name}
                types={pokemon.types}
                images={pokemon.images}
            />
            <PokemonImage
                type={null}
                url={url}
                name={pokemon.name}
            />
        </div>
    )
}

export default PokemonCard