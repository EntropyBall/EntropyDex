import React, { useEffect, useState } from 'react'
/* SVG icons */
import { ReactComponent as ShinyBaseIcon } from './assets/entropydex_icon_shiny.svg'
import { ReactComponent as ShinyActiveIcon } from './assets/entropydex_icon_shiny_active.svg'
import { ReactComponent as LuckyBaseIcon } from './assets/entropydex_icon_lucky.svg'
import { ReactComponent as LuckyActiveIcon } from './assets/entropydex_icon_lucky_active.svg'

const PokemonFormBar = ({ dexid, accounts, forms }) => {
    const [isShiny, setIsShiny] = useState(false)
    const [isLucky, setIsLucky] = useState(false)
    const currentAccount = accounts.find(account => account.selected)

    useEffect(() => {
        if (forms.get(currentAccount.name).has(dexid)) {
            setIsLucky(forms.get(currentAccount.name).get(dexid).lucky)
            console.log("useEffect in PokemonFormBar")
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
        const prev = forms.get(currentAccount.name)
        forms.set(currentAccount.name, prev.set(dexid, { lucky: true }))
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
        const prev = forms.get(currentAccount.name)
        if (prev.has(dexid)) {

            // TODO: retrieve object forms and spred it to keep other properties (shiny, shadow...)
            forms.set(currentAccount.name, prev.set(dexid, { lucky: false }))
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