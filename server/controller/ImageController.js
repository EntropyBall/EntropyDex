import fs from 'fs'
import dbCont from './DatabaseController.js'

const convertBlobsToImages = () => {
    // Fetch the string & convert to buffer
    const blobs = fs.readFileSync("./server/data/blob.json", 'utf-8')
    const array = JSON.parse(blobs)

    array.forEach(blob => {
        const buffer = Buffer.from(blob.content, 'base64')
        try {
            fs.writeFileSync(`./server/public/images/Pokemon/${blob.path}`, buffer)
            console.log(`File ${blob.path} saved`)
            // find the pokemon in mongoDB & update it with an array of images
        } catch (err) {
            console.log(err)
        }
    })
}


const createImageObject = (filename, parts) => {
    const image = {}
    image.filename = filename
    parts.forEach(part => {
        if (part.startsWith("f")) {
            image.form = part.slice(1).replace('_NOEVOLVE', '')
            if (part.match(/MEGA/g)) image.isMega = true
        }
        if (part.startsWith("c")) image.costume = part.slice(1)
        // TODO improve gender form
        if (part.startsWith("g")) image.isGender = true
        if (part === "s") image.isShiny = true
    })

    return image
}
/**
 * Create a detailled, structured, comprehensive list infos of pokemon images from raw data
 * Add the infos to the database
 */
const addImageInfos = () => {
    const paths = fs.readFileSync("./data/blob.json", 'utf-8')
    const images = JSON.parse(paths)
    const pokemons = []
    let pokemon = {}
    let prevId = 0

    for (const image of images) {
        const filename = image.path
        // Separate 'pm1.cJAN_2020_NOEVOLVE.icon.png' by point ["pm1", "cJAN_2020_NOEVOLVE", "icon", "png"]
        const parts = filename.split('.')

        // From 'pm1', remove the letters '1' and add zeros '0001'
        const dexid = parts[0].slice(2).padStart(4, '0')
        const currentId = parseInt(parts[0].slice(2))
        // console.log(currentId, prevId)
        if (currentId === prevId) {
            // UPDATE OBJECT: Add other images to the same object
            pokemon.images.unshift(createImageObject(filename, parts))
        } else {
            // Ignore first element
            if (prevId) {
                // DEBUGGING
                // pokemons.push(pokemon)
                // Save previous pokemon (dexid-1)
                dbCont.updatePokemon(pokemon)
            }
            // INIT OBJECT
            pokemon = {}
            pokemon.dexid = dexid
            pokemon.images = [createImageObject(filename, parts)]
        }
        prevId = currentId
    }
    // Save last pokemon
    dbCont.updatePokemon(pokemon)
    // pokemons.push(pokemon)
    // DEBUG
    // console.log(JSON.stringify(pokemons, null, 2))
}

export {
    addImageInfos,
}