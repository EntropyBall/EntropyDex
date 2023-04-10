import React from 'react'

const NavBar = ({ accounts }) => {
    const currentAccount = accounts.find(account => account.selected)
    return (
        <nav className='navBar'>
            <p>{currentAccount.name}</p>
        </nav>
    )
}

export default NavBar