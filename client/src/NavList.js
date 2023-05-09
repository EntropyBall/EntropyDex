import React from 'react'
import NavItem from './NavItem'

const NavList = ({ accounts, setAccounts, isShow, handleClick }) => {
    const ohterAccounts = accounts.filter(account => !account.selected)

    // JSX List
    const ohterAccountsElements = ohterAccounts.map(account => {
        return <NavItem
            key={account.name}
            name={account.name}
            team={account.team}
            accounts={accounts}
            setAccounts={setAccounts} />
    })

    return (
        <ul className='nav-listAccount' onClick={handleClick}>
            {isShow && ohterAccountsElements}
        </ul>
    )
}
export default NavList