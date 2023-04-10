import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from './FormContext.js'
import { AccountContext } from './AccountContext.js'

const FormBar = ({ dexid }) => {
    const { form } = useContext(FormContext)
    const { accounts, updateAccounts } = useContext(AccountContext)
    const [isLucky, setIsLucky] = useState(false)
    const currentAccount = accounts.find(account => account.selected)


    useEffect(() => {

    }, [])


    const handleAddLucky = (dexid) => {
        console.log(form)
        // save/remove to local storage
        form.set(currentAccount.name, new Map([[dexid, { lucky: true }]]))
        localStorage.setItem(currentAccount.name, JSON.stringify(Array.from(form)))

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
        if (form.has(dexid)) {
            const forms = form.get(dexid)
            form.set(currentAccount.name, new Map([[dexid, { ...forms, lucky: false }]]))
            // check if localStorage is available before calling
            // https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#test_du_support_et_disponibilit%C3%A9
            localStorage.setItem(currentAccount.name, JSON.stringify(Array.from(form)))
        }
        // TODO: delete object if all property on object are false

        setIsLucky(false)
        // show/hide lucky
    }

    return (
        <>
            {isLucky ?
                <p
                    className='lucky'
                    onClick={() => handleRemoveLucky(dexid)}>
                    Lucky pokemon
                </p>
                :
                <p onClick={() => handleAddLucky(dexid)}>Add lucky</p>
            }

        </>
    )
}

export default FormBar