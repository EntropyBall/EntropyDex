import dotenv from "dotenv"
dotenv.config()
// TODO: Difference between /core and /rest
import { Octokit } from '@octokit/core'

const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_TOKEN })

/**
 * Get a repository content
 * Doc: https://docs.github.com/en/rest/repos/contents#get-repository-content
 * @param {*} repo 
 * @param {*} path 
 * @returns Array of the data response
 */
const getRepoContent = async (repo, path) => {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}{?ref}', {
        owner: 'PokeMiners',
        repo: repo,
        path: path
    })
    return response.data
}

/**
 * 
 * @param {*} repo 
 * @param {*} tree_sha 
 * @returns The tree array
 */
const getTree = async (repo, tree_sha) => {
    const response = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}{?recursive}', {
        owner: 'PokeMiners',
        repo: repo,
        tree_sha: tree_sha
    })
    return response.data.tree
}

/**
 * Get a Git BLOB
 * Doc: https://docs.github.com/en/rest/git/blobs
 * 
 * @param {String} repo 
 * @param {String} file_sha 
 * @returns Content of the blob
 */
const getBlob = async (repo, file_sha) => {
    const response = await octokit.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
        owner: 'PokeMiners',
        repo: repo,
        file_sha: file_sha
    })
    return response.data.content
}

export default {
    getRepoContent,
    getTree,
    getBlob,
}