import React, { useState } from "react";

/* Use debounce for search -> wait till user finish typing */
const NavSearchBar = ({ pokemons, setPokemons }) => {
    const [search, setSearch] = useState("");
    const savedPokemons = [...pokemons];
    let timeoutId;
    const handleChange = (e) => {
        setSearch(e.target.value);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (search === "") {
                setPokemons(savedPokemons);
                return;
            }
            console.log(savedPokemons);
            const filteredPokemons = savedPokemons.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(search.toLowerCase())
            );
            setPokemons(filteredPokemons);
        }, 1000);
    };
    return (
        <input
            className="navBar-search"
            type="text"
            onChange={handleChange}
            value={search}
        />
    );
};

export default NavSearchBar;
