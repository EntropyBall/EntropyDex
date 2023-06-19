import React, { useState } from "react";
import NavList from "./NavList";
import NavButton from "./NavButton";
import NavSearchBar from "./NavSearchBar";

const NavBar = ({ accounts, setAccounts, setSearch }) => {
    const [isShow, setIsShow] = useState(false);

    const handleClick = () => {
        setIsShow((prev) => !prev);
    };

    return (
        <nav className="navBar">
            <NavSearchBar setSearch={setSearch} />
            <NavButton accounts={accounts} handleClick={handleClick} />
            <NavList
                accounts={accounts}
                setAccounts={setAccounts}
                isShow={isShow}
                handleClick={handleClick}
            />
        </nav>
    );
};

export default NavBar;
