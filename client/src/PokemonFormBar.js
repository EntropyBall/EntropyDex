import React, { useContext, useEffect, useState } from 'react'
/* Context */
import { FormContext } from './FormContext.js'
import { AccountContext } from './AccountContext.js'
/* SVG icons */
import { ReactComponent as ShinyBaseIcon } from './assets/entropydex_icon_shiny.svg'
import { ReactComponent as ShinyActiveIcon } from './assets/entropydex_icon_shiny_active.svg'
import { ReactComponent as LuckyBaseIcon } from './assets/entropydex_icon_lucky.svg'
import { ReactComponent as LuckyActiveIcon } from './assets/entropydex_icon_lucky_active.svg'

const PokemonFormBar = ({ dexid }) => {
    const form = useContext(FormContext)
    const { accounts, setAccounts } = useContext(AccountContext)
    const [isShiny, setIsShiny] = useState(false)
    const [isLucky, setIsLucky] = useState(false)
    const currentAccount = accounts.find(account => account.selected)

    useEffect(() => {
        if (form.get(currentAccount.name).has(dexid)) {
            setIsLucky(form.get(currentAccount.name).get(dexid).lucky)
        }
    }, [accounts])

    const handleAddShiny = () => {
        setIsShiny(true)
    }

    const handleRemoveShiny = () => {
        setIsShiny(false)
    }

    const handleAddLucky = (dexid) => {
        // add previous form in the new
        const newForm = new Map()
        newForm.set(currentAccount.name)
        const prev = form.get(currentAccount.name)
        form.set(currentAccount.name, prev.set(dexid, { lucky: true }))
        // Save to local storage
        localStorage.setItem(currentAccount.name, JSON.stringify(Array.from(prev)))
        // Show/hide lucky
        setIsLucky(true)
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
                <div className='shiny' onClick={() => handleRemoveShiny()}>
                    <ShinyActiveIcon />
                </div>
                :
                <div onClick={() => handleAddShiny()}>
                    <ShinyBaseIcon />
                </div>
            }
            {isLucky ?
                <div className='lucky' onClick={() => handleRemoveLucky(dexid)}>
                    <LuckyActiveIcon />
                </div>
                :
                <div onClick={() => handleAddLucky(dexid)}>
                    <LuckyBaseIcon />
                </div>
            }

        </div>
    )
}

export default PokemonFormBar