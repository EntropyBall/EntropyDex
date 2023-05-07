import React, { useContext } from 'react'
import { AccountContext } from './AccountContext'

const NavButton = ({ handleClick }) => {
    const { accounts } = useContext(AccountContext)
    const { name, team } = accounts.find(account => account.selected)
    return (
        <button className='nav-buttonAccount' onClick={handleClick}><span>{team} {name}</span></button>
    )
}

export default NavButton