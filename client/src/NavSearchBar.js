import React, { useState } from "react";

/* Use debounce for search -> wait till user finish typing */
const NavSearchBar = ({ pokemons, setPokemons }) => {
    const [search, setSearch] = useState("");
    let timeoutId;

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
