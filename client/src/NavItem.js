import React from 'react'

const NavItem = ({ setAccounts, name, team }) => {

    const handleAccount = () => {
        setAccounts(prev => {
            return prev.map(account => {
                if (account.name === name) {
                    return { ...account, selected: true }
                }
                return { ...account, selected: false }
            })
        })
    }
    return (
        <li className='nav-itemAccount' onClick={handleAccount}>
            <span>{team} {name}</span>
        </li>
    )
}

export default NavItem