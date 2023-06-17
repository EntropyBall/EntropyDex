import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PokemonItem from "./PokemonItem.js";
import NavBar from "./NavBar";
const { v4: uuid } = require("uuid");

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

    /* Use <Suspense> to display a loader */
    const PokemonItems = pokemons.map((pokemon) => {
        return (
            <PokemonItem
                key={uuid()}
                pokemon={pokemon}
                accounts={accounts}
                forms={forms}
            />
        );
    });

    /* === JSX === */
    return (
        <>
            <NavBar
                pokemons={pokemons}
                accounts={accounts}
                setAccounts={setAccounts}
            />
            <div className="items">{PokemonItems}</div>
        </>
    );
};

export default App;
