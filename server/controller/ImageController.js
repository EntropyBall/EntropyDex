import fs from 'fs'
import dbCont from './DatabaseController.js'
/**
 * 
 * @param {*} path 
 * @param {*} blob 
 */
const saveImage = (path, image) => {
    const buffer = Buffer.from(image.blob, 'base64')
    try {
        fs.mkdirSync(`./public/${path}`, { recursive: true })
        fs.writeFileSync(`./public/${path}/${image.path}`, buffer)
        console.log(`File ${image.path} saved`)
    } catch (err) {
        console.log(err)
    }
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
    const paths = fs.readFileSync("./data/Images_Pokemon_Addressable_Assets.json", 'utf-8')
    const images = JSON.parse(paths)
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
            pokemon.images.push(createImageObject(filename, parts))
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

export default {
    saveImage,
    addImageInfos,
}