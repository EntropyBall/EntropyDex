// require('../dotenv').config()
import dotenv from "dotenv/config"
// === Mongoose IMPORT === //
import mongoose from 'mongoose'
import PokemonModel from '../models/Pokemons.js'
import { getGenerations, getRegion } from './GenerationController.js'
// === Files === //
import fs from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// === Mongoose CONNECTION === //
const connectDB = async () => {
    // Live Server
    // mongoose.connect(process.env.LIVE_MONGODB_URL) // connect to the Mongo DB
    // Local Server
    try {
        await mongoose.connect(process.env.LOCAL_MONGODB_URL)

    } catch (err) {
        console.log(err)
    }
}
// === Mongoose EVENTS === //
/* https://mongoosejs.com/docs/connections.html#connection-events */


// Return an array of pokemons 
const saveItems = async () => {
    const generations = getGenerations()

    const items = fs.readFileSync(path.join(__dirname, '..', 'data', 'latest.json'), 'utf-8', (err, data) => {
        if (err) throw err
        return data
    })
    const data = JSON.parse(items)
    let prevPokemonID = ""

    const pokemons = []
    const pokemonForms = []

    for (const item in data) {
        const pokemonID = data[item].data.templateId
        const pokemonSettings = data[item].data.pokemonSettings
        const formSettings = data[item].data.formSettings

        // List the form of all pokemons
        if (pokemonID.startsWith("FORMS_V") && pokemonID.includes("_POKEMON_")) {
            const pokemonForm = {
                name: formSettings.pokemon,
                ...formSettings.forms && { forms: formSettings.forms }
            }
            pokemonForms.push(pokemonForm)
            continue
        }
        // List unique pokemon (no forms) and base props
        if (pokemonID.startsWith("V") && pokemonID.includes("POKEMON")) {
            if (pokemonSettings === undefined || pokemonSettings?.pokemonId === prevPokemonID) {
                continue
            }
            const pokemonTypes = []

            pokemonSettings.hasOwnProperty("type") ? pokemonTypes.push(pokemonSettings.type) : null
            pokemonSettings.hasOwnProperty("type2") ? pokemonTypes.push(pokemonSettings.type2) : null
            pokemonSettings.hasOwnProperty("type3") ? pokemonTypes.push(pokemonSettings.type3) : null

            const pokemon = {
                dexid: pokemonID.slice(1, 5),
                name: pokemonSettings.pokemonId,
                types: pokemonTypes,
                family: pokemonSettings.familyId,
                stats: pokemonSettings.stats,
                region: getRegion(generations, pokemonSettings.pokemonId)
            }
            pokemons.push(pokemon)
            // Avoid duplicate
            prevPokemonID = pokemonSettings.pokemonId
        }
    }

    for (const pokemon of pokemonForms) {
        if (pokemon.forms) {
            const pokemonToUpdate = pokemons.find(pm => pm.name === pokemon.name)
            const pokemonIndex = pokemons.findIndex(pm => pm.name === pokemon.name)
            pokemonToUpdate.forms = pokemon.forms
            pokemons[pokemonIndex] = pokemonToUpdate
        }
    }
    return pokemons
}

// === mongose CREATE === //
const register = async (pokemons) => {
    // Merge generation with pokemons
    // Species in generations only have 1st evolution
    try {
        await PokemonModel.create(pokemons)
    } catch (err) {
        console.log(err.message)
    } finally {
        console.log("Pokemons array size:", pokemons.length)
    }
}

// === mongose READ === //
const getAll = async (req, res) => {
    console.log('in /getAll')
    const pokemons = await PokemonModel.find().sort({ dexid: 'asc' })
    return res.send(pokemons)
}
const getImages = async (req, res) => {

}
const countPokemons = async () => {
    const result = await mongoose.connection.collections['pokemons'].countDocuments()
    console.log("Pokemons collection size:", result)
}

// === mongose UPDATE === //
const updatePokemon = async (pokemon) => {
    const doc = await PokemonModel.findOne({ dexid: pokemon.dexid })
    // Create if null
    if (!doc) {
        PokemonModel.create(pokemon)
    } else {
        doc.images = pokemon.images
        await doc.save()
    }
}

// === mongose DROP === //
const dropCollection = async (collectionName) => {
    const isCollectionExists = await mongoose.connection.db.listCollections({ name: collectionName }).hasNext()
    // Drop collection if 'pokemons' exists
    if (isCollectionExists) {
        mongoose.connection.db.dropCollection(collectionName, function (err) {
            if (err) console.log(err)
            console.log(`Collection ${collectionName} dropped.`)
        })

        await countPokemons()
        initCollection()
    } else {
        console.log(`Collection ${collectionName} empty`)
        await countPokemons()
        initCollection()
    }
}
const dropDatabase = async () => {
    await mongoose.connection.db.dropDatabase(function (err) {
        if (err) console.log(err.message)
        console.log('Collection dropped')
    })
}
// Implicit creation for pokemon collection
const initCollection = async () => {
    const pokemons = await saveItems()
    await register(pokemons)
    await countPokemons()
}
// === mongose DISCONNECT === //
// mongoose.disconnect()

// dropDatabase()
// saveItems()
// register(pokemons)
export default {
    connectDB,
    getAll,
    countPokemons,
    saveItems,
    register,
    updatePokemon,
    dropCollection,
    initCollection
}