import React, { useContext } from 'react'
import { AccountContext } from './AccountContext'
import NavItem from './NavItem'

const NavList = ({ isShow, handleClick }) => {
    const { accounts } = useContext(AccountContext)
    const ohterAccounts = accounts.filter(account => !account.selected)

    // JSX List
    const ohterAccountsElements = ohterAccounts.map(account => {
        return <NavItem name={account.name} team={account.team} />
    })

    return (
        <ul className='nav-listAccount' onClick={handleClick}>
            {isShow && ohterAccountsElements}
        </ul>
    )
}
export default NavList