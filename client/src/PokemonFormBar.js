import React, { Suspense, useContext, useEffect, useState } from 'react'
import { FormContext } from './FormContext.js'
import { AccountContext } from './AccountContext.js'
const LuckyBaseIcon = React.lazy(() => import('./svg/LuckyBase.js'))
const LuckyActiveIcon = React.lazy(() => import('./svg/LuckyActive.js'))
const ShinyBaseIcon = React.lazy(() => import('./svg/ShinyBase.js'))
const ShinyActiveIcon = React.lazy(() => import('./svg/ShinyActive.js'))

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

    const handleAddShiny = () => {
        setIsShiny(true)
    }

    const handleRemoveShiny = () => {
        setIsShiny(false)
    }

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
                <div className='shiny' onClick={() => handleRemoveShiny()}>
                    <Suspense>
                        <ShinyActiveIcon />
                    </Suspense>
                </div>
                :
                <div onClick={() => handleAddShiny()}>
                    <Suspense>
                        <ShinyBaseIcon />
                    </Suspense>
                </div>
            }
            {isLucky ?
                <div className='lucky' onClick={() => handleRemoveLucky(dexid)}>
                    <Suspense>
                        <LuckyActiveIcon />
                    </Suspense>
                </div>
                :
                <div onClick={() => handleAddLucky(dexid)}>
                    <Suspense>
                        <LuckyBaseIcon />
                    </Suspense>
                </div>
            }

        </div>
    )
}

export default PokemonFormBar