import dotenv from "dotenv"
dotenv.config()
import fs from 'fs'
import { Octokit } from '@octokit/core'

const GIT_URL_IMAGES = "https://api.github.com/repositories/243406442/contents/Images"
const GIT_URL_POGOASSETS = "https://api.github.com/repos/PokeMiners/pogo_assets/contents/Images/Pokemon"
const GIT_URL_POGOASSETS_RAW = "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/latest/latest.json"
const IMAGES_FOLDER_PATH = "../images"

const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_TOKEN
})
/**
 * DDL a file via http get https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
 * Some Git API URLs
 * - User https://api.github.com/users/PokeMiners
 * - Repos https://api.github.com/users/PokeMiners/repos
 * - Content GM https://api.github.com/repos/PokeMiners/game_masters/contents/
 * - Content PA https://api.github.com/repos/PokeMiners/pogo_assets/contents/
 * With SHA 
 * - Tree GM https://api.github.com/repos/PokeMiners/game_masters/git/trees/{tree_sha}
 * - Tree PA https://api.github.com/repos/PokeMiners/pogo_assets/git/trees/{tree_shat}
 * - PA Images https://api.github.com/repos/PokeMiners/pogo_assets/git/trees/4495d5d3a4df9f77e1db9f208d8ae2416fd7a15f
 * - Commit PA https://api.github.com/repos/PokeMiners/pogo_assets/commits/{sha_commit}
 * 
 */


// Get lastest Game Master
const fetchLastestGM = async () => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_PERSONAL_TOKEN
    })
    // DL https://api.github.com/repos/PokeMiners/game_masters/git/blobs/0869cfc4dde4cfe1ec6f68e5534e18dd4df9fc6f
    const blob = await octokit.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
        owner: 'PokeMiners',
        repo: 'game_masters',
        file_sha: '0869cfc4dde4cfe1ec6f68e5534e18dd4df9fc6f'
    })

    fs.writeFileSync('./data/types.json', JSON.stringify(contents), 'utf-8', '', (err) => {
        if (err) console.log(err)
        console.log('Blob images file saved')
    })
}
// Get last commit
// Get the last update with commit.committer(or author).date
// Filter with filename
// Get content with raw_url
const getLastCommitedImages = async () => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_PERSONAL_TOKEN
    })
    // OCTOKIT - REFERENCE - Get the last commit id
    const ref = await octokit.request('GET /repos/{owner}/{repo}/git/refs/{ref}', {
        owner: 'PokeMiners',
        repo: 'pogo_assets',
        ref: 'heads/master'
    })
    const commit_sha = ref.data.object.sha
    console.log(ref)
    // OCTOKIT - COMMITS - Get the last files
    const lastCommit = await octokit.request('GET /repos/{owner}/{repo}/commits/{commit_sha}', {
        owner: 'PokeMiners',
        repo: 'pogo_assets',
        commit_sha: commit_sha
    })
    // TODO Get the updated files only
}
/**
 * Get images from a specific tree 
 * URL Repo: https://api.github.com/repos/PokeMiners/pogo_assets/git/trees/523fb600cc53a25226779c7ca9f486165057a40f
 * URL Content: https://api.github.com/repos/PokeMiners/pogo_assets/git/blobs/d59db23a74f892d8bf263cfd6484b13f101b598a
 */
const fetchTypeImages = async () => {
    const imgs = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}{?recursive}', {
        owner: 'PokeMiners',
        repo: 'pogo_assets',
        tree_sha: '523fb600cc53a25226779c7ca9f486165057a40f'
    })
    // Array of promises blob base64 images  (cause of async)
    // Using a for loop for slower API request
    const contents = []
    for (let i = 0; i < imgs.data.tree.length; i++) {
        const node = imgs.data.tree[i]

        console.log("Awaiting for ", node.path)
        const blob = await octokit.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
            owner: 'PokeMiners',
            repo: 'pogo_assets',
            file_sha: node.sha
        })
        const img = {}
        img.path = node.path
        img.content = blob.data.content
        contents.push(img)
    }

    // sort content
    // Need to resolve the array of promises
    fs.writeFileSync('./data/types.json', JSON.stringify(contents), 'utf-8', '', (err) => {
        if (err) console.log(err)
        console.log('Blob images file saved')
    })
}
//// (TODO) TRY WITH 5000 LIMITS RATE TO FETCH DATA FROM ADRESSABLE ASSETS
// Fetch all icon name => ONE API call
const fetchAllImages = async () => {
    //? TODO make another function for that
    // OCTOKIT - TREES - Get ALL (2575) images but no download_url only api_url
    const octokit = new Octokit({
        auth: process.env.GITHUB_PERSONAL_TOKEN
    })
    // Tree_sha 'bb18b8bb221f500056b3c6f3d766eec4f3d28559' references to Images/Pokemon/Adressable Assets
    const imgs = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}{?recursive}', {
        owner: 'PokeMiners',
        repo: 'pogo_assets',
        tree_sha: 'bb18b8bb221f500056b3c6f3d766eec4f3d28559'
    })
    // Array of promises blob base64 images  (cause of async)
    // Using a for loop for slower API request
    const contents = []
    for (let i = 0; i < imgs.data.tree.length; i++) {
        const node = imgs.data.tree[i]

        console.log("Awaiting for ", node.path)
        const blob = await octokit.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
            owner: 'PokeMiners',
            repo: 'pogo_assets',
            file_sha: node.sha
        })
        const img = {}
        img.path = node.path
        img.content = blob.data.content
        contents.push(img)
    }
    // Need to resolve the array of promises
    fs.writeFileSync('./server/data/blob.json', JSON.stringify(contents), 'utf-8', (err) => {
        if (err) console.log(err)
        console.log('Blob images file saved')
    })
}

// Git Token =>
// Tree_sha 'bb18b8bb221f500056b3c6f3d766eec4f3d28559' references to Images/Pokemon/Adressable Assets

export default {
    fetchTypeImages
}