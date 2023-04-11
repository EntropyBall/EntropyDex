import React, { useContext } from 'react'
import { AccountContext } from './AccountContext'

const NavBar = () => {
    const { accounts } = useContext(AccountContext)
    const currentAccount = accounts.find(account => account.selected)
    return (
        <nav className='navBar'>
            <p>{currentAccount.name}</p>
        </nav>
    )
}

export default NavBar