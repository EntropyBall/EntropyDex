import React, { memo, useState } from "react";

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
    const handleChange = (event) => {
        const value = event.target.value.toLowerCase();
        setText(value);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            setSearch(value);
        }, 300);
    };
    return (
        <input
            className="navBar-search"
            type="text"
            onChange={handleChange}
            value={text}
        />
    );
};
export default NavSearchBar;
