import React, { useContext } from 'react'
import { AccountContext } from './AccountContext'
import NavItem from './NavItem'

const NavList = ({ isShow, handleClick }) => {
    const { accounts } = useContext(AccountContext)
    const { name, team, selected } = accounts.find(account => account.selected)
    const ohterAccounts = accounts.filter(account => !account.selected)

    // JSX List
    const ohterAccountsElements = ohterAccounts.map(account => {
        return <NavItem name={account.name} team={account.team} />
    })

    return (
        <ul className='nav-listAccount' onClick={handleClick}>
            <NavItem name={name} team={team} selected={selected} />
            {isShow && ohterAccountsElements}
        </ul>
    )
}
export default NavList