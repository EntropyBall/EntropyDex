import React, { useContext } from 'react'
import { AccountContext } from './AccountContext'

const NavItem = ({ name, team }) => {
    const accounts = useContext(AccountContext)

    const handleAccount = () => {
        accounts.forEach(account => {
            if (account.name === name) {
                account.selected = true
            } else {
                account.selected = false
            }
        })
        /* setAccounts(prev => {
            return prev.map(account => {
                if (account.name === name) {
                    return { ...account, selected: true }
                }
                return { ...account, selected: false }
            })
        }) */
    }
    return (
        <li className='nav-itemAccount' onClick={handleAccount}>
            <span>{team} {name}</span>
        </li>
    )
}

export default NavItem