import React, { useContext } from 'react'
import { AccountContext } from './AccountContext'

const NavItem = ({ name, team }) => {
    const { accounts, setAccounts } = useContext(AccountContext)

    const handleAccount = () => {
        setAccounts(prev => {
            return prev.map(account => {
                if (account.name === name) {
                    return { ...account, selected: true }
                }
                return { ...account, selected: false }
            })
        })
        console.log(accounts)
    }
    return (
        <li className='nav-itemAccount' onClick={handleAccount}>
            <span>{team} {name}</span>
        </li>
    )
}

export default NavItem