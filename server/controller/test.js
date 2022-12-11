const fs = require('fs')
const path = require('path')

// Sync because I need the date right away
const date = fs.readFileSync(path.join(__dirname, '..', 'data', 'update.json'), 'utf-8', (err, data) => {
    if (err) throw err
    return data
})
const dateJSON = JSON.parse(date)

const myDate = new Date(dateJSON.game_master)
const myDate1 = new Date("2022-07-21T23:48:25.000Z")
console.log(+myDate === +myDate1)
console.log(myDate === myDate1)
console.log(myDate.getTime() === myDate1.getTime())






/* =================================================== */
const axios = require('axios')
const fetchGens = async () => {
    const genJSON = {}
    const gen = await axios.get('https://pokeapi.co/api/v2/generation/')
    genJSON.count = gen.data.count
    const genPromises = gen.data.results.map(gen => axios.get(gen.url))
    const resultAll = await Promise.all(genPromises)
    const gens = resultAll.map(res => {
        return {
            "id": res.data.id,
            "name": res.data.name,
            "region": res.data.main_region.name,
            "species": res.data.pokemon_species.map(species => species.name)
        }
    })
    console.log(gens)
}
fetchGens()










/* =================================================== */
const fs = require('fs')
const path = require('path')
const items = fs.readFileSync(path.join(__dirname, '..', 'data', 'latest.json'), 'utf-8', (err, data) => {
    if (err) throw err
    return data
})
const data = JSON.parse(items)
// 2nd loop for forms props
for (const item in data) {
    const pokemonID = data[item].data.templateId
    const formSettings = data[item].data.formSettings

    if (pokemonID.startsWith("FORMS_V") && pokemonID.includes("_POKEMON_")) {
        // Short-circuit evalution with &&
        // Spreading 'false', 'null' or 'undefined' is ignored
        const pokemon = {
            "name": formSettings.pokemon,
            ...(formSettings.forms && { "forms": formSettings.forms })
        }
        console.log(pokemon)
    }
}

// Loop throw the data
// Check if pokemon is in the array
// if true update
// if false add

// Adding a property into an object with SPREAD operator
// Mutating a property in an object with OBJECT.ASSIGN() method