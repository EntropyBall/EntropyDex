// ---- Define the structure of Pokemon ---- //
import mongoose from 'mongoose'
// Schema
const PokemonSchema = new mongoose.Schema({
    dexid: String,
    name: String,
    types: [String],
    family: String,
    stats: {
        baseStamina: {
            type: Number,
        },
        baseAttack: {
            type: Number,
        },
        baseDefense: {
            type: Number,
        },
    },
    region: String,
    forms: [Object],
    images: [Object]
})
// Model
const PokemonModel = mongoose.model('pokemons', PokemonSchema)

export default PokemonModel