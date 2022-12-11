/* require("dotenv").config()
const stream = require('stream')
const { promisify } = require('util')
const fetch = require('node-fetch')
const axios = require('axios')
const { Octokit } = require('@octokit/rest')
const fs = require('fs') */

import fs from 'fs'
import got from 'got'

const GIT_URL_IMAGES = "https://api.github.com/repositories/243406442/contents/Images"
const GIT_URL_POGOASSETS = "https://api.github.com/repos/PokeMiners/pogo_assets/contents/Images/Pokemon"
const GIT_URL_POGOASSETS_RAW = "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/latest/latest.json"
const IMAGES_FOLDER_PATH = "../images"

const octokit = new Octokit({
    auth: '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'
})
/**
 * DDL a file via http get https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
 * Some URLs
 * Reference 
 * Commits https://api.github.com/repos/PokeMiners/pogo_assets/commits/{sha_commit}
 * 
 */
// TODO TRY WITH 5000 LIMITS RATE TO FETCH DATA FROM ADRESSABLE ASSETS
/**
 * Download ALL images of pogo_assets
 * // TODO with https://www.npmjs.com/package/got
 */
const pullImages = async () => {
    /* 
    const pipeline = promisify(stream.pipeline)
    await pipeline(
        got.stream('https://api.github.com/repos/PokeMiners/pogo_assets/zipball/master', {
            headers: {
                'User-Agent': 'request',
                auth: process.env.GITHUB_PERSONAL_TOKEN
            }
        }),
        fs.createWriteStream('./server/Images/pogo_assets.zip')
        ) 
        */
    // GOT DDl via stream and can see progress
    /* const dlStream = got.stream('https://api.github.com/repos/PokeMiners/pogo_assets/Image/Pokemon/zipball/master', {
        headers: {
            'User-Agent': 'request',
            auth: process.env.GITHUB_PERSONAL_TOKEN
        }
    })
    const writerStream = fs.createWriteStream('./server/Images/pogo_assets.zip')

    dlStream
        .on('downloadProgress', ({ transferred, total, percent }) => {
            const percentage = Math.round(percent * 100)
            console.log(`Progress : ${transferred}/${total} (${percentage}%)`)
        })
        .on('error', (error) => {
            console.error(`Download failed: ${error.message}`)
        })
    writerStream
        .on('error', (error) => {
            console.error(`Could not write file to system: ${error.message}`)
        })
        .on('finish', () => {
            console.log(`File downloaded to Images folder`)
        })
    dlStream.pipe(writerStream) */
}
pullImages()

import { Octokit } from '@octokit/core'
// Get last commit
// Get the last update with commit.committer(or author).date
// Filter with filename
// Get content with raw_url
const getLastCommitedImages = async () => {
    const octokit = new Octokit({
        auth: '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'
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

import { Octokit } from '@octokit/core'
import fs from 'fs'
// Fetch all icon name => ONE API call
const fetchAllImages = async () => {
    //? TODO make another function for that
    // OCTOKIT - TREES - Get ALL (2575) images but no download_url only api_url
    const octokit = new Octokit({
        auth: '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'
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

// Git Token => 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
// Tree_sha 'bb18b8bb221f500056b3c6f3d766eec4f3d28559' references to Images/Pokemon/Adressable Assets