import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from './FormContext.js'
import { AccountContext } from './AccountContext.js'

const PokemonFormBar = ({ dexid }) => {
    const form = useContext(FormContext)
    const { accounts, updateAccounts } = useContext(AccountContext)
    const [isShiny, setIsShiny] = useState(false)
    const [isLucky, setIsLucky] = useState(false)
    const currentAccount = accounts.find(account => account.selected)

    useEffect(() => {
        if (form.get(currentAccount.name).has(dexid)) {
            setIsLucky(form.get(currentAccount.name).get(dexid).lucky)
        }
    }, [])

    const handleAddLucky = (dexid) => {
        // save/remove to local storage
        // add previous form in the new
        const prev = form.get(currentAccount.name)
        form.set(currentAccount.name, prev.set(dexid, { lucky: true }))
        localStorage.setItem(currentAccount.name, JSON.stringify(Array.from(prev)))

        setIsLucky(true)
        // show/hide lucky
    }
    /**
     * Set lucky form to false
     * Save into localStorage
     * Remove key from map if all properties of the object value is false
     * 
     * @param {*} e 
     * @param {*} dexid 
     */
    const handleRemoveLucky = (dexid) => {
        // save/remove to local storage
        const prev = form.get(currentAccount.name)
        if (prev.has(dexid)) {

            // TODO: retrieve object forms and spred it to keep other properties (shiny, shadow...)
            form.set(currentAccount.name, prev.set(dexid, { lucky: false }))
            localStorage.setItem(currentAccount.name, JSON.stringify(Array.from(prev)))
            // check if localStorage is available before calling
            // https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#test_du_support_et_disponibilit%C3%A9
        }

        setIsLucky(false)
        // show/hide lucky
    }

    return (
        <div className='pokemonFormBar'>
            {isShiny ?
                <p
                    className='shiny'>
                    Shiny pokemon
                </p>
                :
                <p>Add shiny</p>
            }
            {isLucky ?
                <p
                    className='lucky'
                    onClick={() => handleRemoveLucky(dexid)}>
                    Lucky pokemon
                </p>
                :
                <p onClick={() => handleAddLucky(dexid)}>Add lucky</p>
            }

        </div>
    )
}

export default PokemonFormBar