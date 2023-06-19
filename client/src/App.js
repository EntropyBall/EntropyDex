import "./App.css";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Pokemons from "./Pokemons";

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [accounts, setAccounts] = useState([
        {
            name: "EntropyBall",
            team: "Valor",
            selected: true,
        },
        {
            name: "EntropyBalI",
            team: "Mystic",
            selected: false,
        },
    ]);
    const [forms, setForms] = useState(new Map());
    const [search, setSearch] = useState("");
    useEffect(() => {
        // Local Endpoint API
        axios
            .get("http://localhost:3001/getPokemons")
            .then((response) => {
                setPokemons(response.data);
            })
            .catch((err) => console.log(err));
        // Retrieve  & set accounts from DB
        // Nested map ('Entropy', ("0001", { lucky: true }))

        accounts.forEach((account) => {
            const form = new Map();
            form.set(account.name, new Map());
            // Update forms from localStorage
            const currentAccount = accounts.find((account) => account.selected);
            const arrayStorage = JSON.parse(
                localStorage.getItem(currentAccount.name)
            );
            const mapStorage = new Map(arrayStorage);
            form.set(currentAccount.name, mapStorage);
            setForms(form);
        });
    }, []);

    const handleSearch = (search) => {};

    /* Use <Suspense> to display a loader while loading*/
    /* === JSX === */
    return (
        <>
            <NavBar
                setSearch={setSearch}
                accounts={accounts}
                setAccounts={setAccounts}
            />
            <Pokemons
                pokemons={pokemons}
                forms={forms}
                accounts={accounts}
                search={search}
            />
        </>
    );
};

export default App;
