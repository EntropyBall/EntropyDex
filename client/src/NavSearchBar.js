import React, { memo, useEffect, useState } from "react";

/* Use debounce for search -> wait till user finish typing */
const NavSearchBar = ({ setSearch }) => {
    /**
     * TRY THIS
     * Instead of  re-render every mon for 1 filter
     * Try removing those who are not in the filter
     * And / or add those who are
     */
    const [text, setText] = useState("");
    let timeoutId;

    /* Debounce function: wait 300ms before re-rendering <Pokemons /> with the search string */
    useEffect(() => {
        timeoutId = setTimeout(() => {
            setSearch(text);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [text]);

    return (
        <input
            className="navBar-search"
            type="text"
            onChange={(event) => setText(event.target.value)}
            value={text}
            placeholder="Search"
        />
    );
};
export default NavSearchBar;
