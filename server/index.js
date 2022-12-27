import dotenv from "dotenv/config"
import db from './controller/DatabaseController.js'
import git from './controller/GitController.js'
import { addImageInfos } from './controller/ImageController.js'

import mongoose from 'mongoose'
import PokemonModel from "./models/Pokemons.js"
// File use to start our API
import cors from 'cors' // Allow API to connect with React
// Express
import express from 'express'


import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
// PORT
const LOCAL_PORT = 3001
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
// Get ALL POKEMONS Request
app.get('/getPokemons', (req, res) => {
    console.log("in /getPokemons")
    db.getAll(req, res)
})

// Connect to mongoDB
db.connectDB()
// Run server AFTER connection to mongoDB
mongoose.connection.once('open', async () => {
    console.log("Connected once to MongoDB")
    // Tips
    // - 'mongoose.connection' is equal to 'new MongoClient(url).db'
    // - 'mongoose.connection.db' is equal to 'new MongoClient(url).db'
    // Retrieve one
    const one = await PokemonModel.findOne({ dexid: "0002" })
    if (one == null) {
        await db.initCollection()
    }
    // Update images
    addImageInfos()
    // If (images.date === gitImages.date do no'ing)
    // git.fetchTypeImages()
    // Drop collections
    /* const collectionName = "pokemons"
    db.dropCollection(collectionName) */
    // Drop database
    /* await mongoose.connection.db.dropDatabase(function (err) {
        if (err) console.log(err)
        console.log('Database dropped')
    }) */
    app.listen(LOCAL_PORT, () => {
        console.log(`Server is running on PORT ${LOCAL_PORT}`)
    })
})