const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const GIT_URL_GAMEMASTERS = "https://api.github.com/repos/PokeMiners/game_masters"
const GIT_URL_RAW = "https://raw.githubusercontent.com/PokeMiners/game_masters/master/latest/latest.json"
const GIT_URL_POGOASSETS = "https://api.github.com/repos/PokeMiners/pogo_assets"


const fetchItem = async () => {
    try {
        // Fetch data from 3 Git URL API (gm date, data, pa date)
        const [response_gm, response_raw, response_pa] = await Promise.all([
            fetch(`${GIT_URL_GAMEMASTERS}`),
            fetch(`${GIT_URL_RAW}`),
            fetch(`${GIT_URL_POGOASSETS}`),
        ])
        const data_gm = await response_gm.json()
        const data_raw = await response_raw.json()
        const data_pa = await response_pa.json()
        // compare date in file with updated file
        // if equal do nothing
        // else overwrite updated date
        // BONUS: list changes
        console.log(data_gm.updated_at)
        console.log(data_pa.updated_at)
        // Format date
        const updatedFormatGMDate = new Date(data_gm.updated_at)
        const updatedFormatPADate = new Date(data_pa.updated_at)
        // Read file
        // const currentDate = 

        // Write in files if current & updated date are different
        // ! INFINITE LOOP IN LIVE SERVER EXTENSION
        const dataJSON = {
            game_master: updatedFormatGMDate,
            pogo_assest: updatedFormatPADate
        }
        /* fs.writeFile(path.join('data', 'latest.json'), JSON.stringify(data_raw), (err) => {
            if (err) throw err
            console.log("Write data complete")
        })
        fs.writeFile(path.join('data', 'update.json'), JSON.stringify(dataJSON), (err) => {
            if (err) throw err
            console.log("Write date complete")
        }) */

    } catch (err) {
        console.log(err)
    }
}
module.exports = fetchItem