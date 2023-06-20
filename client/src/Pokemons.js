import React from "react";
import PokemonItem from "./PokemonItem";
const { v4: uuid } = require("uuid");

const Pokemons = ({ pokemons, accounts, forms, search }) => {
    let filteredItems = pokemons;
    if (search) {
        filteredItems = pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(search.toLowerCase())
        );
    }
    const pokemonItems = filteredItems.map((pokemon) => {
        return (
            <PokemonItem
                key={uuid()}
                pokemon={pokemon}
                accounts={accounts}
                forms={forms}
            />
        );
    });
    return <div className="items">{pokemonItems}</div>;
};

export default Pokemons;
