import axios from 'axios'
import fs from 'fs'
import path from 'path'

/**
 * Fetch data about generations and save it into JSON.
 * 
 * One API call for generations :
 *  - number of gen (count)
 *  - list of gen urls (results)
 * One API call for each generation to get:
 *  - id
 *  - name of the gen 
 *  - name of the region
 *  - array of pokemons
 */
const fetchGenerations = async () => {
    const generationJSON = {}
    const generation = await axios.get('https://pokeapi.co/api/v2/generation/')

    // Array of pending promises
    const promises = generation.data.results.map(gen => axios.get(gen.url))
    // Resolve all promises
    const resultAll = await Promise.all(promises)

    generationJSON.count = generation.data.count
    generationJSON.generations = resultAll.map(res => {
        return {
            "id": res.data.id,
            "name": res.data.name,
            "region": res.data.main_region.name,
            "species": res.data.pokemon_species.map(species => species.name)
        }
    })

    fs.writeFile(
        path.join('.', 'server', 'data', 'generation.json'),
        JSON.stringify(generationJSON),
        (err) => {
            if (err) console.log(err)
            console.log("Generation file saved")
        })
}

const getGenerations = () => {
    const rawFile = fs.readFileSync(
        path.join('..', 'server', 'data', 'generation.json'),
        'utf-8',
        (err, data) => {
            if (err) throw err
            return data
        })
    const generations = JSON.parse(rawFile)
    return generations
}

export { getGenerations, fetchGenerations }